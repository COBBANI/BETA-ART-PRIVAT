// Device preference only. A storage failure must never enable analytics or stop a form.
let sessionChoice: 'yes' | 'no' | null = null;
export function analyticsChoice() {
  if (sessionChoice !== null) return sessionChoice;
  try {
    const saved = localStorage.getItem('naviar.analytics');
    return saved === 'yes' || saved === 'no' ? saved : null;
  } catch { return null; }
}
export function saveAnalyticsChoice(yes: boolean) {
  sessionChoice = yes ? 'yes' : 'no';
  try {
    localStorage.setItem('naviar.analytics', sessionChoice);
    return true;
  } catch { return false; }
}
