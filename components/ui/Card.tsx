import { View, StyleSheet, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
    children: React.ReactNode;
}

export function Card({ children, style, ...props }: CardProps) {
    return (
        <View style={[styles.card, style]} {...props}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#E0E5EC',
        borderRadius: 16,
        padding: 16,
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
});