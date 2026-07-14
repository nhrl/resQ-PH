/**
 * Global crash alert state. Rendered as an overlay from CrashAlertProvider
 * so it can appear on top of ANY screen in the app, since a crash can be
 * detected while the user is anywhere (Home, CPR, Settings, etc.).
 */
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CrashAlertPhase } from "../types/crash";

const MONITORING_ENABLED_KEY = "@resqph/crashMonitoringEnabled";

interface CrashAlertState {
  isMonitoringEnabled: boolean;
  phase: CrashAlertPhase;
  loadMonitoringPreference: () => Promise<void>;
  setMonitoringEnabled: (enabled: boolean) => Promise<void>;
  triggerCrash: () => void;
  confirmSafe: () => void;
  cancelAlert: () => void;
  countdownExpired: () => void;
}

export const useCrashAlertStore = create<CrashAlertState>((set) => ({
  isMonitoringEnabled: false,
  phase: "idle",

  loadMonitoringPreference: async () => {
    const stored = await AsyncStorage.getItem(MONITORING_ENABLED_KEY);
    set({ isMonitoringEnabled: stored === "true" });
  },

  setMonitoringEnabled: async (enabled) => {
    await AsyncStorage.setItem(MONITORING_ENABLED_KEY, String(enabled));
    set({ isMonitoringEnabled: enabled });
  },

  triggerCrash: () => set({ phase: "countdown" }),
  confirmSafe: () => set({ phase: "idle" }),
  cancelAlert: () => set({ phase: "idle" }),
  countdownExpired: () => set({ phase: "active" }),
}));