import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/SessionContext";
import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import Modal from "react-native-modal";
import { useForm } from "@tanstack/react-form";

export default function Account() {
  const colorScheme = useColorScheme();
  const { user, isLoading, signOut } = useSession();
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const change_password_form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/captain/change`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword: value.currentPassword,
            newPassword: value.newPassword,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setChangePasswordModal(false);
        } else {
          throw "Password change failed";
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (!isLoading && !user) {
    router.replace("/");
  }

  if (user && !isLoading) {
    return (
      <ScrollView>
        <ThemedView className=" flex flex-col items-center flex-1">
          <ThemedText className="w-[90%] text-xl font-bold mb-4 mt-8">Profile Details</ThemedText>
          
          <ThemedView className="w-[90%] bg-white rounded-xl p-4 shadow-sm">
            <ThemedView className="flex-row justify-between items-center py-2 border-b border-gray-100">
              <ThemedText className="text-base text-gray-600">Name:</ThemedText>
              <ThemedText className="text-base font-medium">{user.username}</ThemedText>
            </ThemedView>
            <ThemedView className="flex-row justify-between items-center py-2 border-b border-gray-100">
              <ThemedText className="text-base text-gray-600">Email:</ThemedText>
              <ThemedText className="text-base font-medium">Computer Science</ThemedText>
            </ThemedView>
            <ThemedView className="flex-row justify-between items-center py-2 border-b border-gray-100">
              <ThemedText className="text-base text-gray-600">Category:</ThemedText>
              <ThemedText className="text-base font-medium">Futsal</ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView className="w-[90%] mt-8 p-4 border border-gray-200 rounded-lg">
            <ThemedText className="text-2xl  mb-4">Events</ThemedText>
            <ThemedView className="w-full bg-white rounded-lg p-4 shadow-sm">
              <ThemedText className="font-semibold">
                Department of Computer Science
              </ThemedText>
              <ThemedText className="text-gray-600 mt-2">Futsal Trials</ThemedText>
              <ThemedText className="text-gray-600 mt-2">
                Scheduled at 1:00 AM
              </ThemedText>
              <ThemedText className="text-gray-600 mt-2">
                Created by Rep Nafay
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView className="flex flex-col gap-4 mt-10">
            <TouchableOpacity
              onPress={() => setChangePasswordModal(true)}
              className="flex w-64 rounded-md items-center justify-center py-3"
              style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
            >
              <ThemedText
                className="text-center"
                style={{ color: Colors[colorScheme ?? "light"].background }}
              >
                Change Password
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={signOut}
              className="flex w-64 rounded-md items-center justify-center py-3"
              style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
            >
              <ThemedText
                className="text-center"
                style={{ color: Colors[colorScheme ?? "light"].background }}
              >
                Logout
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          <Modal isVisible={changePasswordModal}>
            <ThemedView
              className="flex flex-col rounded-md px-4 py-8 items-center gap-4"
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].background,
                borderColor: Colors[colorScheme ?? "light"].tint,
                borderWidth: 1,
                width: "100%",
              }}
            >
              <ThemedText className="mb-2 text-2xl font-bold">
                Change Password
              </ThemedText>

              <change_password_form.Field
                name="currentPassword"
                validators={{
                  onSubmitAsync: ({ value }) => {
                    return !value ? "Current password is required" : undefined;
                  },
                }}
              >
                {(field) => (
                  <ThemedView className="w-4/5">
                    {field.state.meta.errors?.length > 0 && (
                      <ThemedText className="text-start w-full text-red-500 font-black text-xs mb-1">
                        {field.state.meta.errors.join(", ")}
                      </ThemedText>
                    )}
                    <TextInput
                      className="border rounded-md w-full px-3 py-4"
                      placeholder="Current Password"
                      placeholderTextColor={Colors[colorScheme ?? "light"].tabIconDefault}
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      secureTextEntry={true}
                      style={{
                        borderColor: field.state.meta.errors?.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].tabIconDefault + "80",
                        color: field.state.meta.errors?.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].text,
                      }}
                    />
                  </ThemedView>
                )}
              </change_password_form.Field>

              <change_password_form.Field
                name="newPassword"
                validators={{
                  onSubmitAsync: ({ value }) => {
                    return !value ? "New password is required" : undefined;
                  },
                }}
              >
                {(field) => (
                  <ThemedView className="w-4/5">
                    {field.state.meta.errors?.length > 0 && (
                      <ThemedText className="text-start w-full text-red-500 font-black text-xs mb-1">
                        {field.state.meta.errors.join(", ")}
                      </ThemedText>
                    )}
                    <TextInput
                      className="border rounded-md w-full px-3 py-4"
                      placeholder="New Password"
                      placeholderTextColor={Colors[colorScheme ?? "light"].tabIconDefault}
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      secureTextEntry={true}
                      style={{
                        borderColor: field.state.meta.errors?.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].tabIconDefault + "80",
                        color: field.state.meta.errors?.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].text,
                      }}
                    />
                  </ThemedView>
                )}
              </change_password_form.Field>

              <TouchableOpacity
                onPress={() => change_password_form.handleSubmit()}
                className="flex w-4/5 rounded-md items-center justify-center py-3"
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
                onPress={() => setChangePasswordModal(false)}
                className="flex w-4/5 rounded-md items-center justify-center py-3"
                style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
              >
                <ThemedText
                  className="text-center"
                  style={{ color: Colors[colorScheme ?? "light"].background }}
                >
                  Cancel
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </Modal>
        </ThemedView>
      </ScrollView>
    );
  }
}