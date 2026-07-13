import { useCallback, useEffect, useRef, useState } from "react";
import * as Speech from "expo-speech";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../stores/useAppStore";

const LOCALE_MAP: Record<string, string> = {
  en: "en-US",
  tl: "fil-PH",
  ceb: "fil-PH",
};

export function useVoiceGuidance() {
  const { i18n } = useTranslation();
  const voiceRate = useAppStore((state) => state.voiceRate);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const lastTextRef = useRef<string>("");

  const locale = LOCALE_MAP[i18n.language] ?? "en-US";

  const speak = useCallback(
    (text: string) => {
      Speech.stop();
      lastTextRef.current = text;
      setIsSpeaking(true);
      Speech.speak(text, {
        language: locale,
        rate: voiceRate,
        // No volume override — respects the phone's system media volume.
        onDone: () => setIsSpeaking(false),
        onStopped: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    },
    [locale, voiceRate]
  );

  const stop = useCallback(() => {
    Speech.stop();
    setIsSpeaking(false);
  }, []);

  const repeat = useCallback(() => {
    if (lastTextRef.current) speak(lastTextRef.current);
  }, [speak]);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return { speak, stop, repeat, isSpeaking };
}