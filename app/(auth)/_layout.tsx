import { Tabs, Redirect } from 'expo-router';
        import { Feather } from '@expo/vector-icons';
        import { colors } from '@/constants/colors';
        import { Header } from '@/components/layout/Header';
        import { useAuth } from '@/context/auth.context';
        import { StyleSheet, View } from 'react-native';

        export default function AuthLayout() {
            const { user, isLoading } = useAuth();

            if (isLoading) return null;
            if (user) return <Redirect href="/(app)/dashboard" />;

            return (
                <Tabs
                    screenOptions={{
                        header: ({ route }) => (
                            <Header title={route.name === 'index' ? 'Connexion' : 'Inscription'} />
                        ),
                        tabBarActiveTintColor: colors.primary.main,
                        tabBarInactiveTintColor: colors.text.secondary,
                        tabBarStyle: styles.tabBar,
                        tabBarItemStyle: styles.tabItem,
                        tabBarLabelStyle: styles.tabLabel
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Connexion',
                            tabBarIcon: ({ color, focused }) => (
                                <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                                    <Feather name="log-in" size={24} color={color} />
                                </View>
                            )
                        }}
                    />
                    <Tabs.Screen
                        name="register"
                        options={{
                            title: 'Inscription',
                            tabBarIcon: ({ color, focused }) => (
                                <View style={[styles.iconContainer, focused && styles.activeIcon]}>
                                    <Feather name="user-plus" size={24} color={color} />
                                </View>
                            )
                        }}
                    />
                </Tabs>
            );
        }

        const styles = StyleSheet.create({
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
                textShadowColor: 'rgba(255, 255, 255, 0.5)',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 1,
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