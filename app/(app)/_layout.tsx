import { Tabs, Redirect } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/context/auth.context';
import { Text } from 'react-native';

export default function AppLayout() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Tabs
            screenOptions={{
                header: ({ route }) => <Header title={route.name.split('/')[0]} />,
                tabBarActiveTintColor: colors.primary.main,
                tabBarInactiveTintColor: colors.text.secondary,
                tabBarStyle: {
                    backgroundColor: colors.background.light,
                    borderTopColor: colors.border
                }
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Tableau de bord',
                    tabBarIcon: ({ color }) => (
                        <Feather name="home" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="tickets"
                options={{
                    title: 'Tickets',
                    tabBarIcon: ({ color }) => (
                        <Feather name="inbox" size={24} color={color} />
                    ),
                    href: '/(app)/tickets'
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={24} color={color} />
                    )
                }}
            />
        </Tabs>
    );
}