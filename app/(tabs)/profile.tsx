import { Divider } from "@/components/Divider";
import { Text, View } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MenuItemProps {
  img: string;
  title: string;
  showArrow?: boolean;
  onPress?: () => void;
}

const getImageSource = (img: string) => {
  const imageMap: { [key: string]: any } = {
    "more.png": require("@/assets/profile/more.png"),
    "info.png": require("@/assets/profile/info.png"),
    "dept.png": require("@/assets/profile/dept.png"),
    "help.png": require("@/assets/profile/help.png"),
    "account.png": require("@/assets/profile/account.png"),
    "appleHealth.png": require("@/assets/profile/appleHealth.png"),
    "about.png": require("@/assets/profile/about.png"),
  };
  return imageMap[img];
};

const MenuItem = ({ img, title, showArrow = true, onPress }: MenuItemProps) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <Image source={getImageSource(img)} style={{ width: 28, height: 28 }} />
      <Text style={styles.menuText}>{title}</Text>
    </View>
    {showArrow && <FontAwesome name="chevron-right" size={16} color="#ccc" />}
  </Pressable>
);

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();
  
  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]} 
      showsVerticalScrollIndicator={false}
    >
      {/* 顶部头像栏 */}
      <ImageBackground 
        source={require("@/assets/profile/headerBg.png")} 
        style={styles.headerContainer}
        resizeMode="cover"
      >
        <View style={styles.avatarContainer}>
          <Image 
            source={require("@/assets/profile/avatar-default.png")} 
            style={styles.avatar}
          />
          <Text style={styles.username}>{t('profile.username')}</Text>
        </View>
      </ImageBackground>
      
      {/* 菜单列表 */}
      <View style={styles.menuContainer}>
        <MenuItem title={t('profile.moreSettings')} img="more.png" onPress={()=>router.navigate('/profileFolder/moreSetting')}/>
        <Divider />
        <MenuItem title={t('profile.personalInfo')} img="info.png" />
        <Divider />
        <MenuItem title={t('profile.unitSettings')} img="dept.png" onPress={()=>router.navigate('/profileFolder/unitSetting')} />
        <Divider />
        <MenuItem title={t('profile.userHelp')} img="help.png" />
        <Divider />
        <MenuItem title={t('profile.accountSecurity')} img="account.png" />
        <Divider />

        {/* 智能控制 - 特殊样式 */}
        <Pressable style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Image
              source={require("@/assets/profile/control.png")}
              style={{ width: 28, height: 28 }}
            />
            <Text style={styles.menuText}>{t('profile.smartControl')}</Text>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>{t('profile.off')}</Text>
          </View>
        </Pressable>
        <Divider />

        <MenuItem title={t('profile.appleHealth')} img="appleHealth.png" />
        <Divider />
        <MenuItem title={t('profile.about')} img="about.png" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 1,
    borderRadius: 12,
    marginVertical: 2,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  menuText: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 16,
    fontWeight: "400",
  },
  switchContainer: {
    backgroundColor: "transparent",
  },
  switchText: {
    fontSize: 14,
    color: "#666666",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.7,
    paddingHorizontal: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    backgroundColor: "#E2FBF3",
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
});
