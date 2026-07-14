/**
 * Full-screen emergency alert.
 * Activates when the countdown expires or the user taps
 * "No, I need help."
 */

import { useEffect, useRef, useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import * as Brightness from "expo-brightness";
import {
  activateKeepAwakeAsync,
  deactivateKeepAwake,
} from "expo-keep-awake";

import { CameraView, useCameraPermissions } from "expo-camera";

import {
  createAudioPlayer,
  setAudioModeAsync,
} from "expo-audio";

import { useCrashAlertStore } from "../../../stores/useCrashAlertStore";

// SOS pattern
const SOS_PATTERN = [
  200,
  200,
  200,
  600,
  600,
  600,
  200,
  200,
  200,
];

export default function CrashAlertScreen() {
  const { t } = useTranslation();

  const phase = useCrashAlertStore((s) => s.phase);
  const cancelAlert = useCrashAlertStore((s) => s.cancelAlert);

  const [torchOn, setTorchOn] = useState(false);

  const [cameraPermission, requestCameraPermission] =
    useCameraPermissions();

  const previousBrightnessRef = useRef<number | null>(null);

  const playerRef = useRef<ReturnType<typeof createAudioPlayer> | null>(
    null
  );

  /**
   * Brightness + Keep Awake
   */
  useEffect(() => {
    if (phase !== "active") return;

    (async () => {
      try {
        const { status } = await Brightness.getPermissionsAsync();

        if (status !== "granted") {
          await Brightness.requestPermissionsAsync();
        }

        previousBrightnessRef.current =
          await Brightness.getBrightnessAsync();

        await Brightness.setBrightnessAsync(1);
      } catch {}

      await activateKeepAwakeAsync();
    })();

    return () => {
      deactivateKeepAwake();

      if (previousBrightnessRef.current != null) {
        Brightness.setBrightnessAsync(
          previousBrightnessRef.current
        ).catch(() => {});
      }
    };
  }, [phase]);

  /**
   * Camera Permission
   */
  useEffect(() => {
    if (phase === "active" && !cameraPermission?.granted) {
      requestCameraPermission();
    }
  }, [phase, cameraPermission]);

  /**
   * Flashlight SOS
   */
  useEffect(() => {
    if (phase !== "active") return;
    if (!cameraPermission?.granted) return;

    let cancelled = false;
    let index = 0;

    async function blink() {
      while (!cancelled) {
        setTorchOn(true);

        await new Promise((r) =>
          setTimeout(r, SOS_PATTERN[index % SOS_PATTERN.length])
        );

        setTorchOn(false);

        await new Promise((r) => setTimeout(r, 200));

        index++;
      }
    }

    blink();

    return () => {
      cancelled = true;
      setTorchOn(false);
    };
  }, [phase, cameraPermission]);

  /**
   * Siren
   */
  useEffect(() => {
  if (phase !== "active") return;

  let mounted = true;

  (async () => {
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
      });

      const player = createAudioPlayer(
        require("../../../assets/sounds/siren.mp3")
      );

      player.loop = true;

      playerRef.current = player;

      if (mounted) {
        player.play();
      }
    } catch (e) {
      console.log("Audio Error:", e);
    }
  })();

  return () => {
    mounted = false;
  };
}, [phase]);

    function stopAlarm() {
        if (playerRef.current) {
            try {
            playerRef.current.pause();
            playerRef.current.seekTo(0);
            playerRef.current.remove();
            } catch {}

            playerRef.current = null;
        }
    }

  function handleCancel() {
    cancelAlert();
    stopAlarm();
  }

  function handleGoToPanicMode() {
    cancelAlert();
    stopAlarm();
    router.push("/(tabs)/panic");
  }

  return (
    <Modal visible={phase === "active"} animationType="fade">
      <View className="flex-1 bg-primary items-center justify-center px-8">

        {cameraPermission?.granted && (
          <CameraView
            style={{
              width: 1,
              height: 1,
              position: "absolute",
              opacity: 0,
            }}
            facing="back"
            enableTorch={torchOn}
          />
        )}

        <Text className="text-white text-4xl font-bold text-center mb-4">
          {t("crashAlert.emergencyTitle")}
        </Text>

        <Text className="text-white text-xl text-center mb-10">
          {t("crashAlert.emergencyMessage")}
        </Text>

        <TouchableOpacity
          onPress={handleGoToPanicMode}
          className="bg-white rounded-2xl p-5 w-full mb-4"
        >
          <Text className="text-primary text-center text-lg font-bold">
            {t("crashAlert.openPanicMode")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCancel}
          className="border-2 border-white rounded-2xl p-5 w-full"
        >
          <Text className="text-white text-center text-lg font-bold">
            {t("crashAlert.imOkCancel")}
          </Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
}