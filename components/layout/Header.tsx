// components/layout/Header.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
}

export function Header({ title, showBackButton }: HeaderProps) {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {showBackButton && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Feather name="chevron-left" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
                {showBackButton && <View style={styles.placeholder} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: colors.background.light,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingTop: 30
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeholder: {
        width: 40
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text.primary,
        textAlign: 'center',
        flex: 1
    }
});