import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import SearchBar from "@/components/SearchBar";

const Clinics = () => {
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
                                <Text className="text-2xl font-extrabold text-[#0077CC]">Clinics Directory</Text>
                                <Text className="text-sm text-gray-600 mt-1">Metro Manila mental health services</Text>
                            </View>
                        </View>
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
                    placeholder="Search clinics"
                />

                <ScrollView
                    className="space-y-3 p-2"
                    contentContainerStyle={{
                        paddingBottom: 200,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="bg-white rounded-2xl p-4 mt-5 shadow">
                        <View className="flex-row items-center">
                            <View>
                                <TouchableOpacity>
                                    <Text className="text-[#0077CC] font-semibold text-[20px]">
                                        National Center for Mental Health (NCMH)</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex-row items-center">
                            <View className="bg-red-300 rounded-full px-2 mt-3 mr-1">
                                <Text className="text-[10px]">Emergency</Text>
                            </View>
                            <View className="bg-red-300 rounded-full px-2 mt-3">
                                <Text className="text-[10px]">Hospital</Text>
                            </View>
                        </View>
                        <View className="mt-1">
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/location.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">Mental Health advocacy and referral
                                    services</Text>
                            </View>
                            <View className="flex-row items-center mt-1">
                                <Image
                                    source={require("@/assets/icons/clock.png")}
                                    className="w-4 h-4 mr-1"
                                    resizeMode="contain"
                                    tintColor="gray-600"
                                />
                                <Text className="text-sm text-grey-600">24/7 Emergency Services</Text>
                            </View>
                        </View>
                        <View className="mt-5 flex-row items-center">
                            <View>
                                <Text className="text-sm">Services Offered: </Text>
                            </View>
                            <View>
                                <View>
                                    <View className="bg-gray-300 rounded-full mr-1 px-2">
                                        <Text className="text-sm">Emergency Psychiatric Care</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View className="flex-row items-center mt-5 justify-center mx-5">
                            <View className="bg-blue-500 rounded-2xl p-4 mr-4">
                                <TouchableOpacity className="flex-row items-center">
                                    <Image
                                        source={require("@/assets/icons/phone-call.png")}
                                        className="w-4 h-4 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold">(02) 8-531-9001</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="bg-blue-500 rounded-2xl p-4">
                                <TouchableOpacity className="flex-row items-center">
                                    <Image
                                        source={require("@/assets/icons/world-wide-web.png")}
                                        className="w-4 h-4 mr-1"
                                        resizeMode="contain"
                                        tintColor="white"
                                    />
                                    <Text className="text-white font-bold">Website</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Clinics;