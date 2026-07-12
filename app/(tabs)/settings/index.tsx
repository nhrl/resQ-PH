/**
 * Settings screen. Covers: Language, Dark Mode, Voice Speed, Voice Volume,
 * Reset Data, About, Disclaimer (per project spec).
 *
 * Voice Speed/Volume are stored here now (via useAppStore) so the values
 * are ready to consume once the Voice Guidance feature is built — they
 * don't yet affect any audio playback since that feature doesn't exist yet.
 */
import { useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import {
  Languages,
  Trash2,
  Info,
  FileText,
} from "lucide-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import TextLogo from "../../components/textLogo";
import SettingsRow from "../../components/settings/SettingsRow";
import LanguagePickerModal from "../../components/settings/LanguagePickerModal";
import { useAppStore } from "../../../stores/useAppStore";
import { applyPersistedLanguage } from "../../../localization/i18n";
import { SUPPORTED_LANGUAGES } from "../../../types/i18n";
import type { LanguageCode } from "../../../types/i18n";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const { t } = useTranslation();
  const currentLanguageLabel =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === language)?.nativeLabel ?? "English";

  async function handleSelectLanguage(code: LanguageCode) {
    await setLanguage(code);
    await applyPersistedLanguage(code);
    setShowLanguageModal(false);
  }

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

        <Text className="text-3xl font-bold mt-6 mb-6">⚙️ Settings</Text>

        <Text className="text-sm font-bold text-gray-500 mb-2">GENERAL</Text>
        <SettingsRow
          icon={Languages}
          label={t("settingsLanguage.text")}
          value={currentLanguageLabel}
          onPress={() => setShowLanguageModal(true)}
        />

        <Text className="text-sm font-bold text-gray-500 mt-6 mb-2">DATA</Text>
        <SettingsRow icon={Trash2} label={t("settingsReset.text")} type="info" onPress={handleResetData} />

        <Text className="text-sm font-bold text-gray-500 mt-6 mb-2">{t("settingsAbout.title")}</Text>
        <SettingsRow
          icon={Info}
          label={t("settingsAbout.text")}
          type="info"
          onPress={() =>
            Alert.alert(
              t("settingsAbout.text"),
              t("settingsAbout.description")
            )
          }
        />
        <SettingsRow
          icon={FileText}
          label={t("settingsDisclaimer.text")}
          type="info"
          onPress={() =>
            Alert.alert(
              t("settingsDisclaimer.text"),
              t("settingsDisclaimer.description")
            )
          }
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