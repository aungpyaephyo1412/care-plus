import "@/global.css";
import {SplashScreen, Stack, useRouter, useSegments} from "expo-router";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import {isLoaded, useFonts} from "expo-font";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {useEffect} from "react";
import {ActivityIndicator, Text, View} from "react-native";
import Colors from "@/constants/color";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

const InitialLayout = () => {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });
    const router = useRouter();
    const segments = useSegments();

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    // useEffect(() => {
    //     if (!isLoaded) return;

    // const inAuthGroup = segments[0] === '(authenticated)';

    //     if (isSignedIn && !inAuthGroup) {
    //         router.replace('/(authenticated)/(tabs)/home');
    //     } else if (!isSignedIn) {
    //         router.replace('/');
    //     }
    // }, [isSignedIn]);

    if (!loaded || !isLoaded) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={'#3D38ED'}/>
            </View>
        );
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen
                name="signup"
                options={{
                    title: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: Colors.background},
                    headerLeft: () => (
                        <View className='flex-1'>
                            <View className="flex-1 flex-row gap-x-2">
                                <Ionicons name="person-sharp" size={24} color="black"/>
                                <Text className='text-3xl font-semibold text-black'>Register</Text>
                            </View>
                            <Text className='text-lg font-medium'>Welcome </Text>
                        </View>
                    ),
                }}
            />

            <Stack.Screen
                name="signin"
                options={{
                    title: '',
                    headerBackTitle: '',
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: Colors.background},
                    headerLeft: () => (
                        <View className='flex-1'>
                            <View className="flex-1 flex-row gap-x-2">
                                <Ionicons name="person-sharp" size={24} color="black"/>
                                <Text className='text-3xl font-semibold text-black'>Login</Text>
                            </View>
                            <Text className='text-lg font-medium'>Welcome back</Text>
                        </View>
                    ),
                }}
            />

            <Stack.Screen name="forgot-password" options={{title: 'Forgot Password', presentation: 'modal'}}/>

            {/*<Stack.Screen*/}
            {/*    name="verify/[phone]"*/}
            {/*    options={{*/}
            {/*        title: '',*/}
            {/*        headerBackTitle: '',*/}
            {/*        headerShadowVisible: false,*/}
            {/*        headerStyle: { backgroundColor: Colors.background },*/}
            {/*        headerLeft: () => (*/}
            {/*            <TouchableOpacity onPress={router.back}>*/}
            {/*                <Ionicons name="arrow-back" size={34} color={Colors.dark} />*/}
            {/*            </TouchableOpacity>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />*/}
            {/*<Stack.Screen*/}
            {/*    name="(authenticated)/crypto/[id]"*/}
            {/*    options={{*/}
            {/*        title: '',*/}
            {/*        headerLeft: () => (*/}
            {/*            <TouchableOpacity onPress={router.back}>*/}
            {/*                <Ionicons name="arrow-back" size={34} color={Colors.dark} />*/}
            {/*            </TouchableOpacity>*/}
            {/*        ),*/}
            {/*        headerLargeTitle: true,*/}
            {/*        headerTransparent: true,*/}
            {/*        headerRight: () => (*/}
            {/*            <View style={{ flexDirection: 'row', gap: 10 }}>*/}
            {/*                <TouchableOpacity>*/}
            {/*                    <Ionicons name="notifications-outline" color={Colors.dark} size={30} />*/}
            {/*                </TouchableOpacity>*/}
            {/*                <TouchableOpacity>*/}
            {/*                    <Ionicons name="star-outline" color={Colors.dark} size={30} />*/}
            {/*                </TouchableOpacity>*/}
            {/*            </View>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<Stack.Screen*/}
            {/*    name="(authenticated)/(modals)/lock"*/}
            {/*    options={{ headerShown: false, animation: 'none' }}*/}
            {/*/>*/}
            {/*<Stack.Screen*/}
            {/*    name="(authenticated)/(modals)/account"*/}
            {/*    options={{*/}
            {/*        presentation: 'transparentModal',*/}
            {/*        animation: 'fade',*/}
            {/*        title: '',*/}
            {/*        headerTransparent: true,*/}
            {/*        headerLeft: () => (*/}
            {/*            <TouchableOpacity onPress={router.back}>*/}
            {/*                <Ionicons name="close-outline" size={34} color={'#fff'} />*/}
            {/*            </TouchableOpacity>*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
        </Stack>
    );
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const RootLayoutNav = () => {
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar style="light"/>
            <InitialLayout/>
        </GestureHandlerRootView>
    );
};

export default RootLayoutNav;
