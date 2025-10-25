import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text, View } from "@/components/Themed";

// 分割线组件
const Divider = () => (
  <View style={styles.divider} />
);

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
          <Text style={styles.username}>测试用户</Text>
        </View>
      </ImageBackground>
      
      {/* 菜单列表 */}
      <View style={styles.menuContainer}>
        <MenuItem title="更多设置" img="more.png" />
        <Divider />
        <MenuItem title="个人信息" img="info.png" />
        <Divider />
        <MenuItem title="单位设置" img="dept.png" />
        <Divider />
        <MenuItem title="用户帮助" img="help.png" />
        <Divider />
        <MenuItem title="账户与安全" img="account.png" />
        <Divider />

        {/* 智能控制 - 特殊样式 */}
        <Pressable style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Image
              source={require("@/assets/profile/control.png")}
              style={{ width: 28, height: 28 }}
            />
            <Text style={styles.menuText}>智能控制</Text>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>关</Text>
          </View>
        </Pressable>
        <Divider />

        <MenuItem title="苹果健康" img="appleHealth.png" />
        <Divider />
        <MenuItem title="关于" img="about.png" />
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
  divider: {
    height: 0.5,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 10,
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
