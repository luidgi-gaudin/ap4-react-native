import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import {useState} from "react";

type Priority = 'low' | 'normal' | 'high';

export default function CreateTicket() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('normal');

    const handleSubmit = () => {
        router.push('/(app)/tickets/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Titre</Text>
                    <Input
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Titre du ticket"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description</Text>
                    <Input
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Description du problème"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Priorité</Text>
                    <View style={styles.priorityContainer}>
                        <Button
                            key={0}
                            title={"Bas"}
                            variant={priority === 'low' ? 'primary' : 'secondary'}
                            onPress={() => setPriority('low')}
                        />
                        <Button
                            key={1}
                            title={"Normale"}
                            variant={priority === 'normal' ? 'success' : 'secondary'}
                            onPress={() => setPriority('normal')}
                        />
                        <Button
                            key={2}
                            title={"Haute"}
                            variant={priority === 'high' ? 'danger' : 'secondary'}
                            onPress={() => setPriority('high')}
                        />
                    </View>
                </View>

                <View style={styles.actions}>
                    <Button
                        title="Annuler"
                        variant="danger"
                        onPress={() => router.back()}
                    />
                    <Button
                        title="Créer"
                        onPress={handleSubmit}
                    />
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
    form: {
        flex: 1,
        maxWidth: 600,
        width: '100%',
        alignSelf: 'center'
    },
    inputContainer: {
        marginBottom: 24
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.text.primary,
        marginBottom: 8
    },
    priorityContainer: {
        flexDirection: 'row',
        gap: 8
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
        marginTop: 32
    }
});