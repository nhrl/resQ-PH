import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Backpack } from "lucide-react-native";

import BackButton from "../../components/backButton";
import TextLogo from "../../components/textLogo";
import { DISASTERS } from "../../../data/disaster/disaster";

export default function DisasterPreparednessScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="px-5 pt-14 pb-10">
        <BackButton />

        <View className="mb-4">
          <TextLogo />
        </View>

        <Text className="text-3xl font-bold mt-6 mb-6">
          🌪 {t("disasterPreparedness.title")}
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {DISASTERS.map((disaster) => {
            const Icon = disaster.icon;
            const title = t(`disasters.${disaster.slug}.title`);

            return (
              <TouchableOpacity
                key={disaster.slug}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/disaster-preparedness/[slug]",
                    params: { slug: disaster.slug },
                  })
                }
                className="w-[48%] rounded-2xl p-4 mb-4"
                style={{ backgroundColor: disaster.cardColor }}
                accessibilityRole="button"
                accessibilityLabel={title}
              >
                <Icon size={34} color={disaster.iconColor} />
                <Text className="mt-3 text-lg font-bold">{title}</Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/disaster-preparedness/emergency-kit")}
            className="w-[48%] rounded-2xl p-4 mb-4"
            style={{ backgroundColor: "#DCFCE7" }}
            accessibilityRole="button"
            accessibilityLabel={t("disasterPreparedness.emergencyKit")}
          >
            <Backpack size={34} color="#16A34A" />
            <Text className="mt-3 text-lg font-bold">
              {t("disasterPreparedness.emergencyKit")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}