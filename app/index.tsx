import { useEffect } from "react";
import { View, Text, ActivityIndicator, Image, Dimensions } from "react-native";
import { router } from "expo-router";

import TextLogo from "./components/textLogo";
import { applyPersistedLanguage } from "../localization/i18n";
import { useAppStore, LANGUAGE_STORAGE_KEY } from "../stores/useAppStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const screenWidth = Dimensions.get("window").width;
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
    <View className="flex-1 items-center justify-center bg-white px-8">
      {/* Logo */}
      <Image
        source={require("../assets/images/resqlogo.jpg")}
        className="mb-6 h-36 w-36 rounded-full"
        resizeMode="contain"
      />

      {/* App Name */}
      <TextLogo />

      {/* Subtitle */}
      <Text className="mt-6 text-center text-2xl font-bold text-blue-800">
        Offline Emergency
      </Text>

      <Text className="mt-1 text-center text-2xl font-bold text-blue-800">
        Decision Assistant
      </Text>

      {/* Tagline */}
      <View className="mt-20 items-center">
        <Text className="text-center text-lg text-gray-600">
          Helping you respond.
        </Text>

        <Text className="mt-1 text-center text-lg font-semibold text-red-600">
          Helping save lives.
        </Text>
      </View>

      {/* Loading */}
      <ActivityIndicator
        size="large"
        color="#1D4ED8"
        className="mt-12"
      />

      <Image
        source={require("../assets/images/bip.png")}
        style={{
          width: screenWidth,
          height: 180,
        }}
        resizeMode="contain"
      />
    </View>
    );
  }