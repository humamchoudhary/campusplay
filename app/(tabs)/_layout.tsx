import React, { useCallback } from "react";
import { TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "@/components/ThemedView";
import { Slot, useFocusEffect, usePathname, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

import {
  Home,
  LogIn,
  MessageCircle,
  User,
  UsersRound,
} from "lucide-react-native";
import { useSession } from "@/context/SessionContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useSession();

  useFocusEffect(
    useCallback(() => {
      // Logic to run whenever this page is focused
      console.log("Page is focused");
      console.log("User:", user, "Loading:", isLoading);

      // You can also trigger any side effects or actions here
      // like fetching data, resetting state, etc.

      return () => {
        // Optional cleanup logic when the page loses focus
        console.log("Page is no longer focused");
      };
    }, [user, isLoading]), // Dependencies to re-run the effect
  );
  const btns = [
    {
      name: "/",
      icon: Home,
    },

    {
      name: user ? "/account" : "/login",
      icon: user ? User : LogIn,
    },
  ];

  if (isLoading) {
    return (
      <ThemedView className="flex flex-col justify-center items-center w-full h-full">
        <ActivityIndicator size={"large"} />
      </ThemedView>
    );
  }

  const paths = [
    { name: "Matches", path: "/matches", color: "red", bg: "#FF000080" },
    { name: "History", path: "/history", color: "pink", bg: "#D0637CB3" },
    {
      name: "Top Performers",
      path: "/topperformers",
      color: "pink",
      bg: "#D0637CB3",
    },
    { name: "Rules", path: "/rules", color: "pink", bg: "#D0637CB3" },
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
                  router.push(`${item.name}`);
                }}
                key={index}
                className="flex w-1/2 flex-col gap-2 justify-center items-center pt-2 duration-150"
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
                  className="h-0.5 w-3/4 rounded-t"
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
        <ScrollView
          horizontal={true}
          className="flex flex-row  py-2 px-4 w-full h-fit border-b "
          style={{
            borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
          }}
          contentContainerStyle={{ gap: 8 }}
        >
          {paths.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  router.push(item.path);
                }}
                className="px-4 py-2 rounded-full h-fit"
                style={{ backgroundColor: item.bg }}
              >
                <ThemedText>{item.name}</ThemedText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ThemedView>

      <Slot />
    </SafeAreaView>
  );
}
