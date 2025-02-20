import {TextInput, StyleSheet, View} from 'react-native';
import { colors } from "@/constants/colors";

interface InputProps {
  value: string,
  onChangeText: (text: string) => void,
  placeholder?: string,
  secureTextEntry?: boolean,
  editable?: boolean,
  multiline?: boolean,
  numberOfLines?: number
}

export function Input({
                        value,
                        onChangeText,
                        placeholder,
                        secureTextEntry,
                        editable = true,
                        multiline = false,
                        numberOfLines = 1
                      }: InputProps) {
  return (
      <View style={[
        styles.inputContainer,
        !editable && styles.disabled,
        multiline && styles.multilineContainer
      ]}>
        <TextInput
            style={[
              styles.input,
              !editable && styles.disabledText,
              multiline && styles.multilineInput
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={colors.text.disabled}
            editable={editable}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical={multiline ? 'top' : 'center'}

        />
      </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#E0E5EC',
    borderRadius: 12,
    shadowColor: '#A3B1C6',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: '#E0E5EC',
  },
  disabled: {
    backgroundColor: '#E8ECF1',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    opacity: 0.7,
  },
  disabledText: {
    color: colors.text.disabled,
  },
  multilineContainer: {
    height: 'auto',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  }
});