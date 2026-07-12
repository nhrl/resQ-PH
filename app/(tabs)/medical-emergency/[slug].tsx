import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTranslation } from "react-i18next";

import BackButton from "../../components/backButton";
import TextLogo from "../../components/textLogo";
import DecisionTreeRunner from "../../components/emergency/DecisionTreeRunner";
import { getMedicalConditionBySlug } from "../../../data/medical/condition";

export default function MedicalConditionScreen() {
  const { t } = useTranslation();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const condition = getMedicalConditionBySlug(slug);

  if (!condition) {
    router.replace("/(tabs)/medical-emergency");
    return null;
  }

  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="px-5 pt-14 pb-10">
        <BackButton />
        <View className="mb-4">
          <TextLogo />
        </View>

        <Text className="text-3xl font-bold mt-6">
          {t(`medical.${condition.slug}.title`)}
        </Text>

        <DecisionTreeRunner
          slug={condition.slug}
          startNodeId={condition.startNodeId}
          nodes={condition.nodes}
        />
      </View>
    </ScrollView>
  );
}