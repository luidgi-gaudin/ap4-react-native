import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { useState } from 'react';
import { signIn } from '@/services/auth.service';
import { Feather } from '@expo/vector-icons';

export default function Index() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="Votre email"
                                placeholderTextColor={colors.text.disabled}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Votre mot de passe"
                                placeholderTextColor={colors.text.disabled}
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Feather
                                    name={showPassword ? "eye" : "eye-off"}
                                    size={20}
                                    color={colors.text.secondary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0E5EC',
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
        marginBottom: 24
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.text.secondary,
        marginBottom: 8,
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E5EC',
        borderRadius: 12,
        shadowColor: '#A3B1C6',
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    input: {
        height: 50,
        paddingHorizontal: 16,
        color: colors.text.primary,
        flex: 1,
    },
    eyeButton: {
        padding: 12,
    },
    button: {
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E5EC',
        marginTop: 32,
        shadowColor: '#A3B1C6',
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    buttonText: {
        color: colors.primary.main,
        fontWeight: '600',
        fontSize: 16,
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    }
});