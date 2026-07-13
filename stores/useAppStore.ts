/**
 * Global app-level state: language, theme, voice speed, and
 * initialization status. Persisted values are saved to AsyncStorage so
 * they survive app restarts without needing the database.
 *
 * LANGUAGE_STORAGE_KEY is exported so other files (splash screen,
 * language selection screen) check/read the exact same key — never
 * duplicate this string elsewhere, or the "has user picked a language"
 * check will silently break.
 */
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { LanguageCode } from "../types/i18n";

interface AppState {
  isAppReady: boolean;
  language: LanguageCode;
  isDarkMode: boolean;
  voiceRate: number;
  setAppReady: (ready: boolean) => void;
  setLanguage: (language: LanguageCode) => Promise<void>;
  setDarkMode: (isDark: boolean) => Promise<void>;
  setVoiceRate: (rate: number) => Promise<void>;
  hydrate: () => Promise<void>;
}

export const LANGUAGE_STORAGE_KEY = "@resqph/language";
const DARK_MODE_STORAGE_KEY = "@resqph/darkMode";
const VOICE_RATE_KEY = "@resqph/voiceRate";

export const useAppStore = create<AppState>((set) => ({
  isAppReady: false,
  language: "en",
  isDarkMode: false,
  voiceRate: 1.0,

  setAppReady: (ready) => set({ isAppReady: ready }),

  setLanguage: async (language) => {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    set({ language });
  },

  setDarkMode: async (isDark) => {
    await AsyncStorage.setItem(DARK_MODE_STORAGE_KEY, String(isDark));
    set({ isDarkMode: isDark });
  },

  setVoiceRate: async (rate) => {
    await AsyncStorage.setItem(VOICE_RATE_KEY, String(rate));
    set({ voiceRate: rate });
  },

  hydrate: async () => {
    const [storedLanguage, storedDarkMode, storedRate] = await Promise.all([
      AsyncStorage.getItem(LANGUAGE_STORAGE_KEY),
      AsyncStorage.getItem(DARK_MODE_STORAGE_KEY),
      AsyncStorage.getItem(VOICE_RATE_KEY),
    ]);

    set({
      language: (storedLanguage as LanguageCode) ?? "en",
      isDarkMode: storedDarkMode === "true",
      voiceRate: storedRate ? parseFloat(storedRate) : 1.0,
    });
  },
}));