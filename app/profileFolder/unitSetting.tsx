import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

interface UnitOptionProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const UnitOption = ({ label, isSelected, onPress }: UnitOptionProps) => (
  <Pressable style={styles.unitOption} onPress={onPress}>
    <Text style={styles.unitLabel}>{label}</Text>
    <View style={styles.radioContainer}>
      <View style={[styles.radioOuter, isSelected && styles.radioSelected]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </View>
  </Pressable>
);

interface UnitSectionProps {
  title: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const UnitSection = ({ title, options, selectedValue, onValueChange }: UnitSectionProps) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.optionsContainer}>
      {options.map((option, index) => (
        <View key={option.value}>
          <UnitOption
            label={option.label}
            isSelected={selectedValue === option.value}
            onPress={() => onValueChange(option.value)}
          />
          {index < options.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  </View>
);

export default function UnitSettingScreen() {
  const { t } = useTranslation();
  const [distanceUnit, setDistanceUnit] = React.useState('km');
  const [temperatureUnit, setTemperatureUnit] = React.useState('celsius');

  const distanceOptions = [
    { label: t('units.kilometer'), value: 'km' },
    { label: t('units.mile'), value: 'mile' },
  ];

  const temperatureOptions = [
    { label: '℃', value: 'celsius' },
    { label: '℉', value: 'fahrenheit' },
  ];

  const handleSave = () => {
    // 保存单位设置
    console.log('保存单位设置:', { distanceUnit, temperatureUnit });
    // 这里可以将设置保存到本地存储或发送到服务器
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: t('settings.unitSettings'),
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
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <UnitSection
            title={t('units.distanceSelection')}
            options={distanceOptions}
            selectedValue={distanceUnit}
            onValueChange={setDistanceUnit}
          />
          
          <UnitSection
            title={t('units.temperature')}
            options={temperatureOptions}
            selectedValue={temperatureUnit}
            onValueChange={setTemperatureUnit}
          />
        </ScrollView>

        {/* 底部保存按钮 */}
        <View style={styles.bottomContainer}>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{t('common.save')}</Text>
          </Pressable>
          <Text style={styles.saveHint}>{t('units.saveHint')}</Text>
        </View>
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
  headerButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
  unitOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
  },
  unitLabel: {
    fontSize: 16,
    color: '#333333',
  },
  radioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#4CAF50',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: '#F8F9FA',
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveHint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999999',
  },
});