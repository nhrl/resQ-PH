import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useTranslation } from "react-i18next";

import BackButton from "../../components/backButton";
import TextLogo from "../../components/textLogo";
import VoiceControls from "../../components/voice/VoiceControls";
import { useVoiceGuidance } from "../../../hooks/useVoiceGuidance";
import { getDisasterBySlug } from "../../../data/disaster/disaster";

function Section({ title, color, items }: { title: string; color: string; items: string[] }) {
  return (
    <>
      <Text className="text-xl font-bold mt-8" style={{ color }}>{title}</Text>
      {items.map((item, index) => (
        <Text key={index} className={index === 0 ? "mt-3" : undefined}>• {item}</Text>
      ))}
    </>
  );
}

export default function DisasterDetailScreen() {
  const { t } = useTranslation();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const disaster = getDisasterBySlug(slug);

  if (!disaster) {
    router.replace("/(tabs)/disaster-preparedness");
    return null;
  }

  const before = t(`disasters.${disaster.slug}.before`, { returnObjects: true }) as string[];
  const during = t(`disasters.${disaster.slug}.during`, { returnObjects: true }) as string[];
  const after = t(`disasters.${disaster.slug}.after`, { returnObjects: true }) as string[];
  const firstAid = t(`disasters.${disaster.slug}.firstAid`, { returnObjects: true }) as string[];
  const fullText = [...before, ...during, ...after, ...firstAid].join(" ");

  const { speak, stop, repeat, isSpeaking } = useVoiceGuidance();

  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="px-5 pt-14 pb-10">
        <BackButton />
        <View className="mb-4">
          <TextLogo />
        </View>

        <Text className="text-3xl font-bold mt-6">
          {t(`disasters.${disaster.slug}.title`)}
        </Text>

        <Section title={t("common.before")} color="#16A34A" items={before} />
        <Section title={t("common.during")} color="#CA8A04" items={during} />
        <Section title={t("common.after")} color="#2563EB" items={after} />
        <Section title={t("common.firstAid")} color="#DC2626" items={firstAid} />

        <VoiceControls
          text={fullText}
          isSpeaking={isSpeaking}
          onPlay={speak}
          onStop={stop}
          onRepeat={repeat}
        />
      </View>
    </ScrollView>
  );
}