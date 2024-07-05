import {Link} from 'expo-router';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from "@/constants/color";

const Page = () => {
    // const [assets] = useAssets([require('@/assets/images/germany.png')]);

    return (
        <View style={styles.container}>
            {/*{assets && (*/}
            {/*    <Image*/}
            {/*        source={{ uri: assets[0].uri }}*/}
            {/*        style={styles.video}*/}
            {/*    />*/}
            {/*)}*/}
            <View style={{marginTop: 80, padding: 20}}>
                <Text className="text-5xl font-semibold">Ready to appointment?</Text>
            </View>

            <View style={styles.buttons}>
                <Link
                    href={'/signin'}
                    style={[defaultStyles.pillButton, {flex: 1, backgroundColor: Colors.dark}]}
                    asChild>
                    <TouchableOpacity>
                        <Text style={{color: 'white', fontSize: 22, fontWeight: '500'}}>Log in</Text>
                    </TouchableOpacity>
                </Link>
                <Link
                    href={'/signup'}
                    style={[defaultStyles.pillButton, {flex: 1, backgroundColor: '#fff'}]}
                    asChild>
                    <TouchableOpacity>
                        <Text style={{fontSize: 22, fontWeight: '500'}}>Sign up</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    video: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    header: {
        fontSize: 36,
        fontWeight: '900',
        textTransform: 'uppercase',
        color: 'white',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 60,
        paddingHorizontal: 20,
    },
});

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    header: {
        fontSize: 40,
        fontWeight: '700',
    },
    pillButton: {
        padding: 10,
        height: 60,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLink: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: '500',
    },
    descriptionText: {
        fontSize: 18,
        marginTop: 20,
        color: Colors.gray,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    pillButtonSmall: {
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextSmall: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 10,
    },
    block: {
        marginHorizontal: 20,
        padding: 14,
        backgroundColor: '#fff',
        borderRadius: 16,
        gap: 20,
    },
});
export default Page;
