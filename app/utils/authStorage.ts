import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "user_logged_in";

export const setLoggedIn = async (value: boolean) => {
    try {
        await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving login state:", error);
    }
};

export const isLoggedIn = async () => {
    try {
        const value = await AsyncStorage.getItem(AUTH_KEY);
        return value ? JSON.parse(value) : false;
    } catch (error) {
        console.error("Error reading login state:", error);
        return false;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem(AUTH_KEY);
    } catch (error) {
        console.error("Error clearing login state:", error);
    }
};