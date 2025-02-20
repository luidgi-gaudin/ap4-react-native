import {FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import { colors } from '@/constants/colors';
import {useFocusEffect, useRouter} from "expo-router";
import { Feather } from '@expo/vector-icons';
import { getAllTickets } from "@/services/ticket.service";
import {useCallback, useState} from 'react';

interface Ticket {
    id: string;
    title: string;
    status: 'in_progress' | 'resolved' | 'opened';
    priority: 'low' | 'normal' | 'high';
    userEmail: string | null | undefined;
    userId: string | undefined;
    createdAt: string;
}

export default function TicketsList() {
    const router = useRouter();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

        const fetchTickets = async () => {
            const data = await getAllTickets();
            console.log('Fetched tickets:', data); // Pour vérifier les données reçues
            setTickets(data as Ticket[]);
            setLoading(false);
        };

    useFocusEffect(
        useCallback(() => {
            fetchTickets();
        }, [])
    );

    const getStatusText = (status: Ticket['status']) => {
        const statusMap = {
            opened: 'Ouvert',
            in_progress: 'En cours',
            resolved: 'Résolu'
        };
        return statusMap[status];
    };

    const getPriorityText = (priority: Ticket['priority']) => {
        const priorityMap = {
            low: 'Basse',
            normal: 'Normale',
            high: 'Haute'
        };
        return priorityMap[priority];
    };

    const getBadgeStyle = (status: Ticket['status']) => ({
        backgroundColor: {
            opened: colors.warning.main,
            in_progress: colors.info.main,
            resolved: colors.success.main
        }[status]
    });

    const getPriorityBadgeStyle = (priority: Ticket['priority']) => ({
        backgroundColor: {
            low: colors.secondary.main,
            normal: colors.primary.main,
            high: colors.error.main
        }[priority]
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderTicket = ({ item }: { item: Ticket }) => {
        console.log('Ticket data:', item);
        const formattedDate = item.createdAt ? formatDate(item.createdAt) : 'Date inconnue';
        console.log('Formatted date:', formattedDate);

        return (
            <TouchableOpacity
                style={styles.ticketItem}
                onPress={() => router.push(`/(app)/tickets/${item.id}`)}
            >
                <View style={styles.ticketHeader}>
                    <Text style={styles.ticketName}>{item.title}</Text>
                    <View style={[styles.badge, getBadgeStyle(item.status)]}>
                        <Text style={styles.badgeText}>{getStatusText(item.status)}</Text>
                    </View>
                </View>
                <View style={styles.ticketFooter}>
                    <Text style={styles.dateText}>
                        {formattedDate}
                    </Text>
                    <View style={[styles.badge, getPriorityBadgeStyle(item.priority)]}>
                        <Text style={styles.badgeText}>{getPriorityText(item.priority)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={styles.empty}>
                <ActivityIndicator size="large" color={colors.primary.main} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={tickets}
                renderItem={renderTicket}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>Aucun ticket</Text>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/(app)/tickets/create')}
            >
                <Feather name="plus" size={24} color={"#66B2FF"} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E5EC',
    },
    listContent: {
        padding: 16,
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16
    },
    emptyText: {
        color: colors.text.secondary,
        fontSize: 16,
        marginTop: 8
    },
    ticketItem: {
        backgroundColor: '#E0E5EC',
        padding: 16,
        marginBottom: 16,
        borderRadius: 16,
        shadowColor: '#A3B1C6',
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    ticketHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    ticketName: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
        color: colors.text.primary
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    badgeText: {
        color: colors.background.light,
        fontSize: 12,
        fontWeight: '600',
    },
    ticketFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8
    },
    dateText: {
        fontSize: 12,
        color: colors.text.secondary,
        fontWeight: '500'
    },
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#E0E5EC',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#A3B1C6',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    }
});