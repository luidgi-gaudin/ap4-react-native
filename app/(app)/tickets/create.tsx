import {View, Text, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { useState } from "react";
import { createTicket } from '@/services/ticket.service';
import { useAuth } from '@/context/auth.context';

type Priority = 'low' | 'normal' | 'high';

export default function CreateTicket() {
    const router = useRouter();
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>('normal');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!title || !description) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        try {
            setIsSubmitting(true);
            const newTicket = {
                title,
                description,
                priority,
                status: 'opened',
                createdAt: new Date().toISOString(),
                userId: user?.uid,
                userEmail: user?.email
            };

            const ticketId = await createTicket(newTicket);

            if (ticketId) {
                router.push('/(app)/tickets/');
            } else {
                throw new Error('Erreur lors de la création du ticket');
            }
        } catch (error) {
            Alert.alert(
                'Erreur',
                'Une erreur est survenue lors de la création du ticket'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <View style={styles.form}>
                    <View style={styles.formCard}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Titre</Text>
                            <Input
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Titre du ticket"
                                editable={!isSubmitting}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Description</Text>
                            <Input
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Description du problème"
                                multiline
                                numberOfLines={4}
                                editable={!isSubmitting}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Priorité</Text>
                            <View style={styles.priorityContainer}>
                                <Button
                                    title="Bas"
                                    variant={priority === 'low' ? 'primary' : 'secondary'}
                                    onPress={() => setPriority('low')}
                                    disabled={isSubmitting}
                                />
                                <Button
                                    title="Normale"
                                    variant={priority === 'normal' ? 'success' : 'secondary'}
                                    onPress={() => setPriority('normal')}
                                    disabled={isSubmitting}
                                />
                                <Button
                                    title="Haute"
                                    variant={priority === 'high' ? 'danger' : 'secondary'}
                                    onPress={() => setPriority('high')}
                                    disabled={isSubmitting}
                                />
                            </View>
                        </View>

                        <View style={styles.actions}>
                            <Button
                                title="Annuler"
                                variant="danger"
                                onPress={() => router.back()}
                                disabled={isSubmitting}
                            />
                            <Button
                                title={isSubmitting ? 'Création...' : 'Créer'}
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#E0E5EC'
    },
    form: {
        flex: 1,
        maxWidth: 600,
        width: '100%',
        alignSelf: 'center'
    },
    formCard: {
        backgroundColor: '#E0E5EC',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#A3B1C6',
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 12,
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
    },
    priorityContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-between',
        backgroundColor: '#E0E5EC',
        padding: 16,
        borderRadius: 16,
        shadowColor: '#A3B1C6',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 3,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 32,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)'
    }
});