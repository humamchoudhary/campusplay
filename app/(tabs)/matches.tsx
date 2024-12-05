import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
function MatchCard({ match }) {
  const colorScheme = useColorScheme();
  return (
    <ThemedView
      className="flex border flex-row w-full px-6 py-4 rounded-md justify-evenly items-center"
      style={{
        backgroundColor: !match.winner && Colors[colorScheme ?? "light"].tint,
        borderColor: !match.winner
          ? Colors[colorScheme ?? "light"].tint
          : Colors[colorScheme ?? "light"].tabIconDefault + "80",
      }}
    >
      <ThemedView
        className="flex flex-col items-center justify-center"
        style={{ flex: 0.45, backgroundColor: "transparent" }}
      >
        <ThemedText
          style={{
            color: match.winner
              ? match.winner === match.deprt1
                ? Colors[colorScheme ?? "light"].tint
                : Colors[colorScheme ?? "dark"].text
              : "white",
          }}
          type="subtitle"
        >
          {match.deprt1}
        </ThemedText>
        <ThemedText
          style={{
            color: match.winner
              ? match.winner === match.deprt1
                ? Colors[colorScheme ?? "light"].tint
                : Colors[colorScheme ?? "dark"].text
              : "white",
            // : Colors[colorScheme ?? "dark"].text,
          }}
        >
          {match.score1}
        </ThemedText>
      </ThemedView>
      <ThemedView
        className="flex flex-col items-center justify-center"
        style={{ flex: 0.45, backgroundColor: "transparent" }}
      >
        <ThemedText
          style={{
            color: match.winner ? Colors[colorScheme ?? "light"].text : "white",
          }}
        >
          Time Left
        </ThemedText>
        <ThemedText
          style={{
            color: match.winner ? Colors[colorScheme ?? "light"].text : "white",
          }}
        >
          {match.timeLeft}
        </ThemedText>
      </ThemedView>

      <ThemedView
        className="flex flex-col items-center justify-center"
        style={{ flex: 0.45, backgroundColor: "transparent" }}
      >
        <ThemedText
          type="subtitle"
          style={{
            color: match.winner ? Colors[colorScheme ?? "light"].tint : "white",
            // : Colors[colorScheme ?? "dark"].text,
          }}
        >
          {match.deprt2}
        </ThemedText>

        <ThemedText
          style={{
            color: match.winner ? Colors[colorScheme ?? "light"].tint : "white",
          }}
        >
          {match.score2}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

export default function MatchScreen() {
  const colorScheme = useColorScheme();
  const [activeGameState, setActiveGameState] = useState(1);
  const matches = [
    {
      deprt1: "CS",
      deprt2: "EE",
      score1: 10,
      score2: 7,
      match: "FootBall",
      timeLeft: "5 mins",
    },

    {
      deprt1: "CS",
      deprt2: "ME",
      score1: "5.6 Overs",
      score2: "100/7",
      match: "Cricket",
      timeLeft: "5 mins",
    },

    {
      deprt1: "CS",
      deprt2: "ME",
      score1: "5.6 Overs",
      score2: "100/7",
      match: "Cricket",
      timeLeft: "5 mins",
    },

    {
      deprt1: "EE",
      deprt2: "CS",
      score1: "10.6 Overs",
      score2: "100/7",
      match: "Cricket",
      timeLeft: "5 mins",
      winner: "CS",
    },
  ];
  const games = [
    { name: "FootBall", icon: require("@/assets/images/icons/football.png") },
    {
      name: "Cricket",
      icon: require("@/assets/images/icons/cricket-player.png"),
    },
    {
      name: "BasketBall",
      icon: require("@/assets/images/icons/basketball.png"),
    },
    {
      name: "Table Tennis",
      icon: require("@/assets/images/icons/table-tennis.png"),
    },
  ];
  return (
    <ThemedView className="flex flex-col items-center">
      <ThemedText type="title" className="mt-8">
        Ongoing Matches
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
        contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
      >
        {games.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setActiveGameState(index);
              }}
              activeOpacity={0.7}
              key={index}
              className="border rounded-md px-8 py-8 gap-3 flex flex-col items-center justify-center"
              style={{
                borderColor:
                  activeGameState === index
                    ? Colors[colorScheme ?? "light"].tint
                    : Colors[colorScheme ?? "light"].tabIconDefault + "1A",
              }}
            >
              <Image
                source={item.icon}
                className="w-14 h-14"
                resizeMode="contain"
              />
              <ThemedText className="font-bold">{item.name}</ThemedText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ThemedView className="px-5 flex flex-col gap-4 mt-6">
        {matches
          .filter((item) => {
            return item.match === games[activeGameState].name;
          })
          .map((item, index) => (
            <MatchCard match={item} key={index} />
          ))}
      </ThemedView>
    </ThemedView>
  );
}
