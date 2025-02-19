import {Text, StyleSheet, View} from 'react-native';
import {useRouter} from "expo-router";
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { logOut } from '@/services/auth.service';
import {useAuth} from "@/context/auth.context";

export default function Profile() {
  const router = useRouter();

  const user = useAuth().user;

  function handleLogout() {
    try {
      logOut();
      router.push('/(auth)/login');
    }catch {
        console.log('Erreur lors de la déconnexion');
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Nom de l'utilisateur</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Département</Text>
        <Text style={styles.value}>IT Support</Text>
        <Text style={styles.label}>Rôle</Text>
        <Text style={styles.value}>Support</Text>
      </View>
      <Button
        title="Se déconnecter"
        variant="danger"
        onPress={() => {handleLogout()}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background.light
  },
  header: {
    alignItems: 'center',
    marginBottom: 32
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary
  },
  email: {
    color: colors.text.secondary
  },
  content: {
    flex: 1
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