
  const C = window.UYE_CONFIG || {};
  const el = (id) => document.getElementById(id);
  const goster = (id) => { for (const s of ['kurulum','giris','panel']) el(s).hidden = s !== id; };

  if (!C.supabaseUrl || !C.supabaseAnonKey) {
    goster('kurulum');
  } else {
    // lib/supabase.js: vendor'lanmış UMD paketi (bkz. lib/KAYNAK.md) — CDN yok.
    const { createClient } = window.supabase;
    const sb = createClient(C.supabaseUrl, C.supabaseAnonKey);

    async function panel(session) {
      goster('panel');
      el('cikis').hidden = false;
      const { data: profil } = await sb.from('profiles')
        .select('full_name, plan_status').eq('id', session.user.id).single();
      const aktif = profil && profil.plan_status === 'active';
      el('adSoyad').textContent = profil && profil.full_name ? ', ' + profil.full_name : '';
      const d = el('durum');
      d.textContent = aktif ? 'Pro — aktif' : (profil ? 'kayıtlı (ödemesiz)' : 'profil bulunamadı');
      d.classList.toggle('active', !!aktif);
      el('pasifNot').hidden = !!aktif;

      // RLS: aktif olmayan üyeye yalnız is_sample satırları döner.
      const { data: briefler, error } = await sb.from('briefs')
        .select('slug, title, summary, body_md, published_at, is_sample')
        .order('published_at', { ascending: false });
      const liste = el('liste');
      liste.textContent = '';
      if (error) { liste.textContent = 'Arşiv yüklenemedi: ' + error.message; return; }
      el('bosNot').hidden = !!(briefler && briefler.length);
      for (const b of (briefler || [])) {
        const kutu = document.createElement('article');
        kutu.className = 'brief';
        const h = document.createElement('h2');
        const t = document.createElement('time');
        t.dateTime = b.published_at; t.textContent = b.published_at + (b.is_sample ? ' · örnek' : '');
        const oz = document.createElement('p'); oz.className = 'muted'; oz.textContent = b.summary;
        const ac = document.createElement('button'); ac.className = 'ghost'; ac.type = 'button';
        ac.textContent = 'Oku';
        const gov = document.createElement('div'); gov.className = 'brief-body';
        gov.textContent = b.body_md;   // textContent: XSS'e kapı yok
        ac.addEventListener('click', () => {
          kutu.classList.toggle('open');
          ac.textContent = kutu.classList.contains('open') ? 'Kapat' : 'Oku';
        });
        h.textContent = b.title;
        kutu.append(h, t, oz, ac, gov);
        liste.append(kutu);
      }
    }

    el('girisForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = el('gonder'), msg = el('girisMsg');
      btn.disabled = true; btn.setAttribute('aria-busy', 'true');
      msg.className = 'msg'; msg.textContent = 'Gönderiliyor…';
      const { error } = await sb.auth.signInWithOtp({
        email: el('eposta').value.trim(),
        options: { emailRedirectTo: location.origin + location.pathname }
      });
      btn.disabled = false; btn.removeAttribute('aria-busy');
      if (error) { msg.className = 'msg err'; msg.textContent = 'Gönderilemedi: ' + error.message; }
      else { msg.className = 'msg ok';
        msg.textContent = 'Bağlantı gönderildi — e-postanızı kontrol edin (gelmezse istenmeyen kutusuna bakın).'; }
    });

    el('cikis').addEventListener('click', async () => { await sb.auth.signOut(); location.reload(); });

    const { data: { session } } = await sb.auth.getSession();
    if (session) panel(session); else goster('giris');
    sb.auth.onAuthStateChange((_e, s) => { if (s) panel(s); });
  }
