// Isolated browser-memory demonstration. No network, persistent records or charges.
export function requestId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');
}

export function createDemoApi() {
  const records = new Map();
  const keys = new Map();
  let nextFailure = false;
  return {
    failNext() { nextFailure = true; },
    async request(path, data, token, key) {
      if (nextFailure) { nextFailure = false; throw new Error('unavailable'); }
      if (path === '/api/requests') {
        const previous = keys.get(key);
        if (previous) {
          if (previous.fingerprint !== JSON.stringify(data)) throw new Error('error');
          return {id: previous.id, status: records.get(previous.id).status, duplicate: true};
        }
        const id = 'DEMO-' + String(records.size + 1).padStart(3, '0');
        const managementToken = requestId();
        records.set(id, {status: 'pending_review', managementToken});
        keys.set(key, {id, fingerprint: JSON.stringify(data)});
        return {id, managementToken, status: 'pending_review', duplicate: false};
      }
      const record = records.get(data.id);
      if (!record || token !== record.managementToken) throw new Error('error');
      if (path === '/api/request/cancel') { record.status = 'cancelled'; return {status: record.status}; }
      if (path === '/api/request/status') return {status: record.status, paymentStatus: 'not_started'};
      throw new Error('payment_unavailable');
    }
  };
}

export const studioCopy = {
  nb: {reviewTitle:'Se over testforespørselen',reviewIntro:'Dette er opplysningene du vil sende. Ønsket dato er ikke en bekreftet avtale.',reviewButton:'Se over før du sender',edit:'Endre opplysninger',languageLabel:'Velg språk',demoTitle:'Interaktiv demo · Ingen opplysninger sendes',demoText:'Prøv med eksempeldata. Eksempeldata og valg slettes når du bytter språk eller laster siden på nytt.',sample:'Fyll inn eksempeldata',fail:'Prøv en tilkoblingsfeil',sampleReady:'Eksempeldata er fylt inn. Se over opplysningene nedenfor.',failureReady:'Neste innsending viser en tilkoblingsfeil. Du kan deretter prøve igjen.',demoSuccess:'Testforespørselen vises i demoen.',demoSuccessText:'Bare en demonstrasjon i nettleseren. Ingen forespørsel er sendt eller lagret på en server. Ingen e-post, betaling eller avtale er opprettet.',demoPrivacy:'Denne selvstendige demonstrasjonen sender ingen skjema- eller analysedata. Opplysninger og valg brukes bare i minnet mens siden er åpen, og forsvinner når den lastes på nytt. Bruk oppdiktede opplysninger.',demoChoiceTitle:'Prøv personvernvalgene',demoChoiceText:'Dette er en demonstrasjon. Valget gjelder bare her; ingen analysedata samles inn eller sendes.',demoSaved:'Demovalget er endret. Ingen analyse sendes.',summary:'Opplysninger',dateZone:'Datoen følger norsk tid (Europe/Oslo).',required:'Alle feltene er obligatoriske.'},
  en: {reviewTitle:'Review your test request',reviewIntro:'These are the details you are about to send. Your preferred date is not a confirmed appointment.',reviewButton:'Review before sending',edit:'Edit details',languageLabel:'Choose language',demoTitle:'Interactive demo · No details are sent',demoText:'Try the sample details. Sample details and choices are cleared when you change language or reload the page.',sample:'Fill in sample details',fail:'Try a connection error',sampleReady:'Sample details are filled in. Review the details below.',failureReady:'Your next submission will show a connection error. You can then try again.',demoSuccess:'Your test request appears in the demo.',demoSuccessText:'A browser demonstration only. No request was sent or stored on a server. No email, payment or appointment was created.',demoPrivacy:'This standalone demonstration sends no form or analytics data. Details and choices stay in memory while the page is open and disappear when it reloads. Use fictional details.',demoChoiceTitle:'Try the privacy choices',demoChoiceText:'This is a demonstration. Your choice applies here only; no analytics data is collected or sent.',demoSaved:'Your demo choice has changed. No analytics is sent.',summary:'Details',dateZone:'The date uses Norwegian time (Europe/Oslo).',required:'All fields are required.'},
  tr: {reviewTitle:'Deneme talebini gözden geçirin',reviewIntro:'Göndereceğiniz bilgiler aşağıda. Tercih ettiğiniz tarih kesinleşmiş randevu değildir.',reviewButton:'Göndermeden önce gözden geçir',edit:'Bilgileri düzenle',languageLabel:'Dil seçin',demoTitle:'Etkileşimli demo · Hiçbir bilgi gönderilmez',demoText:'Örnek bilgilerle deneyin. Dil değiştirdiğinizde veya sayfayı yenilediğinizde örnek bilgiler ve tercihler silinir.',sample:'Örnek bilgileri doldur',fail:'Bağlantı hatasını dene',sampleReady:'Örnek bilgiler dolduruldu. Aşağıdaki bilgileri gözden geçirin.',failureReady:'Sonraki gönderimde bağlantı hatası görünecek. Ardından yeniden deneyebilirsiniz.',demoSuccess:'Deneme talebi demoda gösteriliyor.',demoSuccessText:'Yalnızca tarayıcı içinde bir gösterimdir. Talep gönderilmedi veya sunucuya kaydedilmedi. E-posta, ödeme ya da randevu oluşturulmadı.',demoPrivacy:'Bu bağımsız demo, form veya analiz verisi göndermez. Bilgiler ve tercihler sayfa açıkken bellekte tutulur; sayfa yenilendiğinde silinir. Hayali bilgiler kullanın.',demoChoiceTitle:'Gizlilik tercihlerini deneyin',demoChoiceText:'Bu bir demodur. Seçiminiz yalnızca burada geçerlidir; analiz verisi toplanmaz veya gönderilmez.',demoSaved:'Demo tercihiniz değiştirildi. Analiz verisi gönderilmez.',summary:'Bilgiler',dateZone:'Tarih Norveç saatine göredir (Europe/Oslo).',required:'Tüm alanlar zorunludur.'}
};
