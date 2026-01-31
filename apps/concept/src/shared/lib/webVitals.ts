import { onCLS, onFID, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Web Vitals monitoring utility
 * Tracks Core Web Vitals and other performance metrics
 */

// Metric reporting function type
export type ReportHandler = (metric: Metric) => void;

// Default console reporter
const defaultReporter: ReportHandler = (metric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
  }

  // Send to analytics in production
  if (import.meta.env.PROD) {
    // Example: Send to Google Analytics
    // gtag('event', metric.name, {
    //   value: Math.round(metric.value),
    //   event_category: 'Web Vitals',
    //   event_label: metric.id,
    //   non_interaction: true,
    // });

    // Example: Send to custom endpoint
    // fetch('/api/vitals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: metric.name,
    //     value: metric.value,
    //     id: metric.id,
    //     delta: metric.delta,
    //     entries: metric.entries,
    //   }),
    // });
  }
};

/**
 * Initialize Web Vitals monitoring
 * @param onReport - Optional custom report handler
 */
export function initWebVitals(onReport: ReportHandler = defaultReporter): void {
  // Core Web Vitals
  onCLS(onReport);  // Cumulative Layout Shift
  onFID(onReport);  // First Input Delay
  onFCP(onReport);  // First Contentful Paint
  onLCP(onReport);  // Largest Contentful Paint
  onTTFB(onReport); // Time to First Byte
}

/**
 * Get Web Vitals rating (good, needs-improvement, poor)
 * @param metricName - The metric name
 * @param value - The metric value
 */
export function getWebVitalsRating(
  metricName: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, [number, number]> = {
    CLS: [0.1, 0.25],      // Cumulative Layout Shift
    FID: [100, 300],       // First Input Delay (ms)
    FCP: [1800, 3000],     // First Contentful Paint (ms)
    LCP: [2500, 4000],     // Largest Contentful Paint (ms)
    TTFB: [800, 1800],     // Time to First Byte (ms)
    INP: [200, 500],       // Interaction to Next Paint (ms)
  };

  const [good, poor] = thresholds[metricName] || [0, 0];

  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Performance observer for custom metrics
 * @param entryType - The PerformanceEntry type to observe
 * @param callback - Callback when entries are observed
 */
export function observePerformance(
  entryType: string,
  callback: (entries: PerformanceEntryList) => void
): () => void {
  if (!('PerformanceObserver' in window)) {
    return () => {};
  }

  const observer = new PerformanceObserver((list) => {
    callback(list.getEntries());
  });

  try {
    observer.observe({ entryTypes: [entryType] as any });
  } catch (e) {
    console.warn(`[Web Vitals] Failed to observe ${entryType}:`, e);
  }

  return () => observer.disconnect();
}

/**
 * Measure custom performance marks
 * @param markName - The mark name
 * @param startMark - Optional start mark name
 */
export function measurePerformance(
  markName: string,
  startMark?: string
): PerformanceMeasure | undefined {
  if (!('performance' in window)) return;

  try {
    if (startMark) {
      return performance.measure(markName, startMark);
    }
    performance.mark(markName);
    return undefined;
  } catch (e) {
    console.warn(`[Web Vitals] Failed to measure ${markName}:`, e);
    return undefined;
  }
}

export default initWebVitals;
