import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { isLoggedIn } from "./utils/authStorage";

export default function Index() {
    const [authChecked, setAuthChecked] = useState(false);
    const [loggedIn, setLoggedInState] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const logged = await isLoggedIn();
            setLoggedInState(logged);
            setAuthChecked(true);
        };
        checkLogin();
    }, []);

    if (!authChecked) return null; // Wait for AsyncStorage to load

    return <Redirect href={loggedIn ? "/(tabs)" : "/(auth)/login"} />;
}
