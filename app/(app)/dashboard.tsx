import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tableau de bord</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text>Tickets en cours</Text>
          <Text style={styles.statNumber}>0</Text>
        </View>
        <View style={styles.statCard}>
          <Text>Tickets résolus</Text>
          <Text style={styles.statNumber}>0</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background.light
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background.main,
    borderRadius: 8,
    elevation: 2
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary.main,
    marginTop: 8
  }
});