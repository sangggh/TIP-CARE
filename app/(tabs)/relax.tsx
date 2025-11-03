import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Relax = () => {
    const router = useRouter();
    // user-selectable total seconds (default 3 minutes)
    const [totalSeconds, setTotalSeconds] = useState(180);
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(totalSeconds);
    const [breatheText, setBreatheText] = useState("Press Start");

    // show/hide duration picker modal
    const [showPicker, setShowPicker] = useState(false);

    // progress drives the circular progress ring (0 -> 1 over totalSeconds)
    const progress = useRef(new Animated.Value(0)).current;
    // pulse drives the breathing pulse animation (scale)
    const pulse = useRef(new Animated.Value(0)).current;

    // refs to hold running animations / timer so we can stop them
    const progressAnimRef = useRef<any>(null);
    const pulseAnimRef = useRef<any>(null);
    const timerRef = useRef<any>(null);

    // circle config
    const radius = 90;
    const strokeWidth = 6;
    const diameter = radius * 2;
    const circumference = 2 * Math.PI * radius;

    const DURATION_OPTIONS = [
        { secs: 180, label: "3 minutes" },
        { secs: 360, label: "6 minutes" },
        { secs: 540, label: "9 minutes" },
        { secs: 720, label: "12 minutes" },
    ];

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        // whenever totalSeconds changes ensure timeLeft follows when idle
        if (!isActive) {
            setTimeLeft(totalSeconds);
        }
    }, [totalSeconds]);

    useEffect(() => {
        // Update breathe text based on where we are in the 12s breathing cycle
        if (!isActive) return;
        const elapsed = totalSeconds - timeLeft;
        const cyclePos = elapsed % 12; // 0..11.999...
        if (cyclePos < 4) {
            setBreatheText("Breathe In");
        } else if (cyclePos < 8) {
            setBreatheText("Hold");
        } else {
            setBreatheText("Breathe Out");
        }
    }, [timeLeft, isActive, totalSeconds]);

    const stopAll = () => {
        try {
            progressAnimRef.current?.stop?.();
        } catch {}
        try {
            pulseAnimRef.current?.stop?.();
        } catch {}
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const startPulseAnimation = () => {
        pulse.setValue(0);
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 0.9,
                    duration: 4000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 0,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
        pulseAnimRef.current = loop;
        loop.start();
    };

    const startBreathing = (force = false) => {
        if (isActive && !force) return;
        stopAll();
        setIsActive(true);
        setTimeLeft(totalSeconds);
        setBreatheText("Breathe In");

        // reset and start progress animation (fills/empties over totalSeconds)
        progress.setValue(0);
        const progAnim = Animated.timing(progress, {
            toValue: 1,
            duration: totalSeconds * 1000,
            easing: Easing.linear,
            useNativeDriver: false, // strokeDashoffset cannot use native driver
        });
        progressAnimRef.current = progAnim;
        progAnim.start(({ finished }) => {
            if (finished) {
                setIsActive(false);
                setBreatheText("Complete! Press Start to begin again");
                stopAll();
            }
        });

        // start the pulsing circle animation
        startPulseAnimation();

        // start countdown timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                    stopAll();
                    setIsActive(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // STOP and reset to idle state (do NOT restart)
    const stopAndReset = () => {
        stopAll();
        progress.setValue(0);
        pulse.setValue(0);
        progressAnimRef.current = null;
        pulseAnimRef.current = null;
        setIsActive(false);
        setTimeLeft(totalSeconds);
        setBreatheText("Press Start");
    };

    // user selects a duration from picker
    const onSelectDuration = (secs: number) => {
        // stop any running session and apply new duration
        stopAndReset();
        setTotalSeconds(secs);
        setShowPicker(false);
    };

    const strokeDashoffset = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, circumference], // will animate the ring "drawing" / "erasing"
    });

    // pulse scale interpolation (slight scale around 1)
    const scale = pulse.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.15],
    });

    return (
        <View className="flex-1 bg-white">
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
                                <Text className="text-2xl font-extrabold text-[#0077CC]">Relaxation</Text>
                                <Text className="text-sm text-gray-600 mt-1">Take a moment to breathe and relax</Text>
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

            <View className="flex-1 items-center justify-center">
                {/* More visible, tappable timer indicator with hint */}
                <Pressable
                    onPress={() => setShowPicker(true)}
                    style={{
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="Change duration"
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#EFF8FF',
                            borderColor: '#CDE7FF',
                            borderWidth: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 18,
                            borderRadius: 22,
                            shadowColor: '#000',
                            shadowOpacity: 0.06,
                            shadowRadius: 6,
                            elevation: 2,
                        }}
                    >
                        <Text style={{ fontSize: 18, marginRight: 10 }}>⏱️</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: '#0B66A1' }}>
                            {formatTime(timeLeft)}
                        </Text>
                    </View>
                    <Text style={{ marginTop: 6, fontSize: 12, color: '#6B7280' }}>
                        Tap to change duration
                    </Text>
                </Pressable>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                    {/* Circular progress ring (outline) */}
                    <Svg width={diameter + strokeWidth * 2} height={diameter + strokeWidth * 2}>
                        <Circle
                            cx={(diameter + strokeWidth * 2) / 2}
                            cy={(diameter + strokeWidth * 2) / 2}
                            r={radius}
                            stroke="#E0E7EF"
                            strokeWidth={strokeWidth}
                            fill="none"
                        />
                        <AnimatedCircle
                            cx={(diameter + strokeWidth * 2) / 2}
                            cy={(diameter + strokeWidth * 2) / 2}
                            r={radius}
                            stroke="#0077CC"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            fill="none"
                            strokeDasharray={`${circumference} ${circumference}`}
                            strokeDashoffset={strokeDashoffset}
                            rotation="-90"
                            originX={(diameter + strokeWidth * 2) / 2}
                            originY={(diameter + strokeWidth * 2) / 2}
                        />
                    </Svg>

                    {/* Pulsing outline center (not filled) */}
                    <Animated.View
                        style={{
                            position: 'absolute',
                            width: 160,
                            height: 160,
                            borderRadius: 80,
                            borderWidth: 6,
                            borderColor: '#E6F0FA',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transform: [{ scale }],
                        }}
                    >
                        <Text style={{ color: '#334155', fontSize: 18, fontWeight: '600' }}>
                            {breatheText}
                        </Text>
                    </Animated.View>
                </View>

                <TouchableOpacity
                    onPress={() => { if (isActive) stopAndReset(); else startBreathing(); }}
                    className={`px-8 py-4 rounded-full ${isActive ? 'bg-red-500' : 'bg-[#0077CC]'}`}
                >
                    <Text className="text-white font-bold text-lg">
                        {isActive ? 'Stop' : 'Start'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Duration picker modal */}
            <Modal visible={showPicker} transparent animationType="fade" onRequestClose={() => setShowPicker(false)}>
                <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }} onPress={() => setShowPicker(false)}>
                    <Pressable style={{ width: 280, backgroundColor: 'white', borderRadius: 12, padding: 12 }} onPress={() => {}}>
                        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Choose duration</Text>
                        {DURATION_OPTIONS.map(opt => (
                            <TouchableOpacity key={opt.secs} onPress={() => onSelectDuration(opt.secs)} style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                                <Text style={{ fontSize: 16 }}>{opt.label}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setShowPicker(false)} style={{ marginTop: 10, paddingVertical: 10, alignItems: 'center' }}>
                            <Text style={{ color: '#0077CC', fontWeight: '600' }}>Cancel</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

export default Relax;