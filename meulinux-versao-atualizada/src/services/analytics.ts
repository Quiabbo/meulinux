export interface AnalyticsEvent {
  eventName: 'sign_up' | 'login' | 'trail_started' | 'step_viewed' | 'step_completed' | 'trail_completed' | 'logout';
  trailId?: string;
  stepId?: string;
  metadata?: any;
}

export const trackEvent = async (event: AnalyticsEvent) => {
  // Mock tracking to console/localStorage to keep analytics interface active
  try {
    const events = JSON.parse(localStorage.getItem('meulinux_local_events') || '[]');
    events.push({
      ...event,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('meulinux_local_events', JSON.stringify(events.slice(-100))); // keep last 100 events
    console.log('[Analytics Event]', event);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};
