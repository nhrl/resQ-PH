/**
 * Bottom-sheet-style modal for changing the app language from Settings.
 * Reuses the same SUPPORTED_LANGUAGES list as the first-launch Language
 * screen, so both stay in sync automatically if a language is added later.
 */
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { Check } from "lucide-react-native";

import { SUPPORTED_LANGUAGES } from "../../../types/i18n";
import type { LanguageCode } from "../../../types/i18n";

interface LanguagePickerModalProps {
  visible: boolean;
  currentLanguage: LanguageCode;
  onSelect: (code: LanguageCode) => void;
  onClose: () => void;
}

export default function LanguagePickerModal({
  visible,
  currentLanguage,
  onSelect,
  onClose,
}: LanguagePickerModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 bg-black/40 justify-end"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-bold mb-4">Select Language</Text>

          {SUPPORTED_LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              onPress={() => onSelect(lang.code)}
              className="flex-row items-center justify-between p-4 rounded-2xl mb-2 bg-slate-50"
              accessibilityRole="button"
              accessibilityLabel={lang.nativeLabel}
            >
              <Text className="text-lg font-semibold">{lang.nativeLabel}</Text>
              {currentLanguage === lang.code && (
                <Check size={20} color="#D32F2F" />
              )}
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}