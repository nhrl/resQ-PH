import { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Plus } from "lucide-react-native";
import { useTranslation } from "react-i18next";

import BackButton from "../../components/backButton";
import TextLogo from "../../components/textLogo";
import ContactCard from "../../components/emergency/ContactCard";
import AddContactForm from "../../components/emergency/AddContactForm";
import { useContactsStore } from "../../../stores/useContactsStore";
import { DEFAULT_HOTLINES } from "../../../data/contact/defaultHotlines";

export default function EmergencyContactsScreen() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const { contacts, isLoaded, loadContacts, addContact, deleteContact } = useContactsStore();

  useEffect(() => {
    if (!isLoaded) loadContacts();
  }, [isLoaded, loadContacts]);

  return (
    <ScrollView className="flex-1 bg-slate-100">
      <View className="px-5 pt-14 pb-10">
        <BackButton />
        <View className="mb-4">
          <TextLogo />
        </View>

        <Text className="text-3xl font-bold mt-6 mb-6">📞 {t("contacts.title")}</Text>

        <Text className="text-lg font-bold mb-3">{t("contacts.nationalHotlines")}</Text>
        {DEFAULT_HOTLINES.map((hotline) => (
          <ContactCard
            key={hotline.id}
            name={t(hotline.nameKey)}
            phoneNumber={hotline.phoneNumber}
          />
        ))}

        <Text className="text-lg font-bold mt-6 mb-3">{t("contacts.myContacts")}</Text>

        {contacts.length === 0 && !showForm && (
          <Text className="text-gray-400 mb-3">{t("contacts.noContacts")}</Text>
        )}

        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            phoneNumber={contact.phoneNumber}
            subtitle={t(`contacts.categories.${contact.category}`)}
            onDelete={() => deleteContact(contact.id)}
          />
        ))}

        {showForm ? (
          <AddContactForm
            onSubmit={(name, phoneNumber, category) => {
              addContact(name, phoneNumber, category);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <TouchableOpacity
            onPress={() => setShowForm(true)}
            className="bg-primary rounded-2xl p-4 flex-row items-center justify-center mt-2"
            accessibilityRole="button"
            accessibilityLabel={t("contacts.addContact")}
          >
            <Plus color="white" size={20} />
            <Text className="text-white font-bold ml-2">{t("contacts.addContact")}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}