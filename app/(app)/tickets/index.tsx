import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useRouter } from "expo-router";
import { Feather } from '@expo/vector-icons';

export default function TicketsList() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <FlatList
                data={[]}
                renderItem={() => null}
                ListEmptyComponent={() => (
                    <View style={styles.empty}>
                        <Text>Aucun ticket</Text>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/(app)/tickets/create')}
            >
                <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.light
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary.main,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
});