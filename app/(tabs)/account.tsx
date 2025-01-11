import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/SessionContext";
import React, { useState } from "react";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import Modal from "react-native-modal";
import { useForm } from "@tanstack/react-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Account() {
  const colorScheme = useColorScheme();
  const { user, isLoading, signOut } = useSession();
  const [addCoach, setAddCoach] = useState<boolean>(false);

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/dsasportscoachuser`;
        console.log(url);
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: value["email"],
            password: value["password"],
            username: value["username"],
          }),
        });

        const data = await response.json();

        if (data.success) {
          setAddCoach(false);
          return;
        } else {
          throw "Login failed";
        }
      } catch (error) {
        console.log(error);
        // throw "An Error occurred during login";
      }

      // onSubmit(value);
    },
  });

  if (!isLoading && !user) {
    router.replace("/");
  }
  if (user && !isLoading) {
    return (
      <ThemedView className="flex flex-col items-center">
        <ThemedText
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: Colors[colorScheme ?? "light"].tint,
          }}
          className="mt-8"
        >
          Welcome {user.email}
        </ThemedText>
        <ThemedView className="flex flex-col gap-4 mt-10">
          <TouchableOpacity
            onPress={() => {
              setAddCoach(true);
            }}
            className="flex w-64 rounded-md items-center justify-center py-3"
            style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
          >
            <ThemedText
              className="text-center"
              style={{ color: Colors[colorScheme ?? "light"].background }}
            >
              Add New Coach
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
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

        {/* <|============= Add Coach Modal =============|> */}
        <Modal
          isVisible={addCoach}
          // transparent
        >
          <ThemedView
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].background,
              borderColor: Colors[colorScheme ?? "light"].tint,
              borderWidth: 1,
              width: "100%",
            }}
            className="flex flex-col rounded-md px-4 py-8 items-center gap-4 "
          >
            <ThemedText
              style={{ fontWeight: 700, fontSize: 24 }}
              className="mb-2"
            >
              Add New Coach
            </ThemedText>

            <form.Field
              name="username"
              validators={{
                onSubmitAsync: ({ value }) => {
                  return !value ? "Name is required" : undefined;
                },
              }}
            >
              {(field) => (
                <ThemedView className="w-4/5">
                  {field.state.meta.errors &&
                    field.state.meta.errors.length > 0 && (
                      <ThemedText
                        className="text-start w-full"
                        style={{
                          color: "#ff3333",
                          fontWeight: "900",
                          fontSize: 12,
                          lineHeight: 12,
                          marginBottom: 5,
                        }}
                      >
                        {field.state.meta.errors.join(", ")}
                      </ThemedText>
                    )}
                  <TextInput
                    className="border rounded-md w-full "
                    placeholder="Coach Name"
                    placeholderTextColor={
                      Colors[colorScheme ?? "light"].tabIconDefault
                    }
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    style={{
                      borderColor:
                        field.state.meta.errors &&
                        field.state.meta.errors.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].tabIconDefault +
                            "80",
                      color:
                        field.state.meta.errors &&
                        field.state.meta.errors.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].text,
                      paddingHorizontal: 10,
                      // paddingHorizontal: 10,
                      paddingVertical: 20,
                    }}
                  />
                </ThemedView>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onSubmitAsync: ({ value }) => {
                  return !value
                    ? "Email is required"
                    : !value.includes("@")
                      ? "Invalid email format"
                      : undefined;
                },
              }}
            >
              {(field) => (
                <ThemedView className="w-4/5">
                  {field.state.meta.errors &&
                    field.state.meta.errors.length > 0 && (
                      <ThemedText
                        className="text-start w-full"
                        style={{
                          color: "#ff3333",
                          fontWeight: "900",
                          fontSize: 12,
                          lineHeight: 12,
                          marginBottom: 5,
                        }}
                      >
                        {field.state.meta.errors.join(", ")}
                      </ThemedText>
                    )}
                  <TextInput
                    className="border rounded-md w-full "
                    placeholder="Email"
                    placeholderTextColor={
                      Colors[colorScheme ?? "light"].tabIconDefault
                    }
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    keyboardType="email-address"
                    style={{
                      borderColor:
                        field.state.meta.errors &&
                        field.state.meta.errors.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].tabIconDefault +
                            "80",
                      color:
                        field.state.meta.errors &&
                        field.state.meta.errors.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].text,
                      padding: 10,
                    }}
                  />
                </ThemedView>
              )}
            </form.Field>

            <form.Field
              name="password"
              validators={{
                onSubmitAsync: ({ value }) => {
                  return !value ? "Password is required" : undefined;
                },
              }}
            >
              {(field) => (
                <ThemedView className="w-4/5">
                  {field.state.meta.errors &&
                    field.state.meta.errors.length > 0 && (
                      <ThemedText
                        className="text-start w-full"
                        style={{
                          color: "#ff3333",
                          fontWeight: "900",
                          fontSize: 12,
                          lineHeight: 12,
                          marginBottom: 5,
                        }}
                      >
                        {field.state.meta.errors.join(", ")}
                      </ThemedText>
                    )}
                  <TextInput
                    className="border rounded-md w-full "
                    placeholder="Password"
                    placeholderTextColor={
                      Colors[colorScheme ?? "light"].tabIconDefault
                    }
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    secureTextEntry={true}
                    style={{
                      borderColor:
                        field.state.meta.errors &&
                        field.state.meta.errors.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].tabIconDefault +
                            "80",
                      color:
                        field.state.meta.errors &&
                        field.state.meta.errors.length
                          ? "#F33"
                          : Colors[colorScheme ?? "light"].text,
                      padding: 10,
                    }}
                  />
                </ThemedView>
              )}
            </form.Field>

            <TouchableOpacity
              onPress={() => {
                form.handleSubmit();
              }}
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
              onPress={() => {
                setAddCoach(false);
              }}
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
    );
  }
}
