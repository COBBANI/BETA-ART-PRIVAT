export const experience = {
  nb: {
    guide: {
      title: 'Hvilken hjelp passer for deg?', nav: 'Finn riktig hjelp',
      intro: 'Velg det du vil ha hjelp til. Du får et forslag til hvor du kan starte.',
      privacy: 'Svarene blir på denne siden. De lagres ikke og sendes ikke til oss.',
      question: 'Hva vil du gjøre lettere i hverdagen?',
      choices: ['Få gjort praktiske oppgaver', 'Ha noen med meg ut', 'Ha selskap og gjøre noe hyggelig', 'Jeg vil snakke med noen først'],
      frequency: 'Hvor ofte ønsker du hjelp?', frequencies: ['En enkelt gang', 'Jevnlig', 'Jeg vet ikke ennå'],
      show: 'Se forslaget', result: 'Et sted å starte', change: 'Endre svarene',
      reasons: ['Du valgte praktiske oppgaver. Start med å beskrive én oppgave du vil ha hjelp til.', 'Du valgte følge. Start med å fortelle hvor du vil dra og når.', 'Du valgte selskap. Start med å fortelle hva du liker å gjøre.', 'Du trenger ikke velge en tjeneste nå. En samtale kan hjelpe deg å avklare ønskene dine.'],
      frequencyNotes: ['Ta opp ønsket dato i samtalen.', 'Ta opp ønsket rytme i samtalen. Faste avtaler må bekreftes særskilt.', 'Du kan bestemme hvor ofte senere.'],
      prepare: 'Før en samtale', preparation: ['Tenk på én ting du vil gjøre lettere.', 'Tenk på hvilke dager som kan passe.', 'Vi må avtale oppgaver, tidspunkt og pris før et besøk.'],
      limit: 'Forslaget bygger bare på valgene dine. Det bekrefter ikke kapasitet, pris eller en avtale.'
    },
    ops: {
      title: 'Arbeidsoversikt', note: 'Tallene gjelder faktiske henvendelser. Testdata er holdt utenfor.',
      requests: 'Bestillinger siste 30 dager', cancelled: 'Av disse er avbestilt', inbox: 'Ubehandlede henvendelser',
      capacity: 'Bestilte samtaletider neste 14 dager', capacityNote: 'Bestilte tider / alle åpne tider. Dette er samtaler, ikke kapasitet for hjemmebesøk.',
      empty: 'Ingen registrerte data i perioden.', cohort: 'Avbestillinger gjelder bestillinger opprettet i de siste 30 dagene, uansett når avbestillingen skjedde.',
      messageStates: {new: 'Ny', in_progress: 'Under arbeid', closed: 'Ferdig'}, save: 'Lagre status',
      stale: 'Noen har endret denne henvendelsen. Last den inn på nytt før du lagrer.',
      closeSlot: 'Fjern ledig tid', closeConfirm: 'Fjerne denne ledige tiden? Eksisterende bestillinger blir ikke endret.',
      occupied: 'Tiden er bestilt og kan ikke fjernes.', reserved: 'Bestilt', available: 'Ledig',
      statusSaved: 'Status er lagret.', slotClosed: 'Den ledige tiden er fjernet.',
      insightTitle: 'Hva kan du undersøke videre?', insightEmpty: 'Det er for lite tillatt analysedata til å prioritere innhold ennå.',
      insightPopular: 'Mest vist innhold i dette utvalget', insightReview: 'Kontroller om neste steg er tydelig i disse delene',
      insightNote: 'Visninger og 10 sekunder i synsfeltet er signaler, ikke bevis på lesing eller forståelse. Regelen for gjennomgang er minst 20 visninger og under 30 % registrert engasjement; terskelen er et foreløpig arbeidsvalg.',
      currentStep: 'Steg {n} av 3', steps: ['Hjelp', 'Tid', 'Bekreft'], retrySlots: 'Hent ledige tider på nytt',
      changedData: 'Valgene dine er beholdt. Prøv på nytt.', recipient: 'Hvem følger opp?', recipientNote: 'Henvendelsen blir tilgjengelig for NAVIAR CARE-administratoren. En innsendt melding er ikke en bekreftet avtale.'
    }
  },
  en: {
    guide: {
      title: 'What kind of help would suit you?', nav: 'Find suitable help',
      intro: 'Choose what you would like help with. We will suggest a starting point.',
      privacy: 'Your answers stay on this page. They are not saved or sent to us.',
      question: 'What would you like to make easier?',
      choices: ['Get practical tasks done', 'Have someone accompany me', 'Have company and do something enjoyable', 'Talk to someone first'],
      frequency: 'How often would you like help?', frequencies: ['Once', 'Regularly', 'I am not sure yet'],
      show: 'See the suggestion', result: 'A place to start', change: 'Change my answers',
      reasons: ['You chose practical tasks. Start by describing one task you would like help with.', 'You chose accompaniment. Start by saying where you would like to go and when.', 'You chose company. Start by saying what you enjoy doing.', 'You do not need to choose a service now. A conversation can help clarify what you want.'],
      frequencyNotes: ['Discuss your preferred date during the call.', 'Discuss your preferred schedule during the call. Regular arrangements need separate confirmation.', 'You can decide how often later.'],
      prepare: 'Before a call', preparation: ['Think of one thing you would like to make easier.', 'Think about days that could work for you.', 'Tasks, time and price must be agreed before a visit.'],
      limit: 'This suggestion uses only your choices. It does not confirm availability, price or an appointment.'
    },
    ops: {
      title: 'Work overview', note: 'These figures cover real requests. Test data is excluded.',
      requests: 'Bookings created in the past 30 days', cancelled: 'Of these, cancelled', inbox: 'Enquiries awaiting completion',
      capacity: 'Booked call slots in the next 14 days', capacityNote: 'Booked slots / all open slots. These are calls, not home-visit capacity.',
      empty: 'No recorded data in this period.', cohort: 'Cancellations refer to bookings created in the past 30 days, regardless of when they were cancelled.',
      messageStates: {new: 'New', in_progress: 'In progress', closed: 'Completed'}, save: 'Save status',
      stale: 'Someone changed this enquiry. Reload it before saving.',
      closeSlot: 'Remove available slot', closeConfirm: 'Remove this available slot? Existing bookings will not change.',
      occupied: 'This slot is booked and cannot be removed.', reserved: 'Booked', available: 'Available',
      statusSaved: 'Status saved.', slotClosed: 'The available slot was removed.',
      insightTitle: 'What could you investigate next?', insightEmpty: 'There is too little consented analytics data to prioritise content yet.',
      insightPopular: 'Most viewed content in this sample', insightReview: 'Check whether the next step is clear in these sections',
      insightNote: 'Views and 10 seconds in view are signals, not proof of reading or understanding. The review rule is at least 20 views and under 30% recorded engagement; this is a provisional working threshold.',
      currentStep: 'Step {n} of 3', steps: ['Help', 'Time', 'Confirm'], retrySlots: 'Reload available times',
      changedData: 'Your choices have been kept. Please try again.', recipient: 'Who follows up?', recipientNote: 'Your enquiry is available to the NAVIAR CARE administrator. Submitting a message does not confirm an appointment.'
    }
  },
  tr: {
    guide: {
      title: 'Size hangi yardım uygun?', nav: 'Uygun yardımı bul',
      intro: 'Hangi konuda yardım istediğinizi seçin. Nereden başlayabileceğinizi gösterelim.',
      privacy: 'Yanıtlarınız bu sayfada kalır. Kaydedilmez ve bize gönderilmez.',
      question: 'Günlük yaşamda neyi kolaylaştırmak istiyorsunuz?',
      choices: ['Günlük işleri halletmek', 'Dışarı çıkarken birinin eşlik etmesi', 'Birlikte vakit geçirmek', 'Önce biriyle konuşmak'],
      frequency: 'Ne sıklıkla yardım istiyorsunuz?', frequencies: ['Bir defa', 'Düzenli olarak', 'Henüz bilmiyorum'],
      show: 'Öneriyi gör', result: 'Buradan başlayabilirsiniz', change: 'Yanıtlarımı değiştir',
      reasons: ['Günlük işleri seçtiniz. Yardım istediğiniz bir işi anlatarak başlayabilirsiniz.', 'Eşlik desteğini seçtiniz. Nereye ve ne zaman gitmek istediğinizi anlatarak başlayabilirsiniz.', 'Birlikte vakit geçirmeyi seçtiniz. Neler yapmaktan hoşlandığınızı anlatarak başlayabilirsiniz.', 'Şimdi bir hizmet seçmeniz gerekmiyor. Bir görüşme, ne istediğinizi netleştirmenize yardımcı olabilir.'],
      frequencyNotes: ['İstediğiniz tarihi görüşmede belirtin.', 'İstediğiniz sıklığı görüşmede belirtin. Düzenli hizmet ayrıca kararlaştırılmalıdır.', 'Ne sıklıkla yardım istediğinize daha sonra karar verebilirsiniz.'],
      prepare: 'Görüşmeden önce', preparation: ['Kolaylaştırmak istediğiniz bir işi düşünün.', 'Size uygun olabilecek günleri düşünün.', 'Ziyaretten önce yapılacak işler, saat ve ücret kararlaştırılmalıdır.'],
      limit: 'Bu öneri yalnızca seçimlerinize dayanır. Müsaitlik, ücret veya randevu onayı değildir.'
    },
    ops: {
      title: 'İş takibi', note: 'Bu sayılar gerçek talepleri kapsar. Deneme verileri dahil değildir.',
      requests: 'Son 30 günde oluşturulan rezervasyonlar', cancelled: 'Bunların içinde iptal edilenler', inbox: 'Tamamlanmayı bekleyen mesajlar',
      capacity: 'Önümüzdeki 14 günde dolu görüşme saatleri', capacityNote: 'Dolu saatler / tüm açık saatler. Bu, görüşme kapasitesidir; ev ziyareti kapasitesi değildir.',
      empty: 'Bu dönemde kayıtlı veri yok.', cohort: 'İptal sayısı, iptalin tarihine bakılmaksızın son 30 günde oluşturulan rezervasyonları kapsar.',
      messageStates: {new: 'Yeni', in_progress: 'İşleniyor', closed: 'Tamamlandı'}, save: 'Durumu kaydet',
      stale: 'Bu mesaj başka bir işlemde değiştirildi. Kaydetmeden önce yeniden yükleyin.',
      closeSlot: 'Boş saati kaldır', closeConfirm: 'Bu boş saat kaldırılsın mı? Mevcut rezervasyonlar değişmeyecek.',
      occupied: 'Bu saat dolu olduğu için kaldırılamaz.', reserved: 'Dolu', available: 'Boş',
      statusSaved: 'Durum kaydedildi.', slotClosed: 'Boş saat kaldırıldı.',
      insightTitle: 'Bir sonraki inceleme ne olabilir?', insightEmpty: 'İçerik önceliği belirlemek için henüz yeterli izinli analiz verisi yok.',
      insightPopular: 'Bu örneklemde en çok görüntülenen içerik', insightReview: 'Bu bölümlerde sonraki adımın açık olup olmadığını inceleyin',
      insightNote: 'Görüntülenme ve ekranda 10 saniye kalma birer işarettir; okuma veya anlama kanıtı değildir. İnceleme kuralı en az 20 görüntülenme ve %30 altında kayıtlı etkileşimdir; bu eşik geçici bir çalışma kararıdır.',
      currentStep: 'Adım {n} / 3', steps: ['Yardım', 'Saat', 'Onay'], retrySlots: 'Uygun saatleri yeniden yükle',
      changedData: 'Seçimleriniz korundu. Yeniden deneyin.', recipient: 'Kim takip edecek?', recipientNote: 'Mesajınız NAVIAR CARE yöneticisinin ekranına kaydedilir. Mesaj göndermek, randevunun onaylandığı anlamına gelmez.'
    }
  }
};
