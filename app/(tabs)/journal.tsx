import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Entry = {
    title: string;
    content: string;
    date: string;
};

const Journal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [entries, setEntries] = useState<Entry[]>([]);
    const [entryText, setEntryText] = useState("");
    const [entryTitle, setEntryTitle] = useState("");
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const today = new Date();
    const dateToday = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const openNewEntry = () => {
        setEntryText("");
        setEntryTitle("");
        setEditingIndex(null);
        setModalVisible(true);
    };

    const openEditEntry = (index: number) => {
        const entry = entries[index];
        setEntryText(entry.content);
        setEntryTitle(entry.title);
        setEditingIndex(index);
        setModalVisible(true);
    };

    const saveEntry = () => {
        if (!entryText.trim()) return;

        const newEntry: Entry = {
            title: entryTitle.trim() || `Journal Entry #${entries.length + 1}`,
            content: entryText.trim(),
            date: dateToday,
        };

        if (editingIndex !== null) {
            const updated = [...entries];
            updated[editingIndex] = newEntry;
            setEntries(updated);
        } else {
            setEntries((prev) => [...prev, newEntry]);
        }

        setEntryText("");
        setEntryTitle("");
        setEditingIndex(null);
        setModalVisible(false);
    };

    const deleteEntry = () => {
        if (editingIndex !== null) {
            const updated = [...entries];
            updated.splice(editingIndex, 1);
            setEntries(updated);
        }
        setEntryText("");
        setEntryTitle("");
        setEditingIndex(null);
        setModalVisible(false);
    };

    const filteredEntries = entries.filter(
        (entry) =>
            entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-blue-100">
            <View className="bg-[#E6F0FA] rounded-b-3xl px-6 pt-12 pb-6 flex-row justify-between items-center shadow-sm mt-0.5">
                <View className="mt-4 flex-row items-center">
                    <Image
                        source={require("@/assets/icons/heart.png")}
                        className="w-10 h-10 mr-2"
                        resizeMode="contain"
                        tintColor="#0077CC"
                    />
                    <View>
                        <Text className="text-2xl font-extrabold text-[#0077CC]">Personal Journal</Text>
                        <Text className="text-sm text-gray-600 mt-1">Your private space for reflection</Text>
                    </View>
                </View>
                <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mt-4">
                    <Image
                        source={require("@/assets/icons/profile.png")}
                        className="w-9 h-9"
                        resizeMode="contain"
                        tintColor="#0077CC"
                    />
                </TouchableOpacity>
            </View>
            <View className="p-5">
                <SearchBar
                    placeholder="Search entries"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity
                    onPress={openNewEntry}
                    className="bg-[#0077CC] rounded-full py-3 items-center mt-5"
                >
                    <View className="flex-row items-center">
                        <Image
                            source={require("@/assets/icons/plus.png")}
                            className="w-5 h-5 mr-2"
                            resizeMode="contain"
                            tintColor="#FFFFFF"
                        />
                        <Text className="text-white font-semibold text-sm">New Entry</Text>
                    </View>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {filteredEntries.map((entry, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => openEditEntry(index)}
                            className="bg-white rounded-2xl p-4 mt-5"
                        >
                            <View className="flex-row items-center justify-between">
                                <Text className="text-[#0077CC] font-semibold text-[18px]">{entry.title}</Text>
                                <Image
                                    source={require("@/assets/icons/note.png")}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                />
                            </View>
                            <View className="flex-row items-center mt-2 mb-4">
                                <Image
                                    source={require("@/assets/icons/calendar.png")}
                                    className="w-5 h-5 mr-2"
                                    resizeMode="contain"
                                    tintColor="gray"
                                />
                                <Text className="text-gray-500 text-sm">{entry.date}</Text>
                            </View>
                            <Text className="text-gray-600 text-sm" numberOfLines={3}>
                                {entry.content}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1 bg-blue-100"
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                        <View className="bg-[#E6F0FA] rounded-b-3xl px-6 pt-12 pb-6 flex-row justify-between items-center shadow-sm">
                            <View className="flex-row items-center">
                                <TouchableOpacity
                                    className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mr-4"
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Image
                                        source={require("@/assets/icons/close.png")}
                                        className="w-6 h-6"
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text className="text-2xl font-extrabold text-[#0077CC]">
                                        {editingIndex !== null ? "Edit Note" : "New Note"}
                                    </Text>
                                    <Text className="text-sm text-gray-600 mt-1">{dateToday}</Text>
                                </View>
                            </View>

                            {editingIndex !== null && (
                                <TouchableOpacity
                                    className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mt-4"
                                    onPress={deleteEntry}
                                >
                                    <Image
                                        source={require("@/assets/icons/trash.png")}
                                        className="w-6 h-6"
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mt-4"
                                onPress={saveEntry}
                            >
                                <Image
                                    source={require("@/assets/icons/check.png")}
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="px-6 mt-6">
                            <Text className="text-gray-700 mb-2 font-semibold">Title:</Text>
                            <View className="bg-white rounded-xl p-3 shadow mb-4">
                                <TextInput
                                    placeholder="Entry title"
                                    value={entryTitle}
                                    onChangeText={setEntryTitle}
                                    className="text-gray-800 text-base"
                                />
                            </View>

                            <Text className="text-gray-700 mb-2 font-semibold">Your thoughts:</Text>
                            <View className="bg-white rounded-xl p-4 shadow">
                                <TextInput
                                    multiline
                                    placeholder="Write your journal entry here..."
                                    value={entryText}
                                    onChangeText={setEntryText}
                                    className="text-gray-800 text-base"
                                    style={{ minHeight: 120, textAlignVertical: "top" }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}
export default Journal;