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
import {
  Home,
  LogIn,
  MessageCircle,
  Search,
  UsersRound,
} from "lucide-react-native";
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
      name: "login",
      icon: LogIn,
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <ThemedView
        style={{
          paddingTop: 4,
        }}
        className="flex flex-col top-0 left-0 fixed z-50 w-full justify-evenly items-center "
      >
        <ThemedView className="flex items-center justify-between flex-row w-full bg-red-300 h-10 gap-2 px-5">
          <ThemedText
            style={{
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            CampusPlay
          </ThemedText>
          <MessageCircle
            fill={Colors[colorScheme ?? "light"].text}
            className="flex-shrink-0"
          />
        </ThemedView>
        <ThemedView
          className="flex flex-row mt-2 border-b w-full  justify-evenly items-center "
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
