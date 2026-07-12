import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function BackButton() {
    return (
        <TouchableOpacity
                onPress={() => router.back()}
                  className="w-12 h-12 rounded-full bg-white items-center justify-center mb-5"
                >
                  <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
    )
}