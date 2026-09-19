/* QBLOGG — tek yapılandırma dosyası.
 *
 * Siteyi yayına almak için değiştirilmesi gereken her şey burada.
 * Başka hiçbir dosyaya dokunmanız gerekmiyor.
 */
window.QB_CONFIG = {
  /* Formların gideceği adres ve altbilgide görünen e-posta */
  mailTo: 'hello@qblogg.com',

  /* Yayına alınacak alan adı — paylaşım bağlantıları ve şemalar bunu kullanır */
  siteUrl: 'https://qblogg.com',

  /* Sosyal hesaplar. Boş bırakılan altbilgide gösterilmez (ölü bağlantı olmaz).
   * Hesaplar açıldıkça doldurun; bkz. docs/sosyal-medya-kanallari.md
   * Öncelik sırası: LinkedIn → X → Medium → Substack → YouTube (6. ay) */
  social: {
    linkedin: '',   /* linkedin.com/company/qblogg — Company Page kurulunca */
    x: '',          /* x.com/qblogg — hesap açılınca */
    medium: '',     /* medium.com/qblogg-icerik-ai — publication açılınca */
    substack: 'https://qblogg.substack.com',  /* Q Brief — kurulunca aktif */
    youtube: ''     /* 6. ay */
  },

  /* Paket fiyatları. Buraya yazılan değer sözlükteki fiyatı ezer.
     Boş bırakılırsa i18n.js içindeki örnek fiyatlar kullanılır.
     Norveç pazarı için kron yazmak isterseniz: p1: '1.800 kr' gibi. */
  prices: {
    p1: '',   // Tek Makale
    p2: '',   // Büyüme
    p3: ''    // Stüdyo
  },

  /* Stripe Payment Link adresleri. Dolu olan pakette "Kartla öde" düğmesi
     çıkar; boş bırakılan pakette yalnız brief akışı kalır.
     Bağlantı üretimi: docs/odeme-sistemi.md */
  payLinks: { p1: '', p2: '', p3: '' },

  /* Bültene kayıt karşılığında verilen indirilebilir dosya (lead magnet) */
  leadMagnet: 'assets/downloads/otomasyon-kesif-listesi.html',

  /* E-posta listesi. Boş bırakılırsa kayıt yalnızca tarayıcıda tutulur —
     yani liste aslında oluşmaz. Site tek varlığını (e-posta listesi) burası
     doldurulana kadar biriktiremez.

     Buraya e-posta servisinizin form/API adresini yazın. Çoğu servis
     (Mailchimp, ConvertKit, Buttondown, MailerLite, beehiiv) bir "form action"
     adresi verir; POST edilen alan adı genelde 'email'.

     Örnek: 'https://buttondown.com/api/emails/embed-subscribe/qblogg'   */
  newsletterEndpoint: 'https://buttondown.com/api/emails/embed-subscribe/tatil',
  newsletterField: 'email',

  /* Brief ve yazar başvuru formunun gideceği adres.
     Boş bırakılırsa formlar eskisi gibi davranır: ziyaretçinin kendi e-posta
     uygulamasında hazır bir taslak açılır (mailTo adresine). Bu, sunucu
     gerektirmez ama ziyaretçinin göndere basmasına bağlıdır — yani bazı
     başvurular hiç ulaşmaz.

     Formspree adresini buraya yazın; adresi panonuzdaki şablondan değil,
     Formspree panelindeki formun Integration sekmesinden alın. Şablondaki
     {form_id} bir yer tutucudur, gerçek kimlik sekiz karakterlidir.
     Örnek: 'https://formspree.io/f/mzbqwxyz'

     DİKKAT: yeni bir adres girdiğinizde vercel.json içindeki CSP
     connect-src'ye de eklenmesi gerekir, yoksa istek sessizce engellenir.
     `npm run guvenlik` bunu denetliyor. */
  formEndpoint: '',

  /* Ortaklık (affiliate) bağlantıları.
     disclosure: true ise, ortaklık bağlantısı içeren her yazının başında
     otomatik bir bildirim kutusu çıkar. Bunu kapatmayın: AB tüketici
     mevzuatı ticari ilişkinin açıkça belirtilmesini istiyor ve Google
     ortaklık bağlantılarında rel="sponsored" bekliyor (ikisini de kod
     kendiliğinden uyguluyor). */
  affiliate: {
    disclosure: true
  }
};
