/**
 * Reusable Yes/No decision engine. Node TEXT now comes from translations
 * via `t("medical.<slug>.tree.<nodeId>")` — the component itself only
 * walks the structural graph (ids, links, isEmergencyCall), so it works
 * identically regardless of active language.
 */
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Phone } from "lucide-react-native";
import * as Linking from "expo-linking";
import { useTranslation } from "react-i18next";

import type { DecisionNodeStructure } from "../../../types/medical";

interface DecisionTreeRunnerProps {
  slug: string;
  startNodeId: string;
  nodes: DecisionNodeStructure[];
}

export default function DecisionTreeRunner({ slug, startNodeId, nodes }: DecisionTreeRunnerProps) {
  const { t } = useTranslation();
  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);

  const nodeMap = new Map<string, DecisionNodeStructure>(nodes.map((n) => [n.id, n]));
  const currentNode = nodeMap.get(currentNodeId);

  if (!currentNode) {
    return <Text className="mt-8 text-center">{t("common.guidanceComplete")}</Text>;
  }

  const nodeText = t(`medical.${slug}.tree.${currentNode.id}`);

  function goTo(nextId: string | undefined) {
    if (nextId) setCurrentNodeId(nextId);
  }

  function callEmergency() {
    Linking.openURL("tel:911");
  }

  return (
    <View className="mt-8">
      {currentNode.isEmergencyCall && (
        <TouchableOpacity
          className="bg-primary rounded-2xl p-4 mb-4 flex-row items-center justify-center"
          onPress={callEmergency}
          accessibilityRole="button"
          accessibilityLabel={t("common.call911")}
        >
          <Phone color="white" size={20} />
          <Text className="text-white font-bold text-lg ml-2">{t("common.call911")}</Text>
        </TouchableOpacity>
      )}

      <View className="bg-slate-100 rounded-3xl p-6">
        <Text className="text-2xl font-bold text-center">{nodeText}</Text>
      </View>

      {currentNode.type === "question" ? (
        <View className="flex-row mt-6 gap-4">
          <TouchableOpacity
            className="flex-1 bg-success rounded-2xl p-5"
            onPress={() => goTo(currentNode.yesNext)}
            accessibilityRole="button"
            accessibilityLabel={t("common.yes")}
          >
            <Text className="text-white text-center text-xl font-bold">{t("common.yes")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-primary rounded-2xl p-5"
            onPress={() => goTo(currentNode.noNext)}
            accessibilityRole="button"
            accessibilityLabel={t("common.no")}
          >
            <Text className="text-white text-center text-xl font-bold">{t("common.no")}</Text>
          </TouchableOpacity>
        </View>
      ) : currentNode.nextId ? (
        <TouchableOpacity
          className="bg-secondary rounded-2xl p-5 mt-6"
          onPress={() => goTo(currentNode.nextId)}
          accessibilityRole="button"
          accessibilityLabel={t("common.next")}
        >
          <Text className="text-white text-center text-xl font-bold">{t("common.next")}</Text>
        </TouchableOpacity>
      ) : (
        <View className="bg-green-50 rounded-2xl p-4 mt-6">
          <Text className="text-center text-success font-bold">{t("common.guidanceComplete")}</Text>
        </View>
      )}
    </View>
  );
}