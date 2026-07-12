/**
 * Reusable settings list row. Supports three interaction types:
 * - "navigate": tappable row that opens something (e.g. Language picker)
 * - "toggle": switch control (e.g. Dark Mode)
 * - "info": tappable row that just shows a static screen/modal (About, Disclaimer)
 */
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { ChevronRight, type LucideIcon } from "lucide-react-native";

interface SettingsRowProps {
  icon: LucideIcon;
  label: string;
  value?: string;
  type?: "navigate" | "toggle" | "info";
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
}

export default function SettingsRow({
  icon: Icon,
  label,
  value,
  type = "navigate",
  toggleValue,
  onToggle,
  onPress,
}: SettingsRowProps) {
  return (
    <TouchableOpacity
      onPress={type === "toggle" ? undefined : onPress}
      disabled={type === "toggle"}
      className="flex-row items-center bg-white rounded-2xl p-4 mb-3"
      accessibilityRole={type === "toggle" ? undefined : "button"}
      accessibilityLabel={label}
    >
      <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
        <Icon size={20} color="#111827" />
      </View>

      <Text className="flex-1 ml-3 text-base font-semibold text-text">{label}</Text>

      {type === "toggle" && onToggle && (
        <Switch value={toggleValue} onValueChange={onToggle} />
      )}

      {type === "navigate" && (
        <View className="flex-row items-center">
          {value && <Text className="text-gray-400 mr-2">{value}</Text>}
          <ChevronRight size={20} color="#9CA3AF" />
        </View>
      )}

      {type === "info" && <ChevronRight size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );
}