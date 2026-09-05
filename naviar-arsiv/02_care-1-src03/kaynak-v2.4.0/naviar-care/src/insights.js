// A content review aid, never a claim that a visitor read or understood a section.
export function contentInsights(events) {
  const totals = new Map();
  for (const event of events) {
    const value = totals.get(event.section) || {section: event.section, views: 0, engaged: 0};
    value.views += Number(event.views) || 0;
    value.engaged += Number(event.engaged) || 0;
    totals.set(event.section, value);
  }
  const eligible = [...totals.values()].filter(value => value.views >= 20);
  eligible.sort((a, b) => b.views - a.views || a.section.localeCompare(b.section));
  return {
    available: eligible.length > 0,
    mostViewed: eligible[0]?.section || null,
    review: eligible.filter(value => value.engaged / value.views < 0.3).map(value => value.section),
    minimumViews: 20,
    engagementThreshold: 0.3
  };
}

export async function operationMetrics(env, now = Date.now()) {
  const first = (query, args) => env.DB.prepare(query).bind(...args).first();
  const [bookings, messages, capacity] = await Promise.all([
    first("SELECT COUNT(*) AS total, COALESCE(SUM(CASE WHEN status='cancelled' THEN 1 ELSE 0 END),0) AS cancelled FROM bookings WHERE demo=0 AND created>=? AND created<=?", [now - 30 * 86400000, now]),
    first("SELECT COUNT(*) AS open FROM messages WHERE demo=0 AND status IN ('new','in_progress')", []),
    first("SELECT COUNT(*) AS total, COALESCE(SUM(CASE WHEN EXISTS(SELECT 1 FROM bookings b WHERE b.slot_id=s.id AND b.status='confirmed') THEN 1 ELSE 0 END),0) AS booked FROM slots s WHERE s.demo=0 AND s.active=1 AND s.start>=? AND s.start<?", [now, now + 14 * 86400000])
  ]);
  return {
    asOf: now,
    bookings: {total: bookings.total, cancelled: bookings.cancelled, cancellationRate: bookings.total ? bookings.cancelled / bookings.total : null, days: 30},
    messages: {open: messages.open},
    capacity: {total: capacity.total, booked: capacity.booked, fillRate: capacity.total ? capacity.booked / capacity.total : null, days: 14},
    demoExcluded: true
  };
}
