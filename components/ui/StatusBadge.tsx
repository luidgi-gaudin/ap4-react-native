import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

type Status = 'pending' | 'in_progress' | 'resolved';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig = {
  pending: {
    label: 'En attente',
    color: colors.warning.main
  },
  in_progress: {
    label: 'En cours',
    color: colors.info.main
  },
  resolved: {
    label: 'Résolu',
    color: colors.success.main
  }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.color }]}>
      <Text style={styles.text}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  text: {
    color: colors.background.light,
    fontSize: 12,
    fontWeight: '500'
  }
});