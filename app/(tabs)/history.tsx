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
  import { Dropdown } from "react-native-element-dropdown";
  
  import { useColorScheme } from "@/hooks/useColorScheme";
  import { Colors } from "@/constants/Colors";
  import { useState } from "react";
  
  function History({ match }) {
    const colorScheme = useColorScheme();
    return (
      <ThemedView
        className="flex border flex-row w-full px-6 py-6 rounded-md justify-evenly gap-6 items-center"
        style={{
          backgroundColor: match.winner && Colors[colorScheme ?? "light"].tint,
          borderColor: !match.winner
            ? Colors[colorScheme ?? "light"].tabIconDefault + "80"
            : Colors[colorScheme ?? "light"].tint,
        }}
      >
      <ThemedText className="font-bold text-center">{match.department}</ThemedText>
        <ThemedText>{match.winner ? "Winner" : "Runner-up"}</ThemedText>
       
      </ThemedView>
    );
  }
  
  export default function HistroyScreen() {
    const colorScheme = useColorScheme();
    const [activeGameState, setActiveGameState] = useState(0);
    const [selectedYear, setSelectedYear] = useState("2024");
  
    const years = [
      { label: "2024", value: "2024" },
      { label: "2023", value: "2023" },
      { label: "2022", value: "2022" },
      { label: "2021", value: "2021" },
      { label: "2020", value: "2020" },
      { label: "2019", value: "2019" },
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
  
    // Sample match data
    const matches = [
        { year: "2024", match: "FootBall", department: "CS", winner: true },
        { year: "2024", match: "FootBall", department: "AE", winner: false },
        { year: "2024", match: "Cricket", department: "EE", winner: true },
        { year: "2024", match: "Cricket", department: "AV", winner: false },
        { year: "2024", match: "BasketBall", department: "SS", winner: true },
        { year: "2024", match: "BasketBall", department: "AE", winner: false },
        { year: "2024", match: "Table Tennis", department: "AV", winner: true },
        { year: "2024", match: "Table Tennis", department: "CS", winner: false },
        { year: "2023", match: "Cricket", department: "EE", winner: true },
        { year: "2023", match: "FootBall", department: "CS", winner: false },
        { year: "2023", match: "BasketBall", department: "SS", winner: true },
        { year: "2023", match: "BasketBall", department: "AE", winner: false },
        { year: "2023", match: "Table Tennis", department: "SS", winner: false },
      ];
  
    return (
      <ThemedView className="flex flex-col items-center">
        <ThemedText type="title" className="mt-8">
          History
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
  
        {/* Dropdown for Year Selection */}
        <Dropdown
            data={years}
            labelField="label"
            valueField="value"
            placeholder="Select Year"
            value={selectedYear}
            onChange={(item) => setSelectedYear(item.value)}
            style={[
                styles.dropdown,
                {
                borderColor:
                    Colors[colorScheme ?? "light"].tabIconDefault + "80",
                },
            ]}
            placeholderStyle={{
                color: Colors[colorScheme ?? "light"].tabIconDefault,
            }}
            selectedTextStyle={{
                color: Colors[colorScheme ?? "light"].text,
            }}
            itemTextStyle={{
                color: Colors[colorScheme ?? "light"].tabIconDefault,
            }}
            activeColor={
                Colors[colorScheme ?? "light"].tabIconDefault + "30"
            }
            containerStyle={{
                marginTop: 10,
                backgroundColor: Colors[colorScheme ?? "light"].background,
                borderRadius: 8,
                borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
                overflow: "hidden",
            }}
            />


  
        {/* Match History */}
        <ThemedView className="px-5 gap-4 flex flex-col mt-6 w-full">
          {matches
            .filter(
              (item) =>
                item.match === games[activeGameState].name &&
                item.year === selectedYear
            )
            .map((item, index) => (
              <History match={item} key={index} />
            ))}
        </ThemedView>
      </ThemedView>
    );
  }
  const styles = StyleSheet.create({
    fieldContainer: {
      width: "100%",
      marginBottom: 10,
    },
    errorText: {
      fontWeight: "900",
      fontSize: 12,
      lineHeight: 12,
      marginBottom: 5,
      color: "#F33", 
      
      
    },
    dropdown: {
      width: "90%",
      borderWidth: 1,
      borderRadius: 6,
      padding: 10,
      marginBottom: 10,
      marginTop: 30,
      justifyContent: "center",
      textAlign: "center"
    },
  });
  