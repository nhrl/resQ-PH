import { Stack } from "expo-router";
import { AppProviders } from "../providers/AppProviders";
import { CrashAlertProvider } from "../providers/CrashAlertProvider";
import "../global.css";

export default function RootLayout() {
  return (
    <AppProviders>
      <CrashAlertProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CrashAlertProvider>
    </AppProviders>
  );
}