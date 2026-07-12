/**
 * Visual + haptic compression-rate timer for CPR guidance.
 * Pulses at 110 beats per minute (middle of AHA's 100-120 bpm range) to
 * help the rescuer keep a steady compression rhythm. Uses haptics instead
 * of audio for now — voice counting is a separate upcoming feature.
 */
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MotiView } from "moti";
import * as Haptics from "expo-haptics";
import { Play, Pause, RotateCcw } from "lucide-react-native";

const COMPRESSIONS_PER_MINUTE = 110;
const INTERVAL_MS = Math.round(60000 / COMPRESSIONS_PER_MINUTE);

export default function CompressionTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setCount((prev) => prev + 1);
      }, INTERVAL_MS);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  function toggle() {
    setIsRunning((prev) => !prev);
  }

  function reset() {
    setIsRunning(false);
    setCount(0);
  }

  return (
    <View className="bg-slate-100 rounded-3xl p-6 items-center mt-6">
      <Text className="text-sm text-gray-500 mb-2">
        Compression Rate: {COMPRESSIONS_PER_MINUTE} / min
      </Text>

      <MotiView
        key={count}
        from={{ scale: 1.3, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "timing", duration: INTERVAL_MS * 0.6 }}
        className="w-32 h-32 rounded-full bg-primary items-center justify-center"
      >
        <Text className="text-white text-4xl font-bold">{count}</Text>
      </MotiView>

      <View className="flex-row mt-6 gap-4">
        <TouchableOpacity
          onPress={toggle}
          className="bg-primary rounded-full w-16 h-16 items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel={isRunning ? "Pause" : "Play"}
        >
          {isRunning ? (
            <Pause color="white" size={26} />
          ) : (
            <Play color="white" size={26} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={reset}
          className="bg-gray-400 rounded-full w-16 h-16 items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Reset"
        >
          <RotateCcw color="white" size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
}