import { useState } from "react";
import { ScrollView, View, Text, Alert, TouchableOpacity } from "react-native";
import { Languages, Gauge, Volume2, Trash2, Info, FileText } from "lucide-react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import TextLogo from "../../components/textLogo";
import SettingsRow from "../../components/settings/SettingsRow";
import LanguagePickerModal from "../../components/settings/LanguagePickerModal";
import { useAppStore } from "../../../stores/useAppStore";
import { applyPersistedLanguage } from "../../../localization/i18n";
import { useVoiceGuidance } from "../../../hooks/useVoiceGuidance";
import { SUPPORTED_LANGUAGES } from "../../../types/i18n";
import type { LanguageCode } from "../../../types/i18n";
import { useCrashAlertStore } from "../../../stores/useCrashAlertStore";
import { AlertTriangle } from "lucide-react-native";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const voiceRate = useAppStore((state) => state.voiceRate);
  const setVoiceRate = useAppStore((state) => state.setVoiceRate);
  const { speak } = useVoiceGuidance();

  const currentLanguage =
  SUPPORTED_LANGUAGES.find((lang) => lang.code === language);

  const currentLanguageLabel =
    currentLanguage
      ? `${currentLanguage.flag} ${currentLanguage.nativeLabel}`
      : "🇺🇸 English";

  async function handleSelectLanguage(code: LanguageCode) {
    await setLanguage(code);
    await applyPersistedLanguage(code);
    setShowLanguageModal(false);
  }

  const isMonitoringEnabled = useCrashAlertStore((s) => s.isMonitoringEnabled);
  const setMonitoringEnabled = useCrashAlertStore((s) => s.setMonitoringEnabled);
  const triggerCrash = useCrashAlertStore((s) => s.triggerCrash);

  function handleResetData() {
    Alert.alert(
      t("settingsReset.text"),
      t("settingsReset.description"),
      [
        { text: t("settingsReset.cancel"), style: "cancel" },
        {
          text: t("settingsReset.confirm"),
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert("Data Reset", "All local data has been cleared. Please restart the app.");
          },
        },
      ]
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="px-5 pt-14 pb-10">
        <View className="mb-4">
          <TextLogo />
        </View>

        <Text className="text-3xl font-bold mt-6 mb-6">⚙️ {t("settings.title")}</Text>

        <Text className="text-sm font-bold text-gray-500 mb-2">{t("settings.general")}</Text>
        <SettingsRow
          icon={Languages}
          label={t("settingsLanguage.text")}
          value={currentLanguageLabel}
          onPress={() => setShowLanguageModal(true)}
        />

        <Text className="text-sm font-bold text-gray-500 mt-6 mb-2">{t("settings.voiceGuidance")}</Text>

        <View className="bg-white rounded-2xl p-4 mb-3">
          <View className="flex-row items-center mb-2">
            <Gauge size={20} color="#111827" />
            <Text className="ml-3 font-semibold">{t("settings.voiceSpeed")}</Text>
            <Text className="ml-auto text-gray-400">{voiceRate.toFixed(1)}x</Text>
          </View>
          <Slider
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            value={voiceRate}
            onValueChange={setVoiceRate}
            onSlidingComplete={(value) => speak(t("settings.voicePreviewText"))}
            minimumTrackTintColor="#D32F2F"
          />
        </View>
        <Text className="text-sm font-bold text-gray-500 mt-6 mb-2">{t("crashAlert.sectionTitle")}</Text>
        <SettingsRow
          icon={AlertTriangle}
          label={t("crashAlert.enableMonitoring")}
          type="toggle"
          toggleValue={isMonitoringEnabled}
          onToggle={setMonitoringEnabled}
        />
        {isMonitoringEnabled && (
          <TouchableOpacity
            onPress={triggerCrash}
            className="bg-yellow-100 border-2 border-yellow-500 rounded-2xl p-4 mb-3"
            accessibilityRole="button"
            accessibilityLabel={t("crashAlert.simulateCrash")}
          >
            <Text className="text-center font-bold text-yellow-800">
              ⚠️ {t("crashAlert.simulateCrash")}
            </Text>
            <Text className="text-center text-xs text-yellow-700 mt-1">
              {t("crashAlert.simulateCrashHint")}
            </Text>
          </TouchableOpacity>
        )}
        <Text className="text-sm font-bold text-gray-500 mt-6 mb-2">{t("settings.data")}</Text>
        <SettingsRow icon={Trash2} label={t("settingsReset.text")} type="info" onPress={handleResetData} />

        <Text className="text-sm font-bold text-gray-500 mt-6 mb-2">{t("settingsAbout.title")}</Text>
        <SettingsRow
          icon={Info}
          label={t("settingsAbout.text")}
          type="info"
          onPress={() => Alert.alert(t("settingsAbout.text"), t("settingsAbout.description"))}
        />
        <SettingsRow
          icon={FileText}
          label={t("settingsDisclaimer.text")}
          type="info"
          onPress={() => Alert.alert(t("settingsDisclaimer.text"), t("settingsDisclaimer.description"))}
        />
      </View>

      <LanguagePickerModal
        visible={showLanguageModal}
        currentLanguage={language}
        onSelect={handleSelectLanguage}
        onClose={() => setShowLanguageModal(false)}
      />
    </ScrollView>
  );
}