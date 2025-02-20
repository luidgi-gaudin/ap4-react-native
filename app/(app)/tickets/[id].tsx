import {Text, StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { getTicketById, updateTicketStatus } from '@/services/ticket.service';
import { Button } from '@/components/ui/Button';

export interface Ticket {
  id?: string;
  title: string;
  status: 'opened' | 'in_progress' | 'resolved';
  priority: 'low' | 'normal' | 'high';
  userEmail: string | null | undefined;
  userId: string | undefined;
  createdAt: string;
  description?: string;
}

const getNextStatus = (status: Ticket['status']): string => ({
  opened: 'in_progress',
  in_progress: 'resolved',
  resolved: 'opened'
}[status]);

const getButtonConfig = (status: Ticket['status']) => {
  switch (status) {
    case 'opened':
      return {
        title: 'Commencer',
        variant: 'primary' as const
      };
    case 'in_progress':
      return {
        title: 'Terminer',
        variant: 'success' as const
      };
    case 'resolved':
      return {
        title: 'Réouvrir',
        variant: 'danger' as const
      };
  }
};

export default function TicketDetails() {
  const params = useLocalSearchParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      console.log('Fetching ticket with ID:', params.id);
      if (!params.id) {
        console.error('No ID provided');
        setLoading(false);
        return;
      }

      const data = await getTicketById(params.id.toString());
      if (data) {
        setTicket({ ...data as Ticket });
      }
      setLoading(false);
    };
    fetchTicket();
  }, [params.id]);

  const handleStatusUpdate = async () => {
    if (!ticket || !params.id) {
      console.log('No ticket or ticket ID found');
      return;
    }

    const nextStatus = getNextStatus(ticket.status);
    console.log(`Attempting to update ticket ${params.id} from ${ticket.status} to ${nextStatus}`);

    if (nextStatus === 'opened') {
      Alert.alert(
          'Confirmation',
          'Voulez-vous vraiment réouvrir ce ticket ?',
          [
            {
              text: 'Non',
              style: 'cancel',
            },
            {
              text: 'Oui',
              onPress: async () => {
                const success = await updateTicketStatus(params.id.toString(), nextStatus as Ticket['status']);
                console.log(`Update result: ${success}`);
                if (success) {
                  setTicket({ ...ticket, status: nextStatus as Ticket['status'] });
                  console.log('Ticket state updated locally');
                }
              },
            },
          ],
          { cancelable: false }
      );
      return;
    }

    const success = await updateTicketStatus(params.id.toString(), nextStatus as Ticket['status']);
    console.log(`Update result: ${success}`);

    if (success) {
      setTicket({ ...ticket, status: nextStatus as Ticket['status'] });
      console.log('Ticket state updated locally');
    }
  };

  if (loading && !ticket) {
    return (
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary.main} />
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        </View>
    );
  }

  if (!ticket) {
    return (
        <View style={styles.container}>
          <Text>Le ticket n'existe pas</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>{ticket.title}</Text>
        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Statut</Text>
            <View style={[styles.badge, getBadgeStyle(ticket.status)]}>
              <Text style={styles.badgeText}>{getStatusText(ticket.status)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Priorité</Text>
            <View style={[styles.badge, getPriorityBadgeStyle(ticket.priority)]}>
              <Text style={styles.badgeText}>{getPriorityText(ticket.priority)}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.text}>{ticket.description}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Crée par </Text>
            <Text style={styles.text}>{ticket.userEmail}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Button
              title={getButtonConfig(ticket.status).title}
              variant={getButtonConfig(ticket.status).variant}
              onPress={() => {handleStatusUpdate()}}
          />
        </View>
      </View>
  );
}

const getStatusText = (status: Ticket['status']) => ({
  opened: 'Ouvert',
  in_progress: 'En cours',
  resolved: 'Résolu'
}[status]);

const getPriorityText = (priority: Ticket['priority']) => ({
  low: 'Basse',
  normal: 'Normale',
  high: 'Haute'
}[priority]);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0E5EC'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 12,
    color: colors.text.secondary,
    fontSize: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text.primary,
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3
  },
  infoCard: {
    backgroundColor: '#E0E5EC',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    // Neumorphic effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8
  },
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    fontWeight: '600'
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3
  },
  badgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600'
  },
  actions: {
    marginTop: 24,
    alignItems: 'center'
  },
  text: {
    color: colors.text.primary,
    fontSize: 16,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  }
});