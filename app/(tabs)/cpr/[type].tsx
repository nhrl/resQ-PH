import { ScrollView, View, Text, Image } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTranslation } from "react-i18next";

import BackButton from "../../components/backButton";
import TextLogo from "../../components/textLogo";
import CompressionTimer from "../../components/emergency/CompressionTimer";
import VoiceControls from "../../components/voice/VoiceControls";
import { useVoiceGuidance } from "../../../hooks/useVoiceGuidance";
import { getCPRGuideByType } from "../../../data/cpr/cpr";
import { getCprImage } from "../../../data/cpr/cprImage";

export default function CPRDetailScreen() {
  const { t } = useTranslation();
  const { type } = useLocalSearchParams<{ type: string }>();
  const guide = getCPRGuideByType(type);
  const { speak, stop, repeat, isSpeaking } = useVoiceGuidance();

  if (!guide) {
    router.replace("/(tabs)/cpr");
    return null;
  }

  const checkResponsiveness = t(`cpr.${guide.type}.checkResponsiveness`, { returnObjects: true }) as string[];
  const cycleInstructions = t(`cpr.${guide.type}.cycleInstructions`, { returnObjects: true }) as string[];
  const whenToStop = t(`cpr.${guide.type}.whenToStop`, { returnObjects: true }) as string[];
  const fullCycleText = cycleInstructions.join(" ");

  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="px-5 pt-14 pb-10">
        <BackButton/>
        <View className="mb-4">
          <TextLogo />
        </View>

        <Text className="text-3xl font-bold mt-6">{t(`cpr.${guide.type}.title`)}</Text>
        <Text className="text-gray-500 mt-1">{t(`cpr.${guide.type}.ageRange`)}</Text>

        <Text className="text-lg font-bold mt-8 text-primary">{t("common.checkResponsiveness")}</Text>
        {checkResponsiveness.map((step, i) => (
          <Text key={i} className="mt-2">• {step}</Text>
        ))}

        <Text className="text-lg font-bold mt-8 text-secondary">{t("common.handPosition")}</Text>
        <Text className="mt-2">{t(`cpr.${guide.type}.handPosition`)}</Text>

        <View className="flex-row mt-4 gap-3">
          <View className="flex-1 bg-white rounded-2xl p-4">
            <Text className="text-xs text-gray-500">{t("common.depth")}</Text>
            <Text className="font-bold mt-1">{t(`cpr.${guide.type}.compressionDepth`)}</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4">
            <Text className="text-xs text-gray-500">{t("common.rate")}</Text>
            <Text className="font-bold mt-1">{t(`cpr.${guide.type}.compressionRate`)}</Text>
          </View>
        </View>

        <Text className="text-lg font-bold mt-8 text-success">
          {t("common.compressionCycle", {
            compressions: guide.compressionsPerCycle,
            breaths: guide.breathsPerCycle,
          })}
        </Text>

        {cycleInstructions.map((step, i) => {
          const imageSource = guide.stepImages[i] ? getCprImage(guide.stepImages[i]) : undefined;
          return (
            <View key={i} className="mt-4">
              {imageSource && (
                <Image
                  source={imageSource}
                  className="w-full h-48 rounded-2xl mb-2"
                  resizeMode="cover"
                  accessibilityLabel={`${t(`cpr.${guide.type}.title`)} step ${i + 1}`}
                />
              )}
              <View className="flex-row">
                <Text className="font-bold mr-2">{i + 1}.</Text>
                <Text className="flex-1">{step}</Text>
              </View>
            </View>
          );
        })}

        <VoiceControls
          text={fullCycleText}
          isSpeaking={isSpeaking}
          onPlay={speak}
          onStop={stop}
          onRepeat={repeat}
        />

        <Text className="text-lg font-bold mt-8">{t("common.compressionTimer")}</Text>
        <CompressionTimer />

        <View className="bg-red-50 rounded-2xl p-4 mt-8">
          <Text className="text-lg font-bold text-primary">{t("common.whenToStop")}</Text>
          {whenToStop.map((item, i) => (
            <Text key={i} className="mt-2">• {item}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}