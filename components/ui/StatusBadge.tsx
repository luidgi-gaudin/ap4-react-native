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
  text: {
    color: colors.background.light,
    fontSize: 12,
    fontWeight: '600',
  }
});