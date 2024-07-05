import {Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {cn} from "@/utils";
import {Link} from "expo-router";
import {useAssets} from "expo-asset";

const Signin = () => {
    const [assets] = useAssets([require('@/assets/images/login.png')]);
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;
    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <ScrollView className="flex-1 px-6 ">
                {assets && <View className="w-full h-80 mb-8">
                    <Image
                        className="block w-full h-full flex-1 object-cover"
                        source={assets[0]}
                    />
                </View>}
                <View className="py-8 w-full flex flex-col gap-y-9">
                    <TextInput
                        className={cn('w-full focus:border-blue-500 border-2 border-transparent p-3 rounded bg-[#D8DCE2]')}
                        placeholder="Email"/>
                    <TextInput secureTextEntry={true}
                               className={cn('w-full focus:border-blue-500 border-2 border-transparent p-3 rounded bg-[#D8DCE2]')}
                               placeholder="Password"/>
                </View>
                <View className="w-full gap-y-5">
                    <View className="flex-row flex w-full justify-between items-center gap-x-2">
                        <Link href={'/signup'} className="font-semibold text-lg text-green-500">Register</Link>
                        <Link href={'/forgot-password'} className="font-semibold text-lg text-blue-500">Forgot
                            Password?</Link>
                    </View>
                    <TouchableOpacity className="w-full py-4 justify-center items-center bg-blue-500 rounded">
                        <Text className='text-white'>SignIn</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Signin;