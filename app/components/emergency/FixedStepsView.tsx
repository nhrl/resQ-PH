/**
 * Generic translated fixed-step view. Currently unused since all medical
 * conditions are branching, but kept in case a future condition is
 * simpler and doesn't need a full decision tree.
 */
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

interface FixedStepsViewProps {
  slug: string;
}

export default function FixedStepsView({ slug }: FixedStepsViewProps) {
  const { t } = useTranslation();

  const warningSigns = t(`medical.${slug}.warningSigns`, { returnObjects: true }) as string[];
  const doNot = t(`medical.${slug}.doNot`, { returnObjects: true }) as string[];
  const whenToCall911 = t(`medical.${slug}.whenToCall911`, { returnObjects: true }) as string[];
  const steps = t(`medical.${slug}.steps`, { returnObjects: true }) as string[];

  return (
    <View>
      <Text className="text-lg font-bold mt-8 text-primary">{t("common.warningSigns")}</Text>
      {warningSigns.map((sign, i) => (
        <Text key={i} className="mt-2">• {sign}</Text>
      ))}

      <Text className="text-lg font-bold mt-8 text-red-700">{t("common.doNot")}</Text>
      {doNot.map((item, i) => (
        <Text key={i} className="mt-2">• {item}</Text>
      ))}

      <Text className="text-lg font-bold mt-8 text-success">{t("common.firstAidSteps")}</Text>
      {steps.map((step, i) => (
        <View key={i} className="flex-row mt-3">
          <Text className="font-bold mr-2">{i + 1}.</Text>
          <Text className="flex-1">{step}</Text>
        </View>
      ))}

      <View className="bg-red-50 rounded-2xl p-4 mt-8">
        <Text className="text-lg font-bold text-primary">{t("common.call911If")}</Text>
        {whenToCall911.map((item, i) => (
          <Text key={i} className="mt-2">• {item}</Text>
        ))}
      </View>
    </View>
  );
}