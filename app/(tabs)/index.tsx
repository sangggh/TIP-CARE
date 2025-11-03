import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { logout } from ".././utils/authStorage";

const Index = () => {
    const router = useRouter();

    const today = new Date();

    const dateToday = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)/login");
    };

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
                                <Text className="text-2xl font-extrabold text-[#0077CC]">TIP Care</Text>
                                <Text className="text-sm text-gray-600 mt-1">Your mental wellness companion</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => router.push("/(profile)/profile")}
                    className="w-10 h-10 rounded-full bg-white justify-center items-center shadow mt-4">
                    <Image
                        source={require("@/assets/icons/profile.png")}
                        className="w-9 h-9"
                        resizeMode="contain"
                        tintColor="#0077CC"
                    />
                </TouchableOpacity>


            </View>
            <ScrollView className="space-y-3 px-5">

                <Text className="text-lg font-bold text-[#0077CC] mt-7 text-center text-[26px]">
                    Welcome back!
                </Text>

                <View
                    className="bg-white rounded-full flex-row items-center justify-center mt-4 py-3 px-5 shadow-sm">
                    <Image
                        source={require("@/assets/icons/calendar.png")}
                        className="w-5 h-5 mr-2"
                        resizeMode="contain"
                        tintColor="#0077CC"
                    />
                    <Text className="text-[#0077CC] font-medium text-[14px]">
                        {dateToday}
                    </Text>
                </View>

                <View className="bg-white rounded-2xl p-5 mt-5 shadow">
                    <View className="flex-row items-center mb-3">
                        <Image
                            source={require("@/assets/icons/checkin.png")}
                            className="w-10 h-10 mr-2"
                            resizeMode="contain"
                            tintColor="#0077CC"
                        />
                        <Text className="text-[#0077CC] font-semibold text-base">Daily Check-In</Text>
                    </View>
                    <Text className="text-gray-600 text-sm mb-4">
                        Take a moment to check in with yourself. How are you feeling today?
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push("/mood")}
                        className="bg-[#0077CC] rounded-xl py-3 items-center">
                        <View className="flex-row items-center">
                            <Image
                                source={require("@/assets/icons/star.png")}
                                className="w-5 h-5 mr-2"
                                resizeMode="contain"
                                tintColor="#FFFFFF"
                            />
                            <Text className="text-white font-semibold text-sm">Start Daily Check-in</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text className="text-[#0077CC] font-semibold mt-6 mb-2 text-base">
                    Quick Actions
                </Text>

                <View>
                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/mood")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/mood.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#FF607A"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">Log Mood</Text>
                                <Text className="text-gray-500 text-xs">Track how you are feeling today</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/journal")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/journal.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#C4B72B"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">Write Journal</Text>
                                <Text className="text-gray-500 text-xs">Express your thoughts privately</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/relax")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/relax.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#AACE97"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">Relax</Text>
                                <Text className="text-gray-500 text-xs">
                                    Breathing exercises & motivation
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text className="text-[#0077CC] font-semibold mt-6 mb-2 text-base">
                    Support Resources
                </Text>

                <View className="space-y-3 mb-10">
                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/clinics")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/emergency.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#F02629"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">
                                    Emergency Support
                                </Text>
                                <Text className="text-gray-500 text-xs">
                                    Immediate help & hotlines
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="mb-2">
                        <TouchableOpacity
                            onPress={() => router.push("/clinics")}
                            className="bg-white rounded-xl p-4 flex-row items-center shadow">
                            <Image
                                source={require("@/assets/icons/clinics.png")}
                                className="w-10 h-10 mr-3"
                                tintColor="#CB4DF5"
                            />
                            <View>
                                <Text className="text-blue-500 font-semibold text-sm">Find Clinics</Text>
                                <Text className="text-gray-500 text-xs">
                                    Mental health professionals
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Index;