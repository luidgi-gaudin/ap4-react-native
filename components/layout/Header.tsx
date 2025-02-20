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
        backgroundColor: '#E0E5EC',
        paddingTop: 30,
        shadowColor: '#A3B1C6',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
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
        alignItems: 'center',
        backgroundColor: '#E0E5EC',
        borderRadius: 20,
        shadowColor: '#A3B1C6',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    placeholder: {
        width: 40
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text.primary,
        textAlign: 'center',
        flex: 1,
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
    }
});