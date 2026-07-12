import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import BackButton from "../../components/backButton";
import TextLogo from "../../components/textLogo";
import { CPR_GUIDES } from "../../../data/cpr/cpr";

export default function CPRIndexScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-slate-100 px-5 pt-14">
      <BackButton />

      <View className="mb-4">
        <TextLogo />
      </View>

      <Text className="text-3xl font-bold mt-6 mb-2">🫀 {t("cprGuide.title")}</Text>
      <Text className="text-gray-500 mb-8">{t("cprGuide.subtitle")}</Text>

      {CPR_GUIDES.map((guide) => {
        const Icon = guide.icon;
        const title = t(`cpr.${guide.type}.title`);
        const ageRange = t(`cpr.${guide.type}.ageRange`);

        return (
          <TouchableOpacity
            key={guide.type}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/cpr/[type]",
                params: { type: guide.type },
              })
            }
            className="rounded-2xl p-5 mb-4 flex-row items-center"
            style={{ backgroundColor: guide.cardColor }}
            accessibilityRole="button"
            accessibilityLabel={title}
          >
            <Icon size={40} color={guide.iconColor} />
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold">{title}</Text>
              <Text className="text-gray-600 text-sm mt-1">{ageRange}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}