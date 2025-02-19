import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
    import { colors } from "@/constants/colors";
    import { useRouter } from "expo-router";
    import { useState } from 'react';
    import { signIn } from '@/services/auth.service';

    export default function Login() {
        const router = useRouter();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleLogin = async () => {
            try {
                await signIn(email, password);
                router.push('/(app)/dashboard');
            } catch (error) {
                Alert.alert(
                    'Erreur de connexion',
                    'Email ou mot de passe incorrect'
                );
            }
        };

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Votre email"
                            placeholderTextColor={colors.text.disabled}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Votre mot de passe"
                            placeholderTextColor={colors.text.disabled}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: 16
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            maxWidth: 400,
            width: '100%',
            alignSelf: 'center'
        },
        inputContainer: {
            marginBottom: 16
        },
        label: {
            fontSize: 14,
            fontWeight: '500',
            color: '#666666',
            marginBottom: 8
        },
        input: {
            height: 48,
            borderWidth: 1,
            borderColor: '#E5E5E5',
            borderRadius: 8,
            paddingHorizontal: 16,
            fontSize: 16,
            color: '#000000'
        },
        button: {
            backgroundColor: '#007AFF',
            height: 48,
            borderRadius: 8,
            marginTop: 24,
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonText: {
            color: '#FFFFFF',
            fontWeight: '500',
            fontSize: 16
        }
    });