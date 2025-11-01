import { Image, TextInput, View } from "react-native";


interface Props {
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
    return (
        <View className="flex-row items-center bg-white rounded-full px-5 py-4">
            <Image
                source={require("@/assets/icons/search.png")}
                className="w-5 h-5"
                resizeMode="contain"
                tintColor="#0077CC"
            />
            <TextInput
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-2 text-black"
                placeholderTextColor="#A8B5DB"
            />
        </View>
    );
};

export default SearchBar;