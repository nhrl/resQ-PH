import { ScrollView, View, Text } from "react-native";
import BackButton from "../../components/backButton";
import TextLogo from "../../components/textLogo";

const EMERGENCY_KIT_ITEMS = [
  "Water (3 liters per person per day, 3-day supply)",
  "Non-perishable food (3-day supply)",
  "Flashlight and extra batteries",
  "First aid kit",
  "Whistle to signal for help",
  "Dust mask or N95",
  "Local maps",
  "Cellphone with chargers and a portable power bank",
  "Important documents (IDs, insurance, medical records) in a waterproof bag",
  "Cash in small bills",
  "Prescription medications",
  "Change of clothes and sturdy shoes",
  "Hygiene items (soap, toothbrush, sanitary supplies)",
  "Emergency contact list (printed)",
];

export default function EmergencyKitScreen() {
  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="px-5 pt-14 pb-10">
        <BackButton />

        <View className="mb-4">
          <TextLogo />
        </View>

        <Text className="text-3xl font-bold mt-6 mb-6">🎒 Emergency Kit</Text>

        {EMERGENCY_KIT_ITEMS.map((item, index) => (
          <Text key={index} className="mt-3 text-xl">
            • {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}