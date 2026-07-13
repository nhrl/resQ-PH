/**
 * Play / Pause / Repeat / Stop voice controls, per project spec.
 * "Pause" behaves as Stop on most Android TTS engines (expo-speech has no
 * true pause/resume) — tapping Play again after pausing restarts the
 * current text from the beginning, which is clearly indicated to the user
 * via the button icon switching between Play and Pause states.
 */
import { View, TouchableOpacity } from "react-native";
import { Play, Pause, RotateCcw, Square } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface VoiceControlsProps {
  text: string;
  isSpeaking: boolean;
  onPlay: (text: string) => void;
  onStop: () => void;
  onRepeat: () => void;
}

export default function VoiceControls({
  text,
  isSpeaking,
  onPlay,
  onStop,
  onRepeat,
}: VoiceControlsProps) {
  function handlePlayPause() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isSpeaking) {
      onStop();
    } else {
      onPlay(text);
    }
  }

  function handleRepeat() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onRepeat();
  }

  function handleStop() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onStop();
  }

  return (
    <View className="flex-row justify-center gap-4 mt-4">
      <TouchableOpacity
        onPress={handlePlayPause}
        className="bg-secondary rounded-full w-14 h-14 items-center justify-center"
        accessibilityRole="button"
        accessibilityLabel={isSpeaking ? "Pause" : "Play"}
      >
        {isSpeaking ? <Pause color="white" size={24} /> : <Play color="white" size={24} />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleRepeat}
        className="bg-gray-400 rounded-full w-14 h-14 items-center justify-center"
        accessibilityRole="button"
        accessibilityLabel="Repeat"
      >
        <RotateCcw color="white" size={24} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleStop}
        className="bg-primary rounded-full w-14 h-14 items-center justify-center"
        accessibilityRole="button"
        accessibilityLabel="Stop"
      >
        <Square color="white" size={22} />
      </TouchableOpacity>
    </View>
  );
}