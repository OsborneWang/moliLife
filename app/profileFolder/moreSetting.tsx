import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { Divider } from '@/components/Divider';
import { Text, View } from '@/components/Themed';

interface MenuItemProps {
  title: string;
  showArrow?: boolean;
  rightText?: string;
  onPress?: () => void;
}

const MenuItem = ({ title, showArrow = true, rightText, onPress }: MenuItemProps) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuText}>{title}</Text>
    <View style={styles.menuRight}>
      {rightText && <Text style={styles.rightText}>{rightText}</Text>}
      {showArrow && <FontAwesome name="chevron-right" size={16} color="#ccc" />}
    </View>
  </Pressable>
);

export default function MoreSettingScreen() {
  const handleLanguageSetting = () => {
    // 处理语言设置点击
    router.push('/profileFolder/languageSetting');
  };

  const handleDataSync = () => {
    // 处理数据同步点击
    console.log('数据同步');
  };

  const handleDataExport = () => {
    // 处理数据导出点击
    console.log('数据导出');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '更多设置',
          headerBackTitle: '',
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <FontAwesome name="chevron-left" size={20} color="#333333" />
            </Pressable>
          ),
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#F8F9FA',
          },
          headerTintColor: '#333333',
        }}
      />
      <View style={styles.container}>
        {/* 菜单列表 */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.menuContainer}>
            <MenuItem 
              title="语言设置" 
              onPress={handleLanguageSetting}
            />
            <Divider />
            <MenuItem 
              title="数据同步" 
              rightText="关"
              onPress={handleDataSync}
            />
            <Divider />
            <MenuItem 
              title="数据导出" 
              onPress={handleDataExport}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  backButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    marginVertical: 2,
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '400',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  rightText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
});