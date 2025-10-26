import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function DevicesScreen() {
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('devices.title')}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.subtitle}>{t('devices.subtitle')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});