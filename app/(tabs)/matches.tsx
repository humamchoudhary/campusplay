import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ScrollView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
function MatchCard({ match }) {
  const colorScheme = useColorScheme();
  return (
    <ThemedView
      className="flex flex-row w-full px-6 py-4 rounded-md justify-evenly items-center"
      style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
    >
      <ThemedView
        className="flex flex-col items-center justify-center"
        style={{ flex: 0.45, backgroundColor: "transparent" }}
      >
        <ThemedText type="subtitle">{match.deprt1}</ThemedText>{" "}
        <ThemedText>{match.score1}</ThemedText>
      </ThemedView>
      <ThemedView
        className="flex flex-col items-center justify-center"
        style={{ flex: 0.45, backgroundColor: "transparent" }}
      >
        <ThemedText type="subtitle">Time Left</ThemedText>{" "}
        <ThemedText>{match.timeLeft}</ThemedText>
      </ThemedView>

      <ThemedView
        className="flex flex-col items-center justify-center"
        style={{ flex: 0.45, backgroundColor: "transparent" }}
      >
        <ThemedText type="subtitle">{match.deprt1}</ThemedText>{" "}
        <ThemedText>{match.score1}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

export default function MatchScreen() {
  const matches = [
    {
      deprt1: "CS",
      deprt2: "EE",
      score1: 10,
      score2: 7,
      match: "FootBall",
      timeLeft: "5 mins",
    },
  ];
  return (
    <ThemedView className="flex flex-col items-center">
      <ThemedText type="title" className="mt-8">
        Ongoing Matches
      </ThemedText>
      <ThemedView className="px-5 flex flex-col gap-4 mt-6">
        {matches.map((item, index) => (
          <MatchCard match={item} key={index} />
        ))}
      </ThemedView>
    </ThemedView>
  );
}
