import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { useAppStore } from "../stores/useAppStore";
import { applyPersistedLanguage } from "../localization/i18n";
import type { LanguageCode } from "../types/i18n";

export default function LanguageScreen() {
  const setLanguage = useAppStore((state) => state.setLanguage);

  async function selectLanguage(language: LanguageCode) {
    await setLanguage(language);           // writes to LANGUAGE_STORAGE_KEY correctly
    await applyPersistedLanguage(language); // switches i18next's active language
    router.replace("/(tabs)");              // go straight to Home, skip re-running splash
  }

  return (
    <View className="flex-1 justify-center px-8 bg-white">
      <Text className="text-4xl font-bold text-center">
        Choose your preferred language
      </Text>

      <TouchableOpacity
        className="bg-white rounded-2xl mt-5 p-5 border border-gray-300 flex-row items-center"
        onPress={() => selectLanguage("en")}
      >
        <Text className="text-3xl mr-4">🇺🇸</Text>
        <Text className="text-black text-lg font-bold flex-1">English</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white rounded-2xl mt-5 p-5 border border-gray-300 flex-row items-center"
        onPress={() => selectLanguage("tl")}
      >
        <Text className="text-3xl mr-4">🇵🇭</Text>
        <Text className="text-black text-lg font-bold flex-1">Filipino</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white rounded-2xl mt-5 p-5 border border-gray-300 flex-row items-center"
        onPress={() => selectLanguage("ceb")}
      >
        <Text className="text-3xl mr-4">🇵🇭</Text>
        <Text className="text-black text-lg font-bold flex-1">Bisaya (Cebuano)</Text>
      </TouchableOpacity>
    </View>
  );
}