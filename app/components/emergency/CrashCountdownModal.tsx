/**
 * Full-screen "Are you safe?" countdown, shown the moment a crash pattern
 * is detected (real or simulated). No response before the countdown ends
 * escalates to the full CrashAlertScreen.
 */
import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";

import { useCrashAlertStore } from "../../../stores/useCrashAlertStore";

const COUNTDOWN_SECONDS = 20;

export default function CrashCountdownModal() {
  const { t } = useTranslation();
  const phase = useCrashAlertStore((s) => s.phase);
  const confirmSafe = useCrashAlertStore((s) => s.confirmSafe);
  const countdownExpired = useCrashAlertStore((s) => s.countdownExpired);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (phase !== "countdown") return;

    setSecondsLeft(COUNTDOWN_SECONDS);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          countdownExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, countdownExpired]);

  return (
    <Modal visible={phase === "countdown"} transparent animationType="fade">
      <View className="flex-1 bg-black/80 items-center justify-center px-8">
        <Text className="text-white text-2xl font-bold text-center mb-2">
          {t("crashAlert.possibleImpact")}
        </Text>
        <Text className="text-white text-lg text-center mb-8">
          {t("crashAlert.areYouSafe")}
        </Text>

        <View className="w-32 h-32 rounded-full border-4 border-primary items-center justify-center mb-10">
          <Text className="text-white text-5xl font-bold">{secondsLeft}</Text>
        </View>

        <View className="flex-row gap-4 w-full">
          <TouchableOpacity
            onPress={confirmSafe}
            className="flex-1 bg-success rounded-2xl p-5"
            accessibilityRole="button"
            accessibilityLabel={t("common.yes")}
          >
            <Text className="text-white text-center text-xl font-bold">
              {t("crashAlert.yesImSafe")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={countdownExpired}
            className="flex-1 bg-primary rounded-2xl p-5"
            accessibilityRole="button"
            accessibilityLabel={t("common.no")}
          >
            <Text className="text-white text-center text-xl font-bold">
              {t("crashAlert.noNeedHelp")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}