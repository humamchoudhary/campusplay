import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/SessionContext";
import { Dropdown } from "react-native-element-dropdown";
import React, { useState, useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";

interface TrialEvent {
  id: string;
  department: string;
  sport: string;
  time: string;
  day: string;
  conducted: boolean;
  createdBy: string;
  createdAt: string;
}

export default function Trials() {
  const colorScheme = useColorScheme();
  const { user } = useSession();
  const [createTrialModal, setCreateTrialModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedTime, setSelectedTime] = useState("1:00");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [trialEvents, setTrialEvents] = useState<TrialEvent[]>([]);

  const sports = [
    { label: "Football", value: "Football" },
    { label: "Cricket", value: "Cricket" },
    { label: "Basketball", value: "Basketball" },
    { label: "TableTennis", value: "TableTennis" },
  ];

  const days = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
  ];

  const fetchTrials = async () => {
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/trials/list`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setTrialEvents(data.trials);
      }
    } catch (error) {
      console.error("Error fetching trials:", error);
    }
  };

  useEffect(() => {
    fetchTrials();
  }, []);

  const createTrial = async () => {
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/trials/create`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sport: selectedSport,
          time: selectedTime,
          day: selectedDay,
          createdBy: user?.username,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCreateTrialModal(false);
        fetchTrials();
      }
    } catch (error) {
      console.error("Error creating trial:", error);
    }
  };

  const deleteTrial = async (trialId: string) => {
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/trials/delete/${trialId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        fetchTrials();
      }
    } catch (error) {
      console.error("Error deleting trial:", error);
    }
  };

  const markTrialConducted = async (trialId: string) => {
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/trials/mark-conducted/${trialId}`;
      const response = await fetch(url, {
        method: "PUT",
      });

      const data = await response.json();
      if (data.success) {
        fetchTrials();
      }
    } catch (error) {
      console.error("Error marking trial as conducted:", error);
    }
  };

  return (
    <ScrollView>
      <ThemedView className="flex-1 p-4">
        <ThemedView className="flex items-center mb-6">
          <TouchableOpacity
            onPress={() => setCreateTrialModal(true)}
            className="w-64 rounded-md py-3"
            style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
          >
            <ThemedText
              className="text-center"
              style={{ color: Colors[colorScheme ?? "light"].background }}
            >
              Create New Trial
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedText className="text-xl font-bold mb-4">Created Events:</ThemedText>

        {trialEvents.map((trial) => (
          <ThemedView
            key={trial.id}
            className="mb-4 p-4 rounded-lg"
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].background,
              borderColor: Colors[colorScheme ?? "light"].tint,
              borderWidth: 1,
            }}
          >
            <ThemedText className="font-bold">
              {trial.department} - {trial.sport}
            </ThemedText>
            <ThemedText>
              {trial.day} at {trial.time}
            </ThemedText>
            <ThemedText className="text-sm text-gray-500">
              Created by {trial.createdBy} at {new Date(trial.createdAt).toLocaleString()}
            </ThemedText>

            <ThemedView className="flex-row justify-between mt-2">
              <TouchableOpacity
                onPress={() => deleteTrial(trial.id)}
                className="bg-red-500 px-4 py-2 rounded"
              >
                <ThemedText style={{ color: "white" }}>Delete</ThemedText>
              </TouchableOpacity>

              {!trial.conducted && (
                <TouchableOpacity
                  onPress={() => markTrialConducted(trial.id)}
                  className="bg-green-500 px-4 py-2 rounded"
                >
                  <ThemedText style={{ color: "white" }}>Mark Conducted</ThemedText>
                </TouchableOpacity>
              )}

              {trial.conducted && (
                <ThemedView className="bg-green-200 px-4 py-2 rounded">
                  <ThemedText style={{ color: "green" }}>✓ Trials conducted</ThemedText>
                </ThemedView>
              )}
            </ThemedView>
          </ThemedView>
        ))}

        <Modal isVisible={createTrialModal}>
          <ThemedView
            className="p-6 rounded-lg"
            style={{ backgroundColor: Colors[colorScheme ?? "light"].background }}
          >
            <ThemedText className="text-xl font-bold mb-4">Create Trial Event</ThemedText>

            <Dropdown
              data={sports}
              labelField="label"
              valueField="value"
              placeholder="Select Sport"
              value={selectedSport}
              onChange={(item) => setSelectedSport(item.value)}
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
                  backgroundColor: Colors[colorScheme ?? "light"].background,
                  borderRadius: 8,
                  borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
                  overflow: "hidden",
              }}
            />

            <TextInput
              placeholder="Time (e.g., 1:00)"
              value={selectedTime}
              onChangeText={setSelectedTime}
              style={[
                styles.input,
                {
                  borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
                  color: Colors[colorScheme ?? "light"].text,
                },
              ]}
            />

            <Dropdown
              data={days}
              labelField="label"
              valueField="value"
              placeholder="Select Day"
              value={selectedDay}
              onChange={(item) => setSelectedDay(item.value)}
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
                  backgroundColor: Colors[colorScheme ?? "light"].background,
                  borderRadius: 8,
                  borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
                  overflow: "hidden",
              }}
            />

            <ThemedView className="flex-row justify-end mt-4 gap-2">
              <TouchableOpacity
                onPress={() => setCreateTrialModal(false)}
                className="px-4 py-2 rounded"
                style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
              >
                <ThemedText style={{ color: Colors[colorScheme ?? "light"].background }}>
                  Cancel
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={createTrial}
                className="px-4 py-2 rounded"
                style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
              >
                <ThemedText style={{ color: Colors[colorScheme ?? "light"].background }}>
                  Create Event
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </Modal>
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
        marginBottom: 10,
        marginTop: 5,
        justifyContent: "center",
        textAlign: "center"
      },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});