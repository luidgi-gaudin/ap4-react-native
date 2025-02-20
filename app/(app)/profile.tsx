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
        // @ts-ignore
        router.navigate('/(auth)');
      }catch {
        console.log('Erreur lors de la déconnexion');
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.name}>Nom de l'utilisateur</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.field}>
              <Text style={styles.label}>Département</Text>
              <Text style={styles.value }>IT Support</Text>
              <Text style={styles.label}>Rôle</Text>
              <Text style={styles.value}>Support</Text>
            </View>
          </View>
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
      backgroundColor: '#E0E5EC',
    },
    card: {
      backgroundColor: '#E0E5EC',
      borderRadius: 20,
      padding: 24,
      marginBottom: 24,
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
    header: {
      alignItems: 'center',
      marginBottom: 32,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text.primary,
      textShadowColor: 'rgba(255, 255, 255, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    email: {
      color: colors.text.secondary,
      textShadowColor: 'rgba(255, 255, 255, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    content: {
      gap: 24,
    },
    field: {
      backgroundColor: '#E0E5EC',
      padding: 16,
      borderRadius: 12,
      shadowColor: '#A3B1C6',
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 6,
      elevation: 4,
    },
    label: {
      color: colors.text.secondary,
      marginBottom: 8,
      fontSize: 14,
      textShadowColor: 'rgba(255, 255, 255, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    value: {
      color: colors.text.primary,
      fontSize: 16,
      fontWeight: '500',
      textShadowColor: 'rgba(255, 255, 255, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
      marginBottom: 10,
    }
  });