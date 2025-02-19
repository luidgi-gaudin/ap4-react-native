import { View, StyleSheet, ViewProps } from 'react-native';
import { colors } from '@/constants/colors';

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
        backgroundColor: colors.background.main,
        borderRadius: 8,
        padding: 16,
        elevation: 2,
        shadowColor: colors.text.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    }
});