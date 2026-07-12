import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";

import TextLogo from "./components/textLogo";
import { applyPersistedLanguage } from "../localization/i18n";
import { useAppStore, LANGUAGE_STORAGE_KEY } from "../stores/useAppStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const hydrate = useAppStore((state) => state.hydrate);

  useEffect(() => {
    checkLanguage();
  }, []);

  async function checkLanguage() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await hydrate();
    await applyPersistedLanguage(useAppStore.getState().language);

    const hasChosenLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (hasChosenLanguage) {
      router.replace("/(tabs)");
    } else {
      router.replace("/language");
    }
  }

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <TextLogo />
      <Text className="text-blue-800 mt-6 text-xl font-semibold">Offline Emergency</Text>
      <Text className="text-blue-800 mt-2 text-xl font-semibold">Decision Assistant</Text>
      <Text className="text-blue-800 pt-[100px] text-xl font-semibold">Helping you respond</Text>
      <Text className="text-blue-800 mt-2 text-xl font-semibold">Helping save lives</Text>
      <ActivityIndicator size="large" color="white" className="mt-10" />
    </View>
  );
}