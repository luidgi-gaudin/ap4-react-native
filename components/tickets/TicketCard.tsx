import { View, Text, StyleSheet, Pressable } from 'react-native';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Card } from '../ui/Card';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';

interface TicketCardProps {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'resolved';
  priority: 'low' | 'normal' | 'high';
}

export function TicketCard({ id, title, status, priority }: TicketCardProps) {
  return (
    <Pressable onPress={() => router.push(`/tickets/${id}`)}>
      <Card style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.footer}>
          <StatusBadge status={status} />
          <Text style={styles.priority}>{priority}</Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priority: {
    color: colors.text.secondary,
    fontSize: 12
  }
});