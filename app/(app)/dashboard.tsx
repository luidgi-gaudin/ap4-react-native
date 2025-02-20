import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import {useCallback, useState} from 'react';
import { getAllTickets } from '@/services/ticket.service';
import { Ticket } from '@/app/(app)/tickets/[id]';
import {useFocusEffect, useRouter} from "expo-router";

export default function Dashboard() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
      useCallback(() => {
        loadTickets();
      }, [])
  );

  const getPriorityText = (priority: Ticket['priority']) => ({
    low: 'Basse',
    normal: 'Normale',
    high: 'Haute'
  }[priority]);

  const getPriorityBadgeStyle = (priority: Ticket['priority']) => ({
    backgroundColor: {
      low: colors.secondary.main,
      normal: colors.primary.main,
      high: colors.error.main
    }[priority]
  });

  const loadTickets = async () => {
    try {
      const allTickets = await getAllTickets();
      setTickets(allTickets);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const inProgressCount = tickets.filter(t => t.status === 'in_progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
  const openedCount = tickets.filter(t => t.status === 'opened').length;

  const latestOpenedTickets = tickets
      .filter(t => t.status === 'opened')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Tableau de bord</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Tickets en cours</Text>
            <Text style={styles.statNumber}>{inProgressCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Tickets résolus</Text>
            <Text style={styles.statNumber}>{resolvedCount}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Tickets ouverts</Text>
            <Text style={styles.statNumber}>{openedCount}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Derniers tickets ouverts</Text>
        {latestOpenedTickets.map((ticket) => (
            <TouchableOpacity
                key={ticket.id}
                style={styles.ticketItem}
                onPress={() => router.push(`/(app)/tickets/${ticket.id}`)}
            >
              <View style={styles.ticketContent}>
                <View style={styles.ticketTitleContainer}>
                  <Text style={styles.ticketTitle}>{ticket.title}</Text>
                  <View style={[styles.badge, getPriorityBadgeStyle(ticket.priority)]}>
                    <Text style={styles.badgeText}>{getPriorityText(ticket.priority)}</Text>
                  </View>
                </View>
                <Text style={styles.ticketDate}>{formatDate(ticket.createdAt)}</Text>
              </View>
            </TouchableOpacity>
        ))}
      </View>
  );
}

          const styles = StyleSheet.create({
            container: {
              flex: 1,
              padding: 16,
              backgroundColor: '#E0E5EC',
            },
            centerContent: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            title: {
              fontSize: 24,
              fontWeight: 'bold',
              color: colors.text.primary,
              marginBottom: 24,
              textShadowColor: 'rgba(255, 255, 255, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            },
            statsContainer: {
              flexDirection: 'row',
              gap: 16,
              flexWrap: 'wrap',
            },
            statCard: {
              flex: 1,
              minWidth: 150,
              padding: 20,
              backgroundColor: '#E0E5EC',
              borderRadius: 16,
              shadowColor: '#A3B1C6',
              shadowOffset: {
                width: 8,
                height: 8,
              },
              shadowOpacity: 1,
              shadowRadius: 12,
              elevation: 8,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            statLabel: {
              fontSize: 14,
              color: colors.text.secondary,
              textShadowColor: 'rgba(255, 255, 255, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1,
            },
            statNumber: {
              fontSize: 28,
              fontWeight: 'bold',
              color: colors.primary.main,
              marginTop: 12,
              textShadowColor: 'rgba(255, 255, 255, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            },
            sectionTitle: {
              fontSize: 18,
              fontWeight: '600',
              color: colors.text.primary,
              marginTop: 24,
              marginBottom: 16,
              textShadowColor: 'rgba(255, 255, 255, 0.5)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 1,
            },
            ticketItem: {
              backgroundColor: '#E0E5EC',
              padding: 16,
              marginBottom: 12,
              borderRadius: 12,
              shadowColor: '#A3B1C6',
              shadowOffset: {
                width: 6,
                height: 6,
              },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 6,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            ticketContent: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            ticketTitle: {
              fontSize: 14,
              fontWeight: '500',
              color: colors.text.primary,
              flex: 1,
              marginRight: 12,
            },
            ticketDate: {
              fontSize: 12,
              color: colors.text.secondary,
            },
            ticketTitleContainer: {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginRight: 12,
            },
            badge: {
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              alignSelf: 'flex-start',
              shadowColor: '#000',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 3,
            },
            badgeText: {
              color: colors.background.light,
              fontSize: 10,
              fontWeight: '600',
            },
          });