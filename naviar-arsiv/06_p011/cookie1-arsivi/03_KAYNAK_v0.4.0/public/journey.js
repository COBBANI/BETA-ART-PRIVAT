// Shared by the site, portable demonstration and request-journey tests.
export function requestError(data, minDate, maxDate) {
  if (String(data.name || '').trim().length < 2 || String(data.name).trim().length > 80) return ['name', 'invalid_name'];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email || '').trim())) return ['email', 'invalid_email'];
  if (!/^\d{4}$/.test(String(data.postcode || ''))) return ['postcode', 'invalid_postcode'];
  const parsedDate = new Date(String(data.date) + 'T12:00:00Z');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date || '') || data.date < minDate || data.date > maxDate || Number.isNaN(+parsedDate) || parsedDate.toISOString().slice(0, 10) !== data.date) return ['date', 'invalid_date'];
  if (!data.consent) return ['consent', 'consent_required'];
  return null;
}

export function reviewRows(data, t) {
  return [[t.forWhom, data.audience === 'family' ? t.family : t.self], [t.service, t[data.service]], [t.name, data.name], [t.email, data.email], [t.postcode, data.postcode], [t.date, data.date], [t.cost, t.costText]];
}
