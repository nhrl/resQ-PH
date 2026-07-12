import { View, Text, TouchableOpacity } from "react-native";
import { Phone, Trash2 } from "lucide-react-native";
import * as Linking from "expo-linking";
import { useTranslation } from "react-i18next";

interface ContactCardProps {
  name: string;
  phoneNumber: string;
  subtitle?: string;
  onDelete?: () => void;
}

export default function ContactCard({ name, phoneNumber, subtitle, onDelete }: ContactCardProps) {
  const { t } = useTranslation();

  function call() {
    Linking.openURL(`tel:${phoneNumber}`);
  }

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-center">
      <View className="flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-gray-500 mt-1">{phoneNumber}</Text>
        {subtitle && <Text className="text-xs text-gray-400 mt-1">{subtitle}</Text>}
      </View>

      <TouchableOpacity
        onPress={call}
        className="bg-success rounded-full w-12 h-12 items-center justify-center ml-2"
        accessibilityRole="button"
        accessibilityLabel={t("contacts.callAccessibility", { name })}
      >
        <Phone color="white" size={20} />
      </TouchableOpacity>

      {onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          className="bg-red-100 rounded-full w-12 h-12 items-center justify-center ml-2"
          accessibilityRole="button"
          accessibilityLabel={t("contacts.deleteAccessibility", { name })}
        >
          <Trash2 color="#DC2626" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}