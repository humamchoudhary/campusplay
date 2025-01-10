import {
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  
  import { ThemedText } from "@/components/ThemedText";
  import { ThemedView } from "@/components/ThemedView";
  import { Colors } from "@/constants/Colors";
  import { useColorScheme } from "@/hooks/useColorScheme";
  import { useState } from "react";
  
  // Rules for each game
  const gameRules = {
    Football: "Rules for Football: Play fair and respect the referee.",
    Cricket: "Rules for Cricket: Bat within the crease and bowl legally.",
    Basketball: "Rules for Basketball: Dribble while moving and no fouls.",
    "Table Tennis": "Rules for Table Tennis: Serve diagonally and no double bounce.",
  };
  
  export default function Rules() {
    const colorScheme = useColorScheme();
    const [activeGame, setActiveGame] = useState("Football");
  
    const games = [
      { name: "Football", icon: require("@/assets/images/icons/football.png") },
      { name: "Cricket", icon: require("@/assets/images/icons/cricket-player.png") },
      { name: "Basketball", icon: require("@/assets/images/icons/basketball.png") },
      { name: "Table Tennis", icon: require("@/assets/images/icons/table-tennis.png") },
    ];
  
    return (
      <ThemedView className="flex flex-col items-center p-4">
        <ThemedText type="title" className="mb-6 text-center">
          Select a Game to View Rules
        </ThemedText>
  
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}
        >
          {games.map((game, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveGame(game.name)}
              activeOpacity={0.7}
              className="border rounded-md px-8 py-8 gap-3 flex flex-col items-center justify-center"
              style={{
                borderColor:
                  activeGame === game.name
                    ? Colors[colorScheme ?? "light"].tint
                    : Colors[colorScheme ?? "light"].tabIconDefault + "1A",
              }}
            >
              <Image
                source={game.icon}
                className="w-14 h-14"
                resizeMode="contain"
              />
              <ThemedText className="font-bold">{game.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
  
        {/* Display Rules for Selected Game */}
        <ThemedView
          className="p-8 rounded-md w-full"
          style={{
            backgroundColor: Colors[colorScheme ?? "light"].tint,
          }}
        >
          <ThemedText className="font-bold text-center mb-2">
            Rules for {activeGame}
          </ThemedText>
          <ThemedText className="text-center">
            {gameRules[activeGame]}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }
  
  const styles = StyleSheet.create({
    dropdown: {
      width: "90%",
      borderWidth: 1,
      borderRadius: 6,
      padding: 10,
      marginBottom: 10,
      marginTop: 30,
      justifyContent: "center",
      textAlign: "center",
    },
  });
  