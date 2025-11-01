import {Tabs} from "expo-router";
import {Image, Text, View} from "react-native";
import {icons} from "@/constants/icons";

function TabIcon({focused, icon, title}: any) {

    if (focused) {
        return (

            <View className="items-center justify-center mt-1">

                <View className="bg-gray-200 rounded-2xl p-2">
                    <Image
                        source={icon}
                        className="w-8 h-8"
                        tintColor="#0077CC"
                        resizeMode="contain"
                    />
                </View>
                <Text className="text-[8px] mt-1 text-[#0077CC] font-semibold">
                    {title}
                </Text>
            </View>
        );
    }

    return (
        <View className="items-center justify-center mt-1">
            <Image
                source={icon}
                className="w-7 h-7"
                tintColor="#A8B5DB"
                resizeMode="contain"
            />
        </View>
    );

}

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#E6F0FA",
                    borderTopWidth: 0.5,
                    borderTopColor: "#C9D8E6",
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 8,
                    justifyContent: "space-between",
                },
                animation: "shift"
            }
        }
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.home} title="Home"/>
                    ),
                }}
            />

            <Tabs.Screen
                name="mood"
                options={{
                    title: "Mood",
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.mood} title="Mood"/>
                    ),
                }}
            />

            <Tabs.Screen
                name="journal"
                options={{
                    title: "Journal",
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.journal} title="Journal"/>
                    ),
                }}
            />

            <Tabs.Screen
                name="relax"
                options={{
                    title: "Relax",
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.relax} title="Relax"/>
                    ),
                }}
            />

            <Tabs.Screen
                name="clinics"
                options={{
                    title: "Clinics",
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} icon={icons.clinics} title="Clinic"/>
                    ),
                }}
            />
        </Tabs>
    );
}
