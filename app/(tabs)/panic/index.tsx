import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { HeartPulse, CloudRain } from "lucide-react-native";

import BackButton from "../../components/backButton";
import TextLogo from "../../components/textLogo";
import { useTranslation } from "react-i18next";

export default function PanicScreen() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 bg-slate-100 px-5 pt-14">
      <BackButton />

      <View className="mb-4">
        <TextLogo />
      </View>

      <Text className="text-3xl font-bold mt-6">
        {t("panic.title")}
      </Text>

      <Text className="text-gray-500 mt-2 mb-8">
        {t("panic.description")}
      </Text>

      {/* Medical Emergency */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/medical-emergency")}
        className="bg-red-100 rounded-2xl p-6 mb-5 flex-row items-center"
      >
        <HeartPulse size={42} color="#DC2626" />

        <View className="ml-4 flex-1">
          <Text className="text-2xl font-bold text-red-700">
            {t("panic.card1Title")}
          </Text>

          <Text className="text-gray-600 mt-1">
            {t("panic.card1Description")}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Disaster Emergency */}
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/disaster-preparedness")}
        className="bg-blue-100 rounded-2xl p-6 flex-row items-center"
      >
        <CloudRain size={42} color="#2563EB" />

        <View className="ml-4 flex-1">
          <Text className="text-2xl font-bold text-blue-700">
            Disaster Emergency
          </Text>

          <Text className="text-gray-600 mt-1">
            Typhoon, flood, earthquake, fire, volcanic eruption, and more.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}