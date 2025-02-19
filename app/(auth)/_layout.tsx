import { Tabs, Redirect } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/context/auth.context';

export default function AuthLayout() {
    const { user } = useAuth();

    if (user) {
        return <Redirect href="/(app)/dashboard" />;
    }

    return (
        <Tabs
            screenOptions={{
                header: ({ route }) => (
                    <Header title={route.name === 'login' ? 'Connexion' : 'Inscription'} />
                ),
                tabBarActiveTintColor: colors.primary.main,
                tabBarInactiveTintColor: colors.text.secondary,
                tabBarStyle: {
                    backgroundColor: colors.background.light,
                    borderTopColor: colors.border
                }
            }}
        >
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Connexion',
                    tabBarIcon: ({ color }) => (
                        <Feather name="log-in" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: 'Inscription',
                    tabBarIcon: ({ color }) => (
                        <Feather name="user-plus" size={24} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}