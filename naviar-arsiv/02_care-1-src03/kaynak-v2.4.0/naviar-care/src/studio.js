// Service clarity, same intent in all three languages. No new collection of data.
export const studio = {
  nb: {
    demoConfirm: 'Bekreft testbestillingen', demoBook: 'Prøv samtalebestilling', demoChoose: 'Prøv med denne hjelpen',
    details: 'Hva kan hjelpen omfatte?', includes: 'Dette kan vi avtale', limits: 'Dette inngår ikke',
    detailItems: [
      {examples:['Handle fra en avtalt liste','Små ærender i nærheten','Enkle oppgaver som avtales på forhånd'],excluded:'Tunge løft, fagarbeid, personlig stell og tilgang til bankkonto inngår ikke.'},
      {examples:['Gå en tur i ditt tempo','Gå sammen til en butikk','Ha følge til en avtalt aktivitet'],excluded:'Transport med bil, løft og medisinsk oppfølging inngår ikke.'},
      {examples:['Ta en kaffe og prate','Spille et spill eller lese sammen','Gjøre noe du selv liker'],excluded:'Behandling, tilsyn med medisinsk ansvar og hjelp med medisiner inngår ikke.'}
    ],
    beforeTitle: 'Dette bør du vite først', beforeIntro: 'Du velger hva som passer. Et hjemmebesøk må avtales særskilt.',
    facts: [['Første steg','En samtale om hva du ønsker hjelp til.'],['Pris','Hjemmebesøk er ikke priset ennå. Du skal få et samlet tilbud før du bestemmer deg.'],['Sted','Tjenesteområdet er ikke bekreftet ennå.']],
    priceHeading: 'Før du sier ja til et besøk', priceChecklist: ['Hvilke oppgaver som er avtalt','Hvem som kommer, dato og varighet','Samlet pris i NOK, med eventuelle tillegg','Hvordan du endrer, avbestiller eller ber om hjelp'],
    noSlotsAction: 'Gå til kontakt', resetGuide: 'Start på nytt',
    demoNext: 'Testen viser bare bestillingsflyten. Ingen ringer deg, og ingen hjelper kommer hjem til deg.',
    liveNext: 'Samtaletiden bekrefter en innledende samtale. Et besøk, oppgaver og pris må avtales separat.',
    priceNav: 'Pris og område'
  },
  en: {
    demoConfirm: 'Confirm test booking', demoBook: 'Try call booking', demoChoose: 'Try with this support',
    details: 'What could the support include?', includes: 'What we can agree on', limits: 'What is outside the scope',
    detailItems: [
      {examples:['Shop from an agreed list','Run small local errands','Do simple tasks agreed in advance'],excluded:'Heavy lifting, specialist trade work, personal care and bank account access are outside the scope.'},
      {examples:['Walk at your own pace','Go to a shop together','Have company at an agreed activity'],excluded:'Car transport, lifting and medical follow-up are outside the scope.'},
      {examples:['Have a coffee and a chat','Play a game or read together','Do something you enjoy'],excluded:'Treatment, supervision with medical responsibility and help with medication are outside the scope.'}
    ],
    beforeTitle: 'A few things to know first', beforeIntro: 'You choose what suits you. A home visit needs a separate agreement.',
    facts: [['First step','A call about the support you would like.'],['Price','Home visits are not priced yet. You should receive a total offer before you decide.'],['Location','The service area is not confirmed yet.']],
    priceHeading: 'Before you agree to a visit', priceChecklist: ['The tasks you have agreed on','Who will come, the date and duration','The total price in NOK, including any extras','How to change, cancel or ask for help'],
    noSlotsAction: 'Go to contact', resetGuide: 'Start again',
    demoNext: 'This test only demonstrates booking. Nobody will call you or visit your home.',
    liveNext: 'The time confirms an introductory call. A visit, tasks and price need a separate agreement.',
    priceNav: 'Price and location'
  },
  tr: {
    demoConfirm: 'Test rezervasyonunu onayla', demoBook: 'Görüşme rezervasyonunu dene', demoChoose: 'Bu destekle dene',
    details: 'Bu destek neleri kapsayabilir?', includes: 'Birlikte kararlaştırabileceklerimiz', limits: 'Kapsam dışında olanlar',
    detailItems: [
      {examples:['Kararlaştırılan listeden alışveriş','Yakın çevrede küçük işler','Önceden kararlaştırılan basit görevler'],excluded:'Ağır kaldırma, uzmanlık gerektiren tamirat, kişisel bakım ve banka hesabına erişim kapsam dışıdır.'},
      {examples:['Kendi temponuzda yürüyüş','Birlikte mağazaya gitme','Kararlaştırılan bir etkinliğe eşlik'],excluded:'Arabayla taşıma, kaldırma ve tıbbi takip kapsam dışıdır.'},
      {examples:['Kahve içip sohbet etme','Birlikte oyun oynama veya okuma','Sevdiğiniz bir etkinliği yapma'],excluded:'Tedavi, tıbbi sorumluluk gerektiren gözetim ve ilaç desteği kapsam dışıdır.'}
    ],
    beforeTitle: 'Başlamadan önce bilmeniz gerekenler', beforeIntro: 'Size uygun olanı siz seçersiniz. Ev ziyareti ayrıca kararlaştırılmalıdır.',
    facts: [['İlk adım','İstediğiniz destek hakkında bir görüşme.'],['Ücret','Ev ziyareti ücretleri henüz belirlenmedi. Karar vermeden önce toplam teklif size sunulmalı.'],['Bölge','Hizmet bölgesi henüz doğrulanmadı.']],
    priceHeading: 'Bir ziyareti kabul etmeden önce', priceChecklist: ['Kararlaştırılan görevler','Gelecek kişi, tarih ve süre','Ek ücretler dahil NOK cinsinden toplam fiyat','Değişiklik, iptal ve yardım isteme yolu'],
    noSlotsAction: 'İletişime git', resetGuide: 'Yeniden başla',
    demoNext: 'Bu test yalnızca rezervasyon akışını gösterir. Kimse sizi aramayacak veya evinize gelmeyecek.',
    liveNext: 'Seçilen saat bir ön görüşmeyi onaylar. Ziyaret, görevler ve ücret ayrıca kararlaştırılmalıdır.',
    priceNav: 'Ücret ve bölge'
  }
};
