import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useSession } from "@/context/SessionContext";

const ACCOUNT_TYPES = [
  { label: "Admin", value: "admin" },
  { label: "Sports Coach", value: "coach" },
  { label: "Coordinator", value: "coordinator" },
  { label: "Student Rep", value: "rep" },
  { label: "Referee", value: "ref" },
];

export default function LoginPage() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { signIn } = useSession();
  const [error, setError] = useState<string>("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      account_type: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      // console.log(value);
      signIn(
        { email: value["email"], password: value["password"] },
        value["account_type"],
      )
        .then(() => {
          router.replace("/");
        })
        .catch((e) => {
          console.log(e);
          setError(e);
        });
    },
  });

  return (
    <ThemedView
      className="flex flex-col items-center"
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "dark"].background_sec,
      }}
    >
      <ThemedView
        className="justify-center items-center flex flex-col absolute top-0 left-0 right-0 h-60"
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].tint,
          borderBottomEndRadius: 44,
          borderBottomStartRadius: 44,
        }}
      >
        <ThemedText type="title" style={{ color: "#FFF" }}>
          CampusPlay
        </ThemedText>
      </ThemedView>
      <ThemedView className="flex items-center justify-center rounded-md flex-col gap-2 px-8 py-8 my-auto w-4/5 shadow-md">
        <ThemedText className="text-center font-black mb-4" type="subtitle">
          Login
        </ThemedText>
        <ThemedText style={{ color: "#ff3333" }} className="mb-1">
          {error && `${error}`}
        </ThemedText>
        {/* Email Field */}
        <form.Field
          name="email"
          validators={{
            onSubmitAsync: ({ value }) => {
              return !value
                ? "Email is required"
                : value.length < 10
                  ? "Email must be at least 10 characters"
                  : undefined;
            },
          }}
          children={(field) => (
            <View style={styles.fieldContainer}>
              {field.state.meta.errors &&
                field.state.meta.errors.length > 0 && (
                  <ThemedText
                    className="text-start w-full"
                    style={styles.errorText}
                    lightColor="#ff3333"
                    darkColor="#ff3333"
                    type={undefined}
                  >
                    {field.state.meta.errors.join(", ")}
                  </ThemedText>
                )}
              <TextInput
                className="border rounded-md w-full mb-4"
                placeholder="Email"
                placeholderTextColor={
                  Colors[colorScheme ?? "light"].tabIconDefault
                }
                value={field.state.value}
                onChangeText={field.handleChange}
                style={{
                  borderColor:
                    field.state.meta.errors && field.state.meta.errors.length
                      ? "#F33"
                      : Colors[colorScheme ?? "light"].tabIconDefault + "80",
                  color:
                    field.state.meta.errors && field.state.meta.errors.length
                      ? "#F33"
                      : Colors[colorScheme ?? "light"].text,
                  padding: 10,
                }}
              />
            </View>
          )}
        />

        {/* Password Field */}
        <form.Field
          name="password"
          validators={{
            onSubmitAsync: ({ value }) => {
              return !value ? "Password is required" : undefined;
            },
          }}
          children={(field) => (
            <View style={styles.fieldContainer}>
              {field.state.meta.errors &&
                field.state.meta.errors.length > 0 && (
                  <ThemedText
                    className="text-start w-full"
                    style={styles.errorText}
                    lightColor="#ff3333"
                    darkColor="#ff3333"
                    type={undefined}
                  >
                    {field.state.meta.errors.join(", ")}
                  </ThemedText>
                )}
              <TextInput
                className="border rounded-md w-full mb-4"
                placeholder="Password"
                placeholderTextColor={
                  Colors[colorScheme ?? "light"].tabIconDefault
                }
                value={field.state.value}
                onChangeText={field.handleChange}
                secureTextEntry={true}
                style={{
                  borderColor:
                    field.state.meta.errors && field.state.meta.errors.length
                      ? "#F33"
                      : Colors[colorScheme ?? "light"].tabIconDefault + "80",
                  color:
                    field.state.meta.errors && field.state.meta.errors.length
                      ? "#F33"
                      : Colors[colorScheme ?? "light"].text,
                  padding: 10,
                }}
              />
            </View>
          )}
        />

        {/* Account Type Dropdown */}
        <form.Field
          name="account_type"
          validators={{
            onSubmitAsync: ({ value }) => {
              return !value ? "Account type is required" : undefined;
            },
          }}
          children={(field) => (
            <ThemedView style={styles.fieldContainer}>
              {field.state.meta.errors &&
                field.state.meta.errors.length > 0 && (
                  <ThemedText
                    className="text-start w-full"
                    style={styles.errorText}
                    lightColor="#ff3333"
                    darkColor="#ff3333"
                    type={undefined}
                  >
                    {field.state.meta.errors.join(", ")}
                  </ThemedText>
                )}
              <Dropdown
                data={ACCOUNT_TYPES}
                labelField="label"
                valueField="value"
                placeholder="Select Account Type"
                value={field.state.value}
                onChange={(item) => {
                  field.handleChange(item.value);
                }}
                style={[
                  styles.dropdown,
                  {
                    borderColor:
                      field.state.meta.errors && field.state.meta.errors.length
                        ? "#F33"
                        : Colors[colorScheme ?? "light"].tabIconDefault + "80",
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
                  borderColor:
                    Colors[colorScheme ?? "light"].tabIconDefault + "80",
                  overflow: "hidden",
                }}
              />
            </ThemedView>
          )}
        />

        {/* Login Button */}
        <TouchableOpacity
          className="w-full rounded-md py-3 mt-4"
          style={{
            backgroundColor: Colors[colorScheme ?? "light"].tint,
          }}
          onPress={() => {
            form.handleSubmit();
            console.log(form.state.values);
          }}
        >
          <ThemedText
            style={{ color: "#FFF" }}
            className="text-center"
            type="defaultSemiBold"
          >
            Login
          </ThemedText>
        </TouchableOpacity>
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
  },
  dropdown: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
});
