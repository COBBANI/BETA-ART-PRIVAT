export const improvements = {
  nb: {
    requestTimeout:'Vi fikk ikke svar i tide. En innsending kan likevel være registrert. Se Mine samtaler eller Mine henvendelser, eller prøv den samme innsendingen igjen.', rateLimit:'Det kom mange forespørsler. Vent ett minutt og prøv igjen.', enquiries: 'Mine henvendelser', enquiriesIntro: 'Se det du har sendt, og om henvendelsen er under arbeid. En registrert melding bekrefter ikke en samtale eller et besøk.',
    paymentReview: 'Betalingsforsøket må kontrolleres før du prøver igjen. Kontakt oss og oppgi bestillingsreferansen.',
    enquiryStates: {new: 'Mottatt', in_progress: 'Under arbeid', closed: 'Behandlet'}, enquiryHelp: 'Du ser bare meldinger du selv har sendt. Ta kontakt hvis du vil følge opp en behandlet henvendelse.',
    refresh: 'Oppdater', noTime: 'Finner du ingen passende tid?', requestTime: 'Spør om en annen tid', submitted: 'Registrert', updated: 'Sist oppdatert',
    readinessTitle: 'Før tjenesten kan åpne', readinessNote: 'Oversikten viser konfigurasjon, ikke godkjent drift eller vellykkede leverandørtester.',
    ready: 'Oppgitt', missing: 'Mangler', readinessLabels: {operator:'Ansvarlig virksomhet',area:'Tjenesteområde',contact:'Kontaktadresse',review:'Fullført lanseringsgjennomgang',service:'Tjenesten er aktivert',sender:'E-postavsender og nøkkel',paymentKeys:'Stripe-nøkkel og signeringsnøkkel',paymentEnabled:'Betaling er aktivert'},
    nextTitle: 'Neste steg fra innholdet', nextNote: 'Samtykkede klikk fra en innholdsdel til samtale, veiviser eller kontakt. Ett klikk per mål og sidebesøk. Dette måler ikke fullførte bestillinger eller personlige behov.', clickCount: 'Klikk', destination: 'Neste steg',
    forecastPeriod:'Anslag for inneværende hele uke (UTC)', forecastError:'Feil i to separate testuker', forecastCaution:'Metoden velges på tidligere uker, før de to testukene. To testuker er for lite til å fastslå pålitelighet. Anslaget gjelder samtaleforespørsler, ikke hjemmebesøk.',
    generalError:'Vi kunne ikke hente opplysningene. Prøv å oppdatere.', languageWarning:'Bytte språk? Skjemasvarene på denne siden blir ikke med.', consentNext:'Hvis du tillater analyse, teller vi også klikk fra innhold til samtale, veiviser og kontakt. Vi følger deg ikke videre til private sider.'
  },
  en: {
    requestTimeout:'We did not receive a response in time. A submission may still have been saved. Check My calls or My enquiries, or retry the same submission.', rateLimit:'There were many requests. Wait one minute and try again.', enquiries: 'My enquiries', enquiriesIntro: 'See what you sent and whether your enquiry is being handled. A saved message does not confirm a call or a visit.',
    paymentReview: 'This payment attempt needs to be checked before you try again. Contact us with your booking reference.',
    enquiryStates: {new: 'Received', in_progress: 'In progress', closed: 'Handled'}, enquiryHelp: 'You can only see messages you sent yourself. Contact us if you want to follow up on a handled enquiry.',
    refresh: 'Refresh', noTime: 'No suitable time?', requestTime: 'Ask about another time', submitted: 'Submitted', updated: 'Last updated',
    readinessTitle: 'Before the service can open', readinessNote: 'This shows configuration, not operational approval or successful provider tests.',
    ready: 'Provided', missing: 'Missing', readinessLabels: {operator:'Responsible business',area:'Service area',contact:'Contact email',review:'Launch review completed',service:'Service enabled',sender:'Email sender and key',paymentKeys:'Stripe key and signing secret',paymentEnabled:'Payments enabled'},
    nextTitle: 'Next steps from the content', nextNote: 'Consented clicks from a content section to booking, the guide or contact. One click per destination and page visit. These are not completed bookings or predictions of personal needs.', clickCount: 'Clicks', destination: 'Next step',
    forecastPeriod:'Estimate for the current full week (UTC)', forecastError:'Error across two separate test weeks', forecastCaution:'The method is selected on earlier weeks, before the two test weeks. Two test weeks cannot establish reliability. The estimate concerns call requests, not home visits.',
    generalError:'We could not load the information. Please try refreshing.', languageWarning:'Change language? Your form answers will not carry over.', consentNext:'If you allow analytics, we also count clicks from content to booking, the guide and contact. We do not follow you into private pages.'
  },
  tr: {
    requestTimeout:'Zamanında yanıt alınamadı. Gönderiminiz yine de kaydedilmiş olabilir. Görüşmelerim veya Başvurularım bölümünü kontrol edin ya da aynı gönderimi yeniden deneyin.', rateLimit:'Çok sayıda istek geldi. Bir dakika bekleyip yeniden deneyin.', enquiries: 'Başvurularım', enquiriesIntro: 'Gönderdiğiniz mesajları ve işlem durumlarını görün. Mesajın kaydedilmesi görüşme veya ev ziyareti onayı değildir.',
    paymentReview: 'Yeniden denemeden önce bu ödeme girişimi kontrol edilmeli. Rezervasyon numaranızla bize ulaşın.',
    enquiryStates: {new: 'Alındı', in_progress: 'İşleniyor', closed: 'İşlem tamamlandı'}, enquiryHelp: 'Yalnızca kendi gönderdiğiniz mesajları görürsünüz. Tamamlanmış bir başvuruyu takip etmek için iletişime geçebilirsiniz.',
    refresh: 'Yenile', noTime: 'Uygun bir saat bulamadınız mı?', requestTime: 'Başka bir saat sorun', submitted: 'Gönderildi', updated: 'Son güncelleme',
    readinessTitle: 'Hizmeti açmadan önce', readinessNote: 'Bu liste yapılandırmayı gösterir; işletme onayı veya başarılı sağlayıcı testi anlamına gelmez.',
    ready: 'Girildi', missing: 'Eksik', readinessLabels: {operator:'Sorumlu işletme',area:'Hizmet bölgesi',contact:'İletişim e-postası',review:'Açılış incelemesi tamamlandı',service:'Hizmet etkinleştirildi',sender:'E-posta göndericisi ve anahtar',paymentKeys:'Stripe anahtarı ve imzalama anahtarı',paymentEnabled:'Ödeme etkinleştirildi'},
    nextTitle: 'İçerikten sonraki adımlar', nextNote: 'İzin veren ziyaretçilerin içerikten görüşme, rehber veya iletişime tıklamaları. Sayfa ziyaretinde hedef başına bir kez sayılır. Tamamlanmış rezervasyonu veya kişisel ihtiyacı göstermez.', clickCount: 'Tıklama', destination: 'Sonraki adım',
    forecastPeriod:'İçinde bulunduğumuz tam hafta için tahmin (UTC)', forecastError:'İki ayrı test haftasındaki hata', forecastCaution:'Yöntem, iki test haftasından önceki haftalarda seçilir. İki test haftası güvenilirliği kanıtlamaz. Tahmin ev ziyaretleri için değil, ön görüşme talepleri içindir.',
    generalError:'Bilgiler yüklenemedi. Lütfen yenilemeyi deneyin.', languageWarning:'Dili değiştirmek istiyor musunuz? Form yanıtları yeni dile taşınmaz.', consentNext:'Analize izin verirseniz içerikten görüşme, rehber ve iletişime tıklamaları da sayarız. Özel sayfalarda gezinmenizi takip etmeyiz.'
  }
};
