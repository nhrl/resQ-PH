import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

import type { ContactCategory } from "../../../types/contact";

interface AddContactFormProps {
  onSubmit: (name: string, phoneNumber: string, category: ContactCategory) => void;
  onCancel: () => void;
}

const CATEGORY_VALUES: ContactCategory[] = ["family", "doctor", "barangay", "hospital", "other"];
const PHONE_PATTERN = /^[0-9+\-\s]+$/;

export default function AddContactForm({ onSubmit, onCancel }: AddContactFormProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState<ContactCategory>("family");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit() {
    if (!name.trim() || !phoneNumber.trim()) {
      setError(t("contacts.errorRequired"));
      return;
    }
    if (!PHONE_PATTERN.test(phoneNumber.trim())) {
      setError(t("contacts.errorInvalidPhone"));
      return;
    }
    setError(null);
    onSubmit(name, phoneNumber, category);
    setName("");
    setPhoneNumber("");
    setCategory("family");
  }

  return (
    <View className="bg-white rounded-2xl p-4 mb-4">
      <Text className="text-lg font-bold mb-3">{t("contacts.addContact")}</Text>

      <TextInput
        placeholder={t("contacts.namePlaceholder")}
        value={name}
        onChangeText={setName}
        className="border border-gray-200 rounded-xl p-3 mb-3"
      />
      <TextInput
        placeholder={t("contacts.phonePlaceholder")}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        className="border border-gray-200 rounded-xl p-3 mb-3"
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
        {CATEGORY_VALUES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full mr-2 ${
              category === cat ? "bg-primary" : "bg-gray-100"
            }`}
          >
            <Text className={category === cat ? "text-white" : "text-gray-700"}>
              {t(`contacts.categories.${cat}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {error && <Text className="text-primary mb-3">{error}</Text>}

      <View className="flex-row gap-3">
        <TouchableOpacity onPress={onCancel} className="flex-1 bg-gray-200 rounded-xl p-3 items-center">
          <Text className="font-bold text-gray-700">{t("contacts.cancel")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} className="flex-1 bg-primary rounded-xl p-3 items-center">
          <Text className="font-bold text-white">{t("contacts.save")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}