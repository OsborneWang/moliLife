import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#9CEBBB", // 绿色 - 选中状态
        tabBarInactiveTintColor: "#FFFFFF", // 白色 - 未选中状态
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          height: 60,
          borderRadius: 30,
          paddingBottom: 0,
          paddingTop: 0,
          elevation: 0,
          shadowOpacity: 0,
          marginRight: 10,
          marginLeft: 10
        },
        tabBarBackground: () => (
          <View
            style={{
              backgroundColor: "#000000",
              borderRadius: 30,
              height: "100%",
              width: "100%",
            }}
          />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.health'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/health_active.png")
                  : require("@/assets/icons/health.png")
              }
              style={{ width: 28, height: 28 }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="sports"
        options={{
          title: t('tabs.sports'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/sport_active.png")
                  : require("@/assets/icons/sport.png")
              }
              style={{ width: 28, height: 28 }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: t('tabs.devices'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/device_active.png")
                  : require("@/assets/icons/device.png")
              }
              style={{ width: 28, height: 28 }}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/profile_active.png")
                  : require("@/assets/icons/profile.png")
              }
              style={{ width: 28, height: 28 }}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
