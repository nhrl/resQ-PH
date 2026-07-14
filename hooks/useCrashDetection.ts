/**
 * Accelerometer-based crash detection (DEMO-grade, not production crash
 * detection). Triggers when acceleration magnitude spikes far above normal
 * handling (~1g at rest), followed by a period of relative stillness —
 * this pattern helps distinguish a hard impact from just picking up the
 * phone quickly or a single shake.
 *
 * Only active when isMonitoringEnabled is true (Settings toggle, off by
 * default) so there's no battery cost when the feature isn't in use.
 */
import { useEffect, useRef } from "react";
import { Accelerometer } from "expo-sensors";
import { useCrashAlertStore } from "../stores/useCrashAlertStore";

const IMPACT_THRESHOLD_G = 3.5;
const STILLNESS_THRESHOLD_G = 1.3;
const STILLNESS_WINDOW_MS = 1000;
const UPDATE_INTERVAL_MS = 100;

export function useCrashDetection() {
  const isMonitoringEnabled = useCrashAlertStore((s) => s.isMonitoringEnabled);
  const phase = useCrashAlertStore((s) => s.phase);
  const triggerCrash = useCrashAlertStore((s) => s.triggerCrash);

  const impactDetectedAtRef = useRef<number | null>(null);
  const subscriptionRef = useRef<ReturnType<typeof Accelerometer.addListener> | null>(null);

  useEffect(() => {
    if (!isMonitoringEnabled || phase !== "idle") {
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
      return;
    }

    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);

    subscriptionRef.current = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();

      if (impactDetectedAtRef.current === null) {
        if (magnitude > IMPACT_THRESHOLD_G) {
          impactDetectedAtRef.current = now;
        }
        return;
      }

      const elapsed = now - impactDetectedAtRef.current;
      if (elapsed > STILLNESS_WINDOW_MS) {
        // Stillness window passed — check if phone settled down (real impact
        // pattern) vs. still moving a lot (probably just vigorous shaking).
        if (magnitude < STILLNESS_THRESHOLD_G) {
          triggerCrash();
        }
        impactDetectedAtRef.current = null;
      }
    });

    return () => {
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
    };
  }, [isMonitoringEnabled, phase, triggerCrash]);
}