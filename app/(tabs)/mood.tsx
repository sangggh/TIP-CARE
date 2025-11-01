import React, {useState, useEffect} from "react";
import {View, Text, TouchableOpacity, Alert, Modal, Dimensions, ScrollView, Image, Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BarChart} from "react-native-chart-kit";

const Mood = () => {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [todayMood, setTodayMood] = useState<string | null>(null);
    const [moodHistory, setMoodHistory] = useState<{ [key: string]: string }>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState<{ date: string; mood: string | null } | null>(null);
    const [modalMood, setModalMood] = useState<string | null>(null);

    const moods = [
        {label: "😊", name: "Happy"},
        {label: "😐", name: "Neutral"},
        {label: "😢", name: "Sad"},
        {label: "😡", name: "Angry"},
        {label: "😴", name: "Tired"},
    ];

    const todayKey = new Date().toISOString().split("T")[0];

    useEffect(() => {
        loadMoods();
    }, []);

    const loadMoods = async () => {
        try {
            const saved = await AsyncStorage.getItem("moodData");
            if (saved) {
                const parsed = JSON.parse(saved);
                setMoodHistory(parsed);
                if (parsed[todayKey]) setTodayMood(parsed[todayKey]);
            }
        } catch (error) {
            console.error("Error loading moods:", error);
        }
    };

    const saveMood = async () => {
        if (!selectedMood) {
            Alert.alert("No Mood Selected", "Please choose a mood before saving.");
            return;
        }

        try {
            const saved = (await AsyncStorage.getItem("moodData")) || "{}";
            const parsed = JSON.parse(saved);

            if (parsed[todayKey]) {
                Alert.alert("Already Saved", "You already set your mood for today!");
                return;
            }

            parsed[todayKey] = selectedMood;
            await AsyncStorage.setItem("moodData", JSON.stringify(parsed));
            setTodayMood(selectedMood);
            setMoodHistory(parsed);
            Alert.alert("Mood Saved", `You felt ${selectedMood} today!`);
        } catch (error) {
            console.error("Error saving mood:", error);
        }
    };

    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const key = date.toISOString().split("T")[0];
            const label = date.toLocaleDateString("en-US", {weekday: "short"});
            days.push({key, label});
        }
        return days;
    };

    const last7Days = getLast7Days();

    const openModal = (dateKey: string) => {
        const mood = moodHistory[dateKey] || null;
        setSelectedDay({date: dateKey, mood});
        setModalMood(mood);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedDay(null);
        setModalMood(null);
    };

    const updateMood = async () => {
        if (!modalMood || !selectedDay) {
            Alert.alert("Select a Mood", "Please choose a mood first.");
            return;
        }

        try {
            const saved = (await AsyncStorage.getItem("moodData")) || "{}";
            const parsed = JSON.parse(saved);
            parsed[selectedDay.date] = modalMood;
            await AsyncStorage.setItem("moodData", JSON.stringify(parsed));

            setMoodHistory(parsed);
            if (selectedDay.date === todayKey) setTodayMood(modalMood);

            Alert.alert("Updated!", `Mood updated!`);
            closeModal();
        } catch (error) {
            console.error("Error updating mood:", error);
        }
    };

    const getWeeklySummary = () => {
        const counts: Record<string, number> = {};
        moods.forEach((m) => (counts[m.name] = 0));

        last7Days.forEach((day) => {
            const mood = moodHistory[day.key];
            if (mood && counts[mood] !== undefined) counts[mood]++;
        });

        return counts;
    };

    const counts = getWeeklySummary();
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const mostFrequentMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

    return (
        <View className="flex-1 bg-blue-100">
            <View
                className="bg-[#E6F0FA] rounded-b-3xl px-6 pt-12 pb-6 flex-row justify-between items-center shadow-sm mt-0.5">
                <View className="mt-4">
                    <View className="flex-row items-center">
                        <View>
                            <View className="mr-2">
                                <Image
                                    source={require("@/assets/icons/heart.png")}
                                    className="w-10 h-10"
                                    resizeMode="contain"
                                    tintColor="#0077CC"
                                />
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text className="text-2xl font-extrabold text-[#0077CC]">Mood tracker</Text>
                                <Text className="text-sm text-gray-600 mt-1">Track your emotional journey</Text>
                            </View>
                        </View>
                    </View>
                </View>


                <TouchableOpacity
                    onPress={()=>{AsyncStorage.clear()}}
                    className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mt-4">
                    <Image
                        source={require("@/assets/icons/profile.png")}
                        className="w-9 h-9"
                        resizeMode="contain"
                        tintColor="#0077CC"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="space-y-3 px-6"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-white rounded-xl mt-5 px-2 shadow">
                    <View className="my-6">
                        <Text className="text-lg font-extrabold text-[#0077CC] mb-3 text-center">
                            PAST WEEK
                        </Text>
                        <View className="flex-row justify-between px-2">
                            {last7Days.map((day) => {
                                const moodName = moodHistory[day.key];
                                const moodEmoji =
                                    moods.find((m) => m.name === moodName)?.label || "❓";
                                return (
                                    <TouchableOpacity
                                        key={day.key}
                                        onPress={() => openModal(day.key)}
                                        className="items-center"
                                    >
                                        <Text className="text-2xl rounded-full p-1 bg-gray-200">{moodEmoji}</Text>
                                        <Text className="text-xs text-gray-700 mt-1">{day.label}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                </View>

                <View className="bg-white rounded-xl mt-5 px-2 shadow">
                    {todayMood ? (
                        <View className="items-center my-8">
                            <Text className="text-lg text-gray-700 mb-4">
                                You already rated your mood today:
                            </Text>
                            <View className="items-center p-3 rounded-2xl bg-blue-100">
                                <Text className="text-5xl mb-2 p-1">
                                    {moods.find((m) => m.name === todayMood)?.label}
                                </Text>
                                <Text className="text-xl font-semibold">{todayMood}</Text>
                            </View>
                        </View>
                    ) : (
                        <>
                            <View>
                                <View className="items-center">
                                    <Text className="text-lg text-gray-700 my-4">
                                        How was your mood today?
                                    </Text>
                                </View>
                                <View className="flex-row justify-around">
                                    {moods.map((mood) => (
                                        <TouchableOpacity
                                            key={mood.name}
                                            onPress={() => setSelectedMood(mood.name)}
                                            className={`items-center p-3 rounded-2xl ${
                                                selectedMood === mood.name ? "bg-blue-200" : "bg-gray-200"
                                            }`}
                                        >
                                            <Text className="text-4xl">{mood.label}</Text>
                                            <Text className="text-sm mt-1">{mood.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={saveMood}
                                className="bg-[#0077CC] rounded-2xl py-3 mt-8 mx-16 shadow-md mb-8"
                            >
                                <Text className="text-white text-center text-lg font-semibold">
                                    Save Mood
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <View className="bg-white rounded-xl mt-5 px-2 shadow">
                    <View className="my-8">
                        <Text className="text-lg font-semibold text-[#0077CC] mb-3 text-center">
                            Weekly Analytics
                        </Text>
                        {total > 0 ? (
                            <>
                                <Text className="text-center text-gray-700 mb-3">
                                    You were mostly <Text className="font-bold text-[#0077CC]">{mostFrequentMood}</Text> this
                                    week.
                                </Text>

                                <View className=" px-4 items-center">
                                    <BarChart
                                        data={{
                                            labels: moods.map((m) => m.name),
                                            datasets: [{data: moods.map((m) => counts[m.name])}],
                                        }}
                                        width={Dimensions.get("screen").width - 70}
                                        height={220}
                                        fromZero
                                        yAxisLabel=""
                                        yAxisSuffix=""
                                        chartConfig={{
                                            backgroundColor: "#ffffff",
                                            backgroundGradientFrom: "#E0F2FE",
                                            backgroundGradientTo: "#ffffff",
                                            decimalPlaces: 0,
                                            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
                                            labelColor: () => "#333",
                                        }}
                                    />
                                </View>
                            </>
                        ) : (
                            <Text className="text-center text-gray-500 mt-4">
                                No data yet. Start tracking your mood!
                            </Text>
                        )}
                    </View>

                </View>
            </ScrollView>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <View className="bg-white w-full rounded-2xl p-6 shadow-lg">
                        {selectedDay && (
                            <>
                                <Text className="text-xl font-bold text-center text-blue-700 mb-3">
                                    {new Date(selectedDay.date).toDateString()}
                                </Text>
                                <Text className="text-center text-gray-600 mb-4">
                                    {modalMood
                                        ? `Current Mood: ${modalMood}`
                                        : "No mood recorded. Choose one below:"}
                                </Text>
                                <View className="flex-row justify-around mb-4">
                                    {moods.map((mood) => (
                                        <TouchableOpacity
                                            key={mood.name}
                                            onPress={() => setModalMood(mood.name)}
                                            className={`items-center p-2 rounded-2xl ${
                                                modalMood === mood.name ? "bg-blue-200" : "bg-gray-100"
                                            }`}
                                        >
                                            <Text className="text-3xl">{mood.label}</Text>
                                            <Text className="text-xs mt-1">{mood.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <TouchableOpacity
                                    onPress={updateMood}
                                    className="bg-blue-500 py-3 rounded-xl mb-3"
                                >
                                    <Text className="text-center text-white font-semibold text-lg">
                                        Save Mood
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={closeModal}
                                    className="bg-gray-300 py-3 rounded-xl"
                                >
                                    <Text className="text-center text-gray-700 font-semibold text-lg">
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Mood;
