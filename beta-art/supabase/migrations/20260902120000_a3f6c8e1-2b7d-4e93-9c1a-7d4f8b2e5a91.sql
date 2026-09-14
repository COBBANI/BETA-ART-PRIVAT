-- Anonim ilgi izi: hangi plaka görüntülemesinin hangi plakayla birlikte
-- görüldüğünü bulmak için. Kişisel veri YOK — yalnızca plaka slug'ı ve
-- rastgele, oturum-ömürlü bir bağıntı kimliği (kullanıcı hesabına,
-- IP'ye veya cihaz parmak izine bağlı değil; sessionStorage'da tutulur,
-- sekme kapanınca kaybolur). Amaç: "bunu görenler şunu da gördü" önerisi
-- ve editör için toplu (aggregate) ilgi görünümü.
CREATE TABLE public.plate_view_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plate_slug TEXT NOT NULL,
  correlation_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.plate_view_events TO anon, authenticated;
GRANT ALL ON public.plate_view_events TO service_role;
ALTER TABLE public.plate_view_events ENABLE ROW LEVEL SECURITY;

-- Herkes anonim bir görüntüleme olayı ekleyebilir; kimse ham satırları
-- doğrudan okuyamaz (correlation_id'ler bile toplu sonuç dışında dışarı
-- sızmasın diye) — okuma yalnızca aşağıdaki iki SECURITY DEFINER
-- fonksiyonu üzerinden, yalnızca toplanmış (aggregate) biçimde olur.
CREATE POLICY "plate_view_events_insert_anyone" ON public.plate_view_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Basit kötüye kullanım freni: bir plaka + bağıntı kimliği çifti için
-- olay sayısı fonksiyon tarafında değil burada, uygulama tarafında
-- (client) tekilleştiriliyor (bkz. src/lib/plateInterest.ts) — burada
-- yalnızca satır biçimini zorluyoruz.
ALTER TABLE public.plate_view_events
  ADD CONSTRAINT plate_view_events_slug_not_blank CHECK (length(plate_slug) > 0);

-- Herkese açık: "bunu görenler şunu da gördü" — yalnızca slug + sayım
-- döner, hiçbir correlation_id veya zaman damgası dışarı sızmaz.
CREATE OR REPLACE FUNCTION public.co_viewed_plates(_slug TEXT, _limit INT DEFAULT 3)
RETURNS TABLE(plate_slug TEXT, views BIGINT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT other.plate_slug, COUNT(*) AS views
  FROM public.plate_view_events base
  JOIN public.plate_view_events other
    ON other.correlation_id = base.correlation_id
   AND other.plate_slug <> base.plate_slug
  WHERE base.plate_slug = _slug
  GROUP BY other.plate_slug
  ORDER BY views DESC, other.plate_slug ASC
  LIMIT GREATEST(_limit, 0);
$$;
REVOKE EXECUTE ON FUNCTION public.co_viewed_plates(TEXT, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.co_viewed_plates(TEXT, INT) TO anon, authenticated;

-- Yalnızca admin: toplam görüntüleme + benzersiz oturum sayısı, plaka
-- başına. Editör görünümü bunu çağırır (bkz.
-- src/lib/plateInterest.functions.ts → getPlateViewSummary).
CREATE OR REPLACE FUNCTION public.plate_view_summary()
RETURNS TABLE(plate_slug TEXT, views BIGINT, unique_sessions BIGINT)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT plate_slug, COUNT(*) AS views, COUNT(DISTINCT correlation_id) AS unique_sessions
  FROM public.plate_view_events
  GROUP BY plate_slug
  ORDER BY views DESC;
$$;
REVOKE EXECUTE ON FUNCTION public.plate_view_summary() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.plate_view_summary() TO authenticated, service_role;

-- Sınırsız büyümeyi önlemek için basit bir saklama sınırı: 180 günden
-- eski olaylar toplu görünümü etkilemesin diye elle/cron ile silinebilir.
-- Otomatik bir pg_cron işi burada KURULMADI (Supabase projesinin
-- pg_cron uzantısını kullanıp kullanmadığı bu ortamdan doğrulanamadı);
-- bu, dağıtım sonrası kullanıcının kendi Supabase panelinden eklemesi
-- gereken bir adımdır.
