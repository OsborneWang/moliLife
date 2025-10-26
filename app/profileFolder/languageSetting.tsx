import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { Divider } from '@/components/Divider';
import { Text, View } from '@/components/Themed';

interface LanguageItemProps {
  englishName: string;
  localName: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const LanguageItem = ({ englishName, localName, isSelected = false, onPress }: LanguageItemProps) => (
  <Pressable style={styles.languageItem} onPress={onPress}>
    <View style={styles.languageContent}>
      <Text style={[styles.englishName, isSelected && styles.selectedText]}>{englishName}</Text>
      <Text style={[styles.localName, isSelected && styles.selectedSubText]}>{localName}</Text>
    </View>
    <FontAwesome name="chevron-right" size={16} color="#ccc" />
  </Pressable>
);

export default function LanguageSettingScreen() {
  const [selectedLanguage, setSelectedLanguage] = React.useState('zh-CN');
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'zh-CN', englishName: '简体中文', localName: t('languages.zh-CN') },
    { code: 'en', englishName: 'English', localName: t('languages.en') },
  ];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode); // 切换语言
    console.log('language:', languageCode);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('settings.languageSettings'),
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
        {/* 语言列表 */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.menuContainer}>
            {languages.map((language, index) => (
              <React.Fragment key={language.code}>
                <LanguageItem
                  englishName={language.englishName}
                  localName={language.localName}
                  isSelected={selectedLanguage === language.code}
                  onPress={() => handleLanguageChange(language.code)}
                />
                {index < languages.length - 1 && <Divider />}
              </React.Fragment>
            ))}
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
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    marginVertical: 2,
  },
  languageContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  englishName: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    marginBottom: 2,
  },
  localName: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  selectedText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  selectedSubText: {
    color: '#007AFF',
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