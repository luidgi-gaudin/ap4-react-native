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
                  style={[styles.tab, isActive && styles.activeTab]}
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
    height: 60,
    backgroundColor: '#E0E5EC',
    shadowColor: '#A3B1C6',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  activeTab: {
    backgroundColor: '#D1D9E6',
    margin: 4,
    borderRadius: 12,
    shadowColor: '#A3B1C6',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500'
  }
});