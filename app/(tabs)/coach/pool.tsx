import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { TouchableOpacity, ScrollView, Modal, View, Button } from "react-native";
import React, { useState } from "react";

export default function Pool() {
  const colorScheme = useColorScheme();
  const [selectedSport, setSelectedSport] = useState("Football");
  const [pools, setPools] = useState({
    Football: {
      "Pool A": ["CS", "AE", "ME"],
      "Pool B": ["EE", "MSE", "MATH", "SS"],
    },
    Cricket: {
      "Pool A": ["CS", "EE", "MATH"],
      "Pool B": ["AE", "MSE", "SS"],
    },
    Basketball: {
      "Pool A": ["CS", "MSE", "SS"],
      "Pool B": ["EE", "AE", "ME"],
    },
    TableTennis: {
      "Pool A": ["CS", "ME", "SS"],
      "Pool B": ["EE", "AE", "MATH"],
    },
  });
  const [scheduledMatches] = useState([
    {
      teams: "CS vs AE",
      pool: "Pool A",
    },
    {
      teams: "EE vs MATH",
      pool: "Pool B",
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openPopup = (sport) => {
    setSelectedSport(sport);
    setIsModalVisible(true);
  };

  const createPool = () => {
    setPools((prevPools) => {
      const newPools = { ...prevPools };
      const sportPools = newPools[selectedSport];
      const newPoolName = `Pool ${String.fromCharCode(65 + Object.keys(sportPools).length)}`; // Generate Pool C, D, etc.
      sportPools[newPoolName] = ["NEW_TEAM"]; // Example new pool data
      return newPools;
    });
    setIsModalVisible(false); // Close the popup
  };

  return (
    <ScrollView>
      <ThemedView className="flex flex-col items-center p-4">
        {/* Sports Buttons */}
        {Object.keys(pools).map((sport) => (
          <TouchableOpacity
            key={sport}
            onPress={() => openPopup(sport)}
            className="w-[60%] rounded-md items-center justify-center py-3 mb-3"
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].tint,
              marginVertical: 5,
            }}
          >
            <ThemedText
              className="text-center"
              style={{ color: Colors[colorScheme ?? "light"].background }}
            >
              {sport}
            </ThemedText>
          </TouchableOpacity>
        ))}

        {/* Pools Section */}
        <ThemedView className="w-full mt-6">
          <ThemedText
            style={{
              fontWeight: "700",
              fontSize: 20,
              marginBottom: 10,
              color: Colors[colorScheme ?? "light"].text,
            }}
          >
            {selectedSport} Pools
          </ThemedText>

          {Object.entries(pools[selectedSport]).map(([poolName, departments]) => (
            <ThemedView key={poolName} className="mb-4">
              <ThemedText
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: Colors[colorScheme ?? "light"].text,
                }}
              >
                {poolName}
              </ThemedText>
              <ThemedText
                style={{
                  color: Colors[colorScheme ?? "light"].text,
                }}
              >
                {departments.join(", ")}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>

        {/* Scheduled Matches Section */}
        <ThemedView className="w-full mt-4">
          <ThemedText
            style={{
              fontWeight: "700",
              fontSize: 20,
              marginBottom: 10,
              color: Colors[colorScheme ?? "light"].text,
            }}
          >
            Scheduled Matches
          </ThemedText>

          {scheduledMatches.map((match, index) => (
            <ThemedView
              key={index}
              className="p-3 mb-2 rounded-md"
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].background,
                borderWidth: 1,
                borderColor:
                  Colors[colorScheme ?? "light"].tabIconDefault + "30",
              }}
            >
              <ThemedText
                style={{
                  color: Colors[colorScheme ?? "light"].text,
                }}
              >
                {match.teams}
              </ThemedText>
              <ThemedText
                style={{
                  color: Colors[colorScheme ?? "light"].tabIconDefault,
                }}
              >
                Pool: {match.pool}
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>

        {/* Popup Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "80%",
                padding: 20,
                backgroundColor: Colors[colorScheme ?? "light"].background,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <ThemedText
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 20,
                  color: Colors[colorScheme ?? "light"].text,
                }}
              >
                Create Pools for {selectedSport}
              </ThemedText>
              <TouchableOpacity
                onPress={createPool}
                style={{
                  backgroundColor: Colors[colorScheme ?? "light"].tint,
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <ThemedText
                  style={{
                    color: Colors[colorScheme ?? "light"].background,
                  }}
                >
                  Create Pool
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{
                  backgroundColor: "#cccccc",
                  padding: 10,
                  borderRadius: 5,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <ThemedText>Cancel</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ThemedView>
    </ScrollView>
  );
}
