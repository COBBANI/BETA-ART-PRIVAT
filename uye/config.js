/* QBLOGG üye uygulaması — yapılandırma.
 *
 * Doğrudan yerel statik önizleme için boş değerler kurulum ekranını açar.
 * Vercel'de build.mjs, UYE_SUPABASE_URL ve UYE_SUPABASE_PUBLISHABLE_KEY
 * (veya UYE_SUPABASE_ANON_KEY) ortamından dist/config.js üretir.
 * service_role veya sb_secret_ anahtarı tarayıcıya verilmez.
 * Kurulum adımları: docs/uye-sistemi.md
 */
window.UYE_CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: ''
};
