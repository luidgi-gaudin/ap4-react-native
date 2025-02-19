import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface TabItem {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  href: string;
}

interface TabBarProps {
  tabs: TabItem[];
  currentRoute: string;
  onTabPress: (href: string) => void;
}

export function TabBar({ tabs, currentRoute, onTabPress }: TabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentRoute === tab.href;
        return (
          <TouchableOpacity
            key={tab.href}
            style={styles.tab}
            onPress={() => onTabPress(tab.href)}
          >
            <Feather
              name={tab.icon}
              size={24}
              color={isActive ? colors.primary.main : colors.text.secondary}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? colors.primary.main : colors.text.secondary }
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: colors.background.light,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: 12,
    marginTop: 4
  }
});