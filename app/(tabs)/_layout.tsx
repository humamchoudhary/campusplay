import React from "react";
import { Platform, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "@/components/ThemedView";
import { Slot, usePathname, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

import Constants from "expo-constants";
import { Home, UsersRound } from "lucide-react-native";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);
  const btns = [
    {
      name: "/",
      icon: Home,
    },

    {
      name: "/explore",
      icon: UsersRound,
    },

    {
      name: "index",
      icon: Home,
    },
    {
      name: "index",
      icon: Home,
    },
    {
      name: "index",
      icon: Home,
    },
  ];
  return (
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //     tabBarBackground: TabBarBackground,
    //     tabBarStyle: Platform.select({
    //       ios: {
    //         // Use a transparent background on iOS to show the blur effect
    //         position: 'absolute',
    //       },
    //       default: {},
    //     }),
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: 'Explore',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
    //     }}
    //   />
    // </Tabs>
    <SafeAreaView
      style={{
        flex: 1,
        // paddingVertical: Platform.select({ ios: 0, android: 10 }),
        position: "relative",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <ThemedView
        style={{
          // paddingTop: Constants.statusBarHeight,
          paddingTop: 4,
        }}
        className="flex flex-col top-0 left-0 fixed z-50 w-full justify-evenly items-center "
      >
        {/* <ThemedView className="flex flex-row w-full bg-red-300 h-10 gap-2">
          <TextInput value="12" />
        </ThemedView> */}
        <ThemedView
          className="flex flex-row  border-b w-full  justify-evenly items-center "
          style={{
            borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
          }}
        >
          {btns.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  // console.log(item);
                  router.push(item.name);
                }}
                key={index}
                className="flex w-min flex-col gap-2 justify-center items-center pt-2 duration-150"
              >
                <item.icon
                  size={24}
                  color={
                    pathname === item.name
                      ? Colors[colorScheme ?? "light"].tabIconSelected
                      : Colors[colorScheme ?? "light"].tabIconDefault
                  }
                />
                <ThemedView
                  className="h-0.5 w-[50px] rounded-t"
                  style={{
                    backgroundColor:
                      pathname === item.name
                        ? Colors[colorScheme ?? "light"].tabIconSelected
                        : "transparent",
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ThemedView>
      </ThemedView>
      <Slot />
    </SafeAreaView>
  );
}
