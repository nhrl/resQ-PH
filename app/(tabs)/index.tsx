import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import {
  HeartPulse,
  ShieldAlert,
  CloudRain,
  Phone,
} from "lucide-react-native";
import TextLogo from "../components/textLogo";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { t } = useTranslation();
  const quickAccess = [
  {
    title: t("emergency.emergencyAssistant"),
    description: t("emergency.guidedDecisionSupport"),
    icon: <ShieldAlert size={30} color="#DC2626" />,
    route: "/(tabs)/medical-emergency",
  },
  {
    title: t("cpr2.title"),
    description: `${t("cpr2.adult")} • ${t("cpr2.child")} • ${t("cpr2.infant")}`,
    icon: <HeartPulse size={30} color="#DC2626" />,
    route: "/(tabs)/cpr",
  },
  {
    title: t("disaster.title"),
    description: `${t("disaster.discription1")} • ${t("disaster.discription2")} • ${t("disaster.discription3")}`,
    icon: <CloudRain size={30} color="#2563EB" />,
    route: "/(tabs)/disaster-preparedness",
  },
  {
    title: t("emergency2.title"),
    description: t("emergency2.description"),
    icon: <Phone size={30} color="#2563EB" />,
    route: "/(tabs)/emergency-contacts",
  },
];

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="px-5 pt-14">

          <TextLogo />

          <Text className="text-center text-gray-500 mt-2">
            {t("homeView.description")}
          </Text>

          {/* Panic Button */}
          <TouchableOpacity className="bg-red-600 rounded-3xl h-44 justify-center items-center mt-8 active:opacity-80"
            onPress={() => router.push("/(tabs)/panic")}
          >
            <Text className="text-white text-5xl font-black">
              PANIC
            </Text>

            <Text className="text-white mt-3 text-base">
              {t("homeView.cardSupport")}
            </Text>
          </TouchableOpacity>
        

          <Text className="text-2xl font-bold mt-4 mb-4">
            {t("homeView.title")}
          </Text>

          {quickAccess.map((item) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => router.push(item.route as any)}
              className="bg-white rounded-2xl p-5 flex-row items-center justify-between mb-3"
            >
              <View className="flex-row items-center flex-1">
                {item.icon}

                <View className="ml-4 flex-1">
                  <Text className="text-lg font-bold">
                    {item.title}
                  </Text>

                  <Text className="text-gray-500">
                    {item.description}
                  </Text>
                </View>
              </View>

              <Text className="text-2xl text-gray-400">›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}