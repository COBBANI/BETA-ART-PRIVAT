/**
 * Anonim ilgi izi (client tarafı).
 *
 * Kişisel veri toplanmaz: yalnızca rastgele bir bağıntı kimliği
 * (correlation id) `sessionStorage`'da tutulur — sekme kapanınca kaybolur,
 * hesaba/cihaza bağlı değildir, geri döndürülüp bir kişiye bağlanamaz.
 * Amaç yalnızca "bu oturumda hangi plakalar birlikte görüntülendi" sinyali.
 *
 * Bkz. supabase/migrations/20260902120000_*.sql (plate_view_events,
 * co_viewed_plates) ve src/routes/privacy.tsx ("Cookies and analytics").
 */
import { supabase } from "@/integrations/supabase/client";

const CORRELATION_KEY = "beta_art_interest_trail";
const VIEWED_KEY = "beta_art_viewed_plates";

function getCorrelationId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let id = window.sessionStorage.getItem(CORRELATION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.sessionStorage.setItem(CORRELATION_KEY, id);
    }
    return id;
  } catch {
    return null; // gizli mod / depolama kapalı — sessizce vazgeç
  }
}

function readViewedLocally(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(VIEWED_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Bu oturumda daha önce hangi plakaların görüntülendiğini döner (yerel, tekrar-önerme filtresi için). */
export function getLocallyViewedSlugs(): string[] {
  return readViewedLocally();
}

/**
 * Görüntülemeyi kaydeder — hem uzak (Supabase, toplu öneri için) hem yerel
 * (sessionStorage, "zaten gördün" filtresi için). Ateşle-ve-unut: hata olursa
 * sayfa akışını bloklamaz, konsolda sessizce loglanır.
 */
export function trackPlateView(slug: string): void {
  if (!slug) return;

  const viewed = readViewedLocally();
  if (!viewed.includes(slug)) {
    try {
      window.sessionStorage.setItem(VIEWED_KEY, JSON.stringify([...viewed, slug].slice(-50)));
    } catch {
      /* yoksay */
    }
  }

  const correlationId = getCorrelationId();
  if (!correlationId) return; // depolama kapalıysa uzak kayıt da atlanır

  void supabase
    .from("plate_view_events")
    .insert({ plate_slug: slug, correlation_id: correlationId })
    .then(({ error }) => {
      if (error) console.warn("[plateInterest] view kaydı başarısız:", error.message);
    });
}

export type CoViewedPlate = { plate_slug: string; views: number };

/**
 * "Bunu görenler şunu da gördü" — toplu, kimliksiz sayım. Yeterli veri
 * yoksa (yeni plaka, az trafik) boş dizi döner; çağıran taraf kendi
 * geri düşüş (fallback) mantığına geçmeli.
 */
export async function getCoViewedPlates(slug: string, limit = 3): Promise<CoViewedPlate[]> {
  const { data, error } = await supabase.rpc("co_viewed_plates", { _slug: slug, _limit: limit });
  if (error) {
    console.warn("[plateInterest] co_viewed_plates başarısız:", error.message);
    return [];
  }
  return data ?? [];
}
