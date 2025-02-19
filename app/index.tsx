import { Redirect } from 'expo-router';
import {ActivityIndicator, View} from 'react-native';
import { colors } from '@/constants/colors';

export default function Index() {
    const isAuthenticated = false;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary.main} />
            {isAuthenticated ? (
                <Redirect href="/(app)/dashboard" />
            ) : (
                <Redirect href="/(auth)/login" />
            )}
        </View>
    );
}