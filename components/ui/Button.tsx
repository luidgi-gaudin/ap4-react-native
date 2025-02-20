import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

interface ButtonProps {
  onPress: () => void,
  title: string,
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning',
  disabled?: boolean
}

export function Button({ onPress, title, variant = 'primary', disabled }: ButtonProps) {
  return (
      <TouchableOpacity
          style={[
            styles.button,
            styles[variant],
            disabled && styles.disabled
          ]}
          onPress={onPress}
          disabled={disabled}
      >
        <Text style={[
          styles.text,
          styles[`${variant}Text`],
          disabled && styles.disabledText
        ]}>
          {title}
        </Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E5EC',
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
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: '#E0E5EC',
  },
  secondary: {
    backgroundColor: '#E0E5EC',
  },
  danger: {
    backgroundColor: '#E0E5EC',
  },
  success: {
    backgroundColor: '#E0E5EC',
  },
  warning: {
    backgroundColor: '#E0E5EC',
  },
  disabled: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  primaryText: {
    color: colors.primary.main,
  },
  secondaryText: {
    color: colors.text.secondary,
  },
  dangerText: {
    color: colors.error.main,
  },
  successText: {
    color: colors.success.main,
  },
  warningText: {
    color: colors.warning.main,
  },
  disabledText: {
    color: colors.text.disabled,
  }
});