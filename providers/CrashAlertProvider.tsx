/**
 * Mounts crash detection and renders the countdown/alert overlays globally,
 * so they can appear on top of any screen in the app. Wrap this around
 * the app's Stack in app/_layout.tsx.
 */
import { useEffect } from "react";
import type { ReactNode } from "react";

import { useCrashDetection } from "../hooks/useCrashDetection";
import { useCrashAlertStore } from "../stores/useCrashAlertStore";
import CrashCountdownModal from "../app/components/emergency/CrashCountdownModal";
import CrashAlertScreen from "../app/components/emergency/CrashAlertScreen";

interface CrashAlertProviderProps {
  children: ReactNode;
}

export function CrashAlertProvider({ children }: CrashAlertProviderProps) {
  const loadMonitoringPreference = useCrashAlertStore((s) => s.loadMonitoringPreference);

  useEffect(() => {
    loadMonitoringPreference();
  }, [loadMonitoringPreference]);

  useCrashDetection();

  return (
    <>
      {children}
      <CrashCountdownModal />
      <CrashAlertScreen />
    </>
  );
}