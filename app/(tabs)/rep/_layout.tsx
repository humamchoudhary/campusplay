import { Text } from "react-native";
import { Redirect, Stack, Slot } from "expo-router";
import { useSession } from "@/context/SessionContext";
import React from "react";

export default function CheckLayout() {
  const { user, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user || user.loggedin !== "rep") {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href={"/login"} />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Slot />;
}
