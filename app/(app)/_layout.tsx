import { Tabs, Redirect } from 'expo-router';
        import { Feather } from '@expo/vector-icons';
        import { colors } from '@/constants/colors';
        import { Header } from '@/components/layout/Header';
        import { useAuth } from '@/context/auth.context';
        import { Text, View, StyleSheet } from 'react-native';

        export default function AppLayout() {
            const { user, isLoading } = useAuth();

            if (isLoading) {
                return (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                );
            }

            if (!user) {
                // @ts-ignore
                return <Redirect href="/(auth)" />;
            }

            return (
                <Tabs
                    screenOptions={{
                        header: ({ route }) => <Header title={route.name.split('/')[0]} />,
                        tabBarActiveTintColor: colors.primary.main,
                        tabBarInactiveTintColor: colors.text.secondary,
                        tabBarStyle: styles.tabBar,
                        tabBarItemStyle: styles.tabItem,
                        tabBarLabelStyle: styles.tabLabel,
                    }}
                >
                    <Tabs.Screen
                        name="dashboard"
                        options={{
                            title: 'Tableau de bord',
                            tabBarIcon: ({ color, focused }) => (
                                <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                                    <Feather name="home" size={24} color={color} />
                                </View>
                            )
                        }}
                    />
                    <Tabs.Screen
                        name="tickets"
                        options={{
                            title: 'Tickets',
                            tabBarIcon: ({ color, focused }) => (
                                <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                                    <Feather name="inbox" size={24} color={color} />
                                </View>
                            )
                        }}
                    />
                    <Tabs.Screen
                        name="profile"
                        options={{
                            title: 'Profil',
                            tabBarIcon: ({ color, focused }) => (
                                <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                                    <Feather name="user" size={24} color={color} />
                                </View>
                            )
                        }}
                    />
                </Tabs>
            );
        }

        const styles = StyleSheet.create({
            loadingContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E0E5EC',
            },
            loadingText: {
                fontSize: 18,
                color: colors.text.primary,
                textShadowColor: 'rgba(255, 255, 255, 0.5)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
            },
            tabBar: {
                backgroundColor: '#E0E5EC',
                height: 90,
                borderTopWidth: 1,
                borderTopColor: 'rgba(255, 255, 255, 0.2)',
                shadowColor: '#A3B1C6',
                shadowOffset: {
                    width: 0,
                    height: -4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
            },
            tabItem: {
                paddingVertical: 8,
            },
            tabLabel: {
                fontSize: 12,
                fontWeight: '500',
                marginTop: 4,
            },
            iconContainer: {
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
            },
            activeIcon: {
                backgroundColor: '#D1D9E6',
                shadowColor: '#A3B1C6',
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3,
            }
        });