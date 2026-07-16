import type { ImageSourcePropType } from "react-native";

export const CPR_IMAGES: Record<string, ImageSourcePropType> = {
  "adult-step-1.png": require("../../assets/images/cpr/adult/STEP_1.jpeg"),
  "adult-step-2.png": require("../../assets/images/cpr/adult/STEP_2.jpeg"),
  "adult-step-3.png": require("../../assets/images/cpr/adult/STEP_3.png"),

  "child-step-1.png": require("../../assets/images/cpr/child/1.png"),
  "child-step-2.png": require("../../assets/images/cpr/child/2.png"),
  "child-step-3.png": require("../../assets/images/cpr/child/3.png"),

  "infant-step-1.png": require("../../assets/images/cpr/infant/1.png"),
  "infant-step-2.png": require("../../assets/images/cpr/infant/2.png"),
  "infant-step-3.png": require("../../assets/images/cpr/infant/3.png"),
};

export function getCprImage(
  filename: string
): ImageSourcePropType | undefined {
  return CPR_IMAGES[filename];
}