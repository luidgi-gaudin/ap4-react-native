import {Text, StyleSheet, View} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';

export default function TicketDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket #{id}</Text>
      <View style={styles.infoCard}>
        <Text style={styles.label}>Statut</Text>
        <Text style={styles.value}>En attente</Text>
        <Text style={styles.label}>Priorité</Text>
        <Text style={styles.value}>Normal</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text.primary
  },
  infoCard: {
    backgroundColor: colors.background.main,
    padding: 16,
    borderRadius: 8,
    elevation: 2
  },
  label: {
    color: colors.text.secondary,
    marginBottom: 4
  },
  value: {
    color: colors.text.primary,
    marginBottom: 16
  }
});