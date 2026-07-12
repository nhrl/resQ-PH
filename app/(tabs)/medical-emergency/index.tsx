import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import BackButton from "../../components/backButton";
import TextLogo from "../../components/textLogo";
import { MEDICAL_CONDITIONS } from "../../../data/medical/condition";

export default function MedicalEmergencyScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="px-5 pt-14 pb-10">
        <BackButton/>

        <View className="mb-4">
          <TextLogo />
        </View>

        <Text className="text-3xl font-bold mt-6 mb-6">🩺 {t("medicalEmergency.title")}</Text>

        <View className="flex-row flex-wrap justify-between">
          {MEDICAL_CONDITIONS.map((condition) => {
            const Icon = condition.icon;
            const title = t(`medical.${condition.slug}.title`);

            return (
              <TouchableOpacity
                key={condition.slug}
                onPress={() => {
                  router.push({
                    pathname: "/(tabs)/medical-emergency/[slug]",
                    params: { slug: condition.slug },
                  });
                }}
                className="w-[48%] rounded-2xl p-4 mb-4"
                style={{ backgroundColor: condition.cardColor }}
                accessibilityRole="button"
                accessibilityLabel={title}
              >
                <Icon size={34} color={condition.iconColor} />
                <Text className="mt-3 text-lg font-bold">{title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}