import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '@/constants/colors';
import { useAuth } from '@/context/auth.context';

export default function Index() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.primary.main} />
            </View>
        );
    }

    if (user) {
        return <Redirect href="/(app)/dashboard" />;
    }

    return <Redirect href="/(auth)/login" />;
}