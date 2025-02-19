import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {colors} from "@/constants/colors";

export default function Register() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nom complet</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Votre nom"
                        placeholderTextColor={colors.text.disabled}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Votre email"
                        placeholderTextColor={colors.text.disabled}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Département</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Votre département"
                        placeholderTextColor={colors.text.disabled}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Votre mot de passe"
                        placeholderTextColor={colors.text.disabled}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {}}
                >
                    <Text style={styles.buttonText}>S'inscrire</Text>
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
        paddingHorizontal: 16
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