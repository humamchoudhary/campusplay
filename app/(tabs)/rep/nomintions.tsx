import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/SessionContext";
import { Dropdown } from "react-native-element-dropdown";
import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { router } from "expo-router";
import { useForm } from "@tanstack/react-form";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface PlayerData {
  name: string;
  rollNumber: string;
  section: string;
}

export default function Nominations() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useSession();
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [showNominationForm, setShowNominationForm] = useState(false);
  const [players, setPlayers] = useState<PlayerData[]>(
    Array(10).fill({
      name: "",
      rollNumber: "",
      section: "",
    })
  );

  const sports = [
    { label: "Football", value: "Football" },
    { label: "Cricket", value: "Cricket" },
    { label: "Basketball", value: "Basketball" },
    { label: "TableTennis", value: "TableTennis" },
  ];

  const departments = [
    { label: "CS", value: "CS" },
    { label: "AVE", value: "AVE" },
    { label: "EE", value: "EE" },
    { label: "ME", value: "ME" },
    { label: "SS", value: "SS" },
    { label: "ATH", value: "ATH" },
  ];


  const downloadPDF = async (sport: string) => {
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/rep/downloadPDF/${sport}`;
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Handle file saving based on platform
      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${sport}_Nomination_Form.pdf`;
        link.click();
      } else {
        const fileUri = `${FileSystem.documentDirectory}${sport}_Nomination_Form.pdf`;
        await FileSystem.writeAsStringAsync(fileUri, await blob.text(), {
          encoding: FileSystem.EncodingType.Base64
        });

        await Sharing.shareAsync(fileUri);
      }
      
      Alert.alert("Download", `${sport} Nomination Form downloaded successfully`);
    } catch (error) {
      console.log("Error downloading PDF:", error);
      Alert.alert("Download Failed", "Could not download the PDF.");
    }
  };

  const handlePlayerChange = (index: number, field: keyof PlayerData, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], [field]: value };
    setPlayers(newPlayers);
  };

  const renderNominationGrid = () => (
    <ThemedView style={styles.gridContainer}>
      {/* Header */}
      <View style={styles.headerRow}>
        <ThemedText style={styles.headerText}>Player</ThemedText>
        <ThemedText style={styles.headerText}>Roll Number</ThemedText>
        <ThemedText style={styles.headerText}>Section</ThemedText>
      </View>

      {/* Player Rows */}
      {players.map((player, index) => (
        <View key={index} style={styles.playerRow}>
          <TextInput
            placeholder={index === 0 ? "Captain" : `Player ${index + 1}`}
            value={player.name}
            onChangeText={(text) => handlePlayerChange(index, 'name', text)}
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text }
            ]}
            placeholderTextColor={Colors[colorScheme ?? "light"].tabIconDefault}
          />
          <TextInput
            placeholder="121388-9"
            value={player.rollNumber}
            onChangeText={(text) => handlePlayerChange(index, 'rollNumber', text)}
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text }
            ]}
            placeholderTextColor={Colors[colorScheme ?? "light"].tabIconDefault}
          />
          <TextInput
            placeholder="CS-02"
            value={player.section}
            onChangeText={(text) => handlePlayerChange(index, 'section', text)}
            style={[
              styles.input,
              { color: Colors[colorScheme ?? "light"].text }
            ]}
            placeholderTextColor={Colors[colorScheme ?? "light"].tabIconDefault}
          />
        </View>
      ))}
    </ThemedView>
  );

  const handleSubmit = async () => {
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/rep/submitNominationForm`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sport: selectedSport,
          department: selectedDepartment,
          players: players,
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <ThemedView className="flex flex-col items-center" style={{ flex: 1 }}>
        <ThemedText
          style={{
            fontWeight: "700",
            fontSize: 24,
            color: Colors[colorScheme ?? "light"].tint,
          }}
          className="mt-8 mb-6"
        >
          {showNominationForm ? `${selectedSport} Nomination Form` : "Select Sport"}
        </ThemedText>

        {!showNominationForm ? (
          <ThemedView className="w-[60%] flex flex-col gap-4 mt-10">
            {sports.map((sport) => (
              <View key={sport.value} className="flex flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => {
                  setSelectedSport(sport.value);
                  setShowNominationForm(true);
                }}
                className="flex-1 rounded-md items-center justify-center py-3 mr-2"
                style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
              >
                <ThemedText
                  className="text-center"
                  style={{ color: Colors[colorScheme ?? "light"].background }}
                >
                  {sport.label}
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => downloadPDF(sport.value)}
                className="rounded-md items-center justify-center py-3 px-2"
                style={{ backgroundColor: Colors[colorScheme ?? "light"].background, borderWidth: 1, borderColor: Colors[colorScheme ?? "light"].tint }}
              >
                <ThemedText
                  style={{ 
                    color: Colors[colorScheme ?? "light"].tint,
                    fontSize: 12
                  }}
                >
                  Download
                </ThemedText>
              </TouchableOpacity>
            </View>
              
            ))}
          </ThemedView>
        ) : (
          <ThemedView style={{ width: '90%' , alignItems: 'center' }}>
            <Dropdown
              data={departments}
              labelField="label"
              valueField="value"
              placeholder="Select Department"
              value={selectedDepartment}
              onChange={(item) => setSelectedDepartment(item.value)}
              style={[
                styles.dropdown,
                {
                  borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
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
              activeColor={Colors[colorScheme ?? "light"].tabIconDefault + "30"}
              containerStyle={{
                backgroundColor: Colors[colorScheme ?? "light"].background,
                borderRadius: 8,
                borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
              }}
            />

            {renderNominationGrid()}

            <ThemedView className="w-[60%] flex flex-col gap-4 mt-10 ">
              <TouchableOpacity
                onPress={handleSubmit}
                className="flex rounded-md items-center justify-center py-3"
                style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
              >
                <ThemedText
                  className="text-center"
                  style={{ color: Colors[colorScheme ?? "light"].background }}
                >
                  Submit
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowNominationForm(false);
                  setSelectedSport("");
                  setSelectedDepartment("");
                }}
                className="flex rounded-md items-center justify-center py-3"
                style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
              >
                <ThemedText
                  className="text-center"
                  style={{ color: Colors[colorScheme ?? "light"].background }}
                >
                  Back
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  gridContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    flex: 1,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  playerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
});