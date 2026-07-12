import { Tabs } from "expo-router";
import { House, TriangleAlert, Settings } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#D32F2F",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
        },
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} />
          ),
        }}
      />

      {/* Panic */}
      <Tabs.Screen
        name="panic"
        options={{
          title: t("tabs.panic"),
          tabBarIcon: ({ color, size }) => (
            <TriangleAlert color={color} size={size} />
          ),
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.settings"),
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="disaster-preparedness"
        options={{ href: null }}
      />

      <Tabs.Screen 
        name="medical-emergency" 
        options={{ href: null }} 
      />

      <Tabs.Screen name="cpr" options={{ href: null }} />
      <Tabs.Screen name="emergency-contacts" options={{ href: null }} />
    </Tabs>

  );
}