import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { logout } from "../utils/authStorage";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-blue-100 px-6 pt-12">
      {/* Profile Header */}
      <View className="items-center mb-6">
        <Image
          source={require("@/assets/icons/profile.png")}
          className="w-24 h-24 rounded-full mb-4"
          resizeMode="contain"
          tintColor="#0077CC"
        />
        <Text className="text-2xl font-extrabold text-[#0077CC]">Luis Guirit</Text>
        <Text className="text-sm text-gray-600 mt-1">luis@example.com</Text>
        <Text className="text-xs text-gray-500 mt-1">Member since March 2024</Text>
      </View>

      {/* Info Card */}
      <View className="bg-white rounded-xl p-5 shadow space-y-4 mb-6">
        <View>
          <Text className="text-gray-700 font-semibold">Phone Number</Text>
          <Text className="text-gray-500">+63 912 345 6789</Text>
        </View>

        <View>
          <Text className="text-gray-700 font-semibold">Location</Text>
          <Text className="text-gray-500">Taytay, Rizal, Philippines</Text>
        </View>

        <View>
          <Text className="text-gray-700 font-semibold">Account Status</Text>
          <Text className="text-green-600 font-semibold">Active</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 rounded-full py-3 items-center"
      >
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
