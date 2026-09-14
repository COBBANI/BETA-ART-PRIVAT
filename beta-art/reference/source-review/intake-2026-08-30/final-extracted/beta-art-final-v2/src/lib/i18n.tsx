import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'en' | 'no' | 'tr' | 'de' | 'fr' | 'es' | 'it' | 'nl' | 'sv' | 'da';
type Dictionary = Record<string, string>;

const en: Dictionary = {
  collection: 'Collection', verification: 'Verification', standard: 'The Standard', licensing: 'Licensing', contact: 'Contact', photographer: 'Photographer', faq: 'FAQ',
  viewCollection: 'View the collection', readStandard: 'Read the standard', humanPhotography: 'Verified Human Photography',
  heroLead: 'Beta Art licenses original photographs made by a person with a physical camera. Verified plates retain their RAW original, capture record and a direct licensing trail to the photographer.',
  origin: 'Origin', humanCaptured: 'Human captured', evidence: 'Evidence', rawRecord: 'RAW + record', licence: 'Licence', directMaker: 'Direct from maker',
  evidenceBeforeClaims: 'Evidence before claims.', verificationIntro: 'Beta Art does not mark a plate verified because it looks authentic. Publication requires a complete record.',
  rawArchived: 'RAW original archived', rawArchivedBody: 'The unedited RAW original is retained and associated with the catalogue record.',
  recordTravels: 'Capture record travels with the image', recordTravelsBody: 'Camera, lens, exposure, date and location are preserved when available and never invented when unavailable.',
  signedByMaker: 'Licence signed by the maker', signedByMakerBody: 'The agreement identifies the exact plate, delivered file and scope of use.',
  standardTitle: 'A photograph enters the archive only when its provenance can be documented.',
  standardBody: 'Publication requires a verified catalogue record, linked RAW original, retained capture information, verified photographer identity and cryptographic checksums for the source and delivered image.',
  standardRule: 'Fail one required check → remain unpublished.', standardRuleBody: 'This rule is enforced in the application, database constraints and verification service.',
  archive: 'The archive.', archiveLive: 'Only plates that pass every verification gate appear here.', archiveDev: 'Development records are visible for layout testing. None are publishable yet.',
  grid: 'Grid', index: 'Index', noPublic: 'No verified plates are public yet.', noPublicBody: 'The archive will open as soon as the first originals pass verification.',
  ordering: 'Ordering', orderingTitle: 'From plate to signed licence.', choosePlate: 'Choose a plate', choosePlateBody: 'Open its record and review provenance, catalogue number and available licence paths.',
  describeUse: 'Describe the use', describeUseBody: 'Tell us where, for how long and in which territory the photograph will appear.',
  receiveTerms: 'Receive signed terms', receiveTermsBody: 'The photographer confirms scope, delivery and price before the licence becomes effective.',
  photographerTitle: 'The person behind the archive.', photographerBody: 'Authorship is backed by the retained original, capture record and signed licensing trail — not by marketing language alone.',
  licensingTitle: 'Rights without ambiguity.', licensingBody: 'Choose a standard licence path or request custom terms. Every final licence names the plate, scope, territory and duration.',
  questions: 'Questions about the archive.', finalCta: 'License a photograph with evidence behind it.',
};

const dictionaries: Record<Locale, Dictionary> = {
  en,
  no: { ...en, collection:'Samling', verification:'Verifisering', standard:'Standarden', licensing:'Lisensiering', contact:'Kontakt', photographer:'Fotograf', faq:'Spørsmål', viewCollection:'Se samlingen', readStandard:'Les standarden', humanPhotography:'Verifisert menneskeskapt fotografi', heroLead:'Beta Art lisensierer originale fotografier tatt av et menneske med et fysisk kamera. Verifiserte bilder beholder RAW-originalen, opptaksdata og en direkte lisenshistorikk til fotografen.', evidenceBeforeClaims:'Dokumentasjon før påstander.', verificationIntro:'Beta Art merker ikke et bilde som verifisert fordi det ser ekte ut. Publisering krever en komplett dokumentasjon.', archive:'Arkivet.', archiveLive:'Bare bilder som består alle verifiseringskrav vises her.', noPublic:'Ingen verifiserte bilder er offentlige ennå.', noPublicBody:'Arkivet åpner når de første originalene har bestått verifisering.', ordering:'Bestilling', orderingTitle:'Fra bilde til signert lisens.', photographerTitle:'Personen bak arkivet.', licensingTitle:'Rettigheter uten uklarhet.', questions:'Spørsmål om arkivet.', finalCta:'Lisensier et fotografi med dokumentasjon bak.' },
  tr: { ...en, collection:'Koleksiyon', verification:'Doğrulama', standard:'Standart', licensing:'Lisanslama', contact:'İletişim', photographer:'Fotoğrafçı', faq:'SSS', viewCollection:'Koleksiyonu gör', readStandard:'Standardı oku', humanPhotography:'Doğrulanmış İnsan Fotoğrafçılığı', heroLead:'Beta Art, fiziksel bir kamerayla bir insan tarafından çekilmiş özgün fotoğrafları lisanslar. Doğrulanmış kareler RAW orijinalini, çekim kaydını ve fotoğrafçıya uzanan doğrudan lisans geçmişini korur.', evidenceBeforeClaims:'İddiadan önce kanıt.', verificationIntro:'Beta Art bir fotoğrafı yalnızca gerçek göründüğü için doğrulanmış saymaz. Yayın için eksiksiz kayıt gerekir.', archive:'Arşiv.', archiveLive:'Burada yalnızca tüm doğrulama eşiklerini geçen kareler görünür.', noPublic:'Henüz herkese açık doğrulanmış kare yok.', noPublicBody:'İlk orijinaller doğrulamayı geçtiğinde arşiv açılacaktır.', ordering:'Sipariş', orderingTitle:'Kareden imzalı lisansa.', photographerTitle:'Arşivin arkasındaki kişi.', licensingTitle:'Belirsizlik olmadan kullanım hakları.', questions:'Arşiv hakkında sorular.', finalCta:'Arkasında kanıt bulunan bir fotoğrafı lisansla.' },
  de: { ...en, collection:'Sammlung', verification:'Verifizierung', standard:'Der Standard', licensing:'Lizenzierung', contact:'Kontakt', photographer:'Fotograf', faq:'FAQ', viewCollection:'Sammlung ansehen', readStandard:'Standard lesen', humanPhotography:'Verifizierte menschliche Fotografie', evidenceBeforeClaims:'Belege vor Behauptungen.', archive:'Das Archiv.', archiveLive:'Hier erscheinen nur Aufnahmen, die jede Verifizierungsstufe bestehen.', noPublic:'Noch sind keine verifizierten Aufnahmen öffentlich.', ordering:'Bestellung', orderingTitle:'Von der Aufnahme zur signierten Lizenz.', photographerTitle:'Die Person hinter dem Archiv.', licensingTitle:'Rechte ohne Unklarheit.', questions:'Fragen zum Archiv.', finalCta:'Lizenzieren Sie Fotografie mit belegter Herkunft.' },
  fr: { ...en, collection:'Collection', verification:'Vérification', standard:'Le standard', licensing:'Licences', contact:'Contact', photographer:'Photographe', faq:'FAQ', viewCollection:'Voir la collection', readStandard:'Lire le standard', humanPhotography:'Photographie humaine vérifiée', evidenceBeforeClaims:'Des preuves avant les affirmations.', archive:'Les archives.', archiveLive:'Seules les images qui franchissent chaque étape de vérification apparaissent ici.', noPublic:'Aucune image vérifiée n’est encore publique.', ordering:'Commande', orderingTitle:'De l’image à la licence signée.', photographerTitle:'La personne derrière les archives.', licensingTitle:'Des droits sans ambiguïté.', questions:'Questions sur les archives.', finalCta:'Licenciez une photographie appuyée par des preuves.' },
  es: { ...en, collection:'Colección', verification:'Verificación', standard:'El estándar', licensing:'Licencias', contact:'Contacto', photographer:'Fotógrafo', faq:'Preguntas', viewCollection:'Ver la colección', readStandard:'Leer el estándar', humanPhotography:'Fotografía humana verificada', evidenceBeforeClaims:'Pruebas antes que afirmaciones.', archive:'El archivo.', archiveLive:'Aquí solo aparecen las imágenes que superan todas las verificaciones.', noPublic:'Todavía no hay imágenes verificadas públicas.', ordering:'Pedido', orderingTitle:'De la imagen a la licencia firmada.', photographerTitle:'La persona detrás del archivo.', licensingTitle:'Derechos sin ambigüedad.', questions:'Preguntas sobre el archivo.', finalCta:'Licencia una fotografía respaldada por pruebas.' },
  it: { ...en, collection:'Collezione', verification:'Verifica', standard:'Lo standard', licensing:'Licenze', contact:'Contatto', photographer:'Fotografo', faq:'FAQ', viewCollection:'Vedi la collezione', readStandard:'Leggi lo standard', humanPhotography:'Fotografia umana verificata', evidenceBeforeClaims:'Prove prima delle affermazioni.', archive:'L’archivio.', archiveLive:'Qui appaiono solo le immagini che superano ogni verifica.', noPublic:'Non ci sono ancora immagini verificate pubbliche.', ordering:'Ordine', orderingTitle:'Dall’immagine alla licenza firmata.', photographerTitle:'La persona dietro l’archivio.', licensingTitle:'Diritti senza ambiguità.', questions:'Domande sull’archivio.', finalCta:'Licenzia una fotografia sostenuta da prove.' },
  nl: { ...en, collection:'Collectie', verification:'Verificatie', standard:'De standaard', licensing:'Licenties', contact:'Contact', photographer:'Fotograaf', faq:'FAQ', viewCollection:'Bekijk collectie', readStandard:'Lees de standaard', humanPhotography:'Geverifieerde menselijke fotografie', evidenceBeforeClaims:'Bewijs vóór claims.', archive:'Het archief.', archiveLive:'Alleen beelden die elke verificatiestap doorstaan verschijnen hier.', noPublic:'Er zijn nog geen geverifieerde beelden openbaar.', ordering:'Bestellen', orderingTitle:'Van beeld tot getekende licentie.', photographerTitle:'De persoon achter het archief.', licensingTitle:'Rechten zonder onduidelijkheid.', questions:'Vragen over het archief.', finalCta:'Licentieer fotografie met bewijs erachter.' },
  sv: { ...en, collection:'Samling', verification:'Verifiering', standard:'Standarden', licensing:'Licensiering', contact:'Kontakt', photographer:'Fotograf', faq:'FAQ', viewCollection:'Visa samlingen', readStandard:'Läs standarden', humanPhotography:'Verifierad mänsklig fotografi', evidenceBeforeClaims:'Bevis före påståenden.', archive:'Arkivet.', archiveLive:'Endast bilder som klarar varje verifieringssteg visas här.', noPublic:'Inga verifierade bilder är offentliga ännu.', ordering:'Beställning', orderingTitle:'Från bild till signerad licens.', photographerTitle:'Personen bakom arkivet.', licensingTitle:'Rättigheter utan oklarhet.', questions:'Frågor om arkivet.', finalCta:'Licensiera fotografi med bevis bakom.' },
  da: { ...en, collection:'Samling', verification:'Verifikation', standard:'Standarden', licensing:'Licensering', contact:'Kontakt', photographer:'Fotograf', faq:'FAQ', viewCollection:'Se samlingen', readStandard:'Læs standarden', humanPhotography:'Verificeret menneskelig fotografi', evidenceBeforeClaims:'Bevis før påstande.', archive:'Arkivet.', archiveLive:'Kun billeder der består alle verifikationstrin vises her.', noPublic:'Der er endnu ingen offentlige verificerede billeder.', ordering:'Bestilling', orderingTitle:'Fra billede til underskrevet licens.', photographerTitle:'Personen bag arkivet.', licensingTitle:'Rettigheder uden uklarhed.', questions:'Spørgsmål om arkivet.', finalCta:'Licensér fotografi med dokumentation bag.' },
};

type I18nContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: (key: string) => string; locales: Locale[] };
const I18nContext = createContext<I18nContextValue | null>(null);
const key = 'beta-art-locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    return saved && saved in dictionaries ? saved as Locale : 'en';
  });

  const setLocale = (next: Locale) => setLocaleState(next);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(key, locale);
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    t: (name) => dictionaries[locale][name] ?? en[name] ?? name,
    locales: Object.keys(dictionaries) as Locale[],
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
