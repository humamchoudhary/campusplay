import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/context/SessionContext";
import { Dropdown } from "react-native-element-dropdown";
import React, { useState, useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { TextInput, TouchableOpacity, View, StyleSheet, ScrollView, } from "react-native";
import { router } from "expo-router";
import Modal from "react-native-modal";
import { useForm } from "@tanstack/react-form";

export default function Account() {
  const colorScheme = useColorScheme();
  const { user, isLoading, signOut } = useSession();
  const [addCoordinator, setAddCoordinator] = useState<boolean>(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [selectDepartment, setSelectedDepartment] = useState("");
  const [addReferee, setAddReferee] = useState<boolean>(false);
  const [selectedSport, setSelectedSport] = useState<keyof typeof gameRules>("Football");
  const [createPool, setcreatePool] = useState<boolean>(false);




  const gameRules = {
    Football: "Rules for Football: Play fair and respect the referee.",
    Cricket: "Rules for Cricket: Bat within the crease and bowl legally.",
    Basketball: "Rules for Basketball: Dribble while moving and no fouls.",
    "Table Tennis": "Rules for Table Tennis: Serve diagonally and no double bounce.",
  };
  const [updateRulesModal, setUpdateRulesModal] = useState(false);
  const [rules, setRules] = useState(gameRules);
  const [newRule, setNewRule] = useState("");
  const [isEditing, setIsEditing] = useState(false);



  
    const department = [
      { label: "CS", value: "CS" },
      { label: "AVE", value: "AVE" },
      { label: "EE", value: "EE" },
      { label: "ME", value: "ME" },
      { label: "SS", value: "SS" },
      { label: "ATH", value: "ATH" },
    ];
  const sport = [
    { label: "Football", value: "Football" },
    { label: "Cricket", value: "Cricket" },
    { label: "Basketball", value: "Basketball" },
    { label: "TableTennis", value: "TableTennis" },
    
  ];

  const change_password_form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      
    },
    onSubmit: async ({ value }) => {
      try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/dsa/change`;
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


  // const change_pass_form = useForm({
  //   defaultValues: {
  //     current_password: "",
  //     new_password: "",
  //   },
  //   onSubmit: async ({ value }) => {
  //     try {
  //       const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/dsa/change`;
  //       console.log(url);
  //       const response = await fetch(url, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           currentPassword: value["current_password"],
  //           newPassword: value["new_password"],
  //         }),
  //       });
  //
  //       const data = await response.json();
  //
  //       if (data.success) {
  //         setAddCoach(false);
  //         return;
  //       } else {
  //         throw "Login failed";
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       // throw "An Error occurred during login";
  //     }
  //
  //     // onSubmit(value);
  //   },
  // });

  const referee_form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/referee/create`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: value["email"],
            password: value["password"],
            username: value["username"],
            department: selectDepartment,
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          setAddReferee(false);
          return;
        } else {
          throw "Creation failed";
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const a_c_form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/coach/create`;
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
          setAddCoordinator(false);
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
      <ThemedView className="flex flex-col items-center" style={{ flex: 1 }}>
        <ScrollView>
        <ThemedText
          style={{
            fontWeight: 700,
            fontSize: 24,
            color: Colors[colorScheme ?? "light"].tint,
          }}
          className="mt-8"
        >
          Welcome {user.username}
        </ThemedText>
        <ThemedView className="flex flex-col gap-4 mt-10">
          <TouchableOpacity
            onPress={() => {
              setAddCoordinator(true);
            }}
            className="flex w-64 rounded-md items-center justify-center py-3"
            style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
          >
            <ThemedText
              className="text-center"
              style={{ color: Colors[colorScheme ?? "light"].background }}
            >
              Add Coordinator
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {
              setAddReferee(true);
            }}
            className="flex w-64 rounded-md items-center justify-center py-3"
            style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
          >
            <ThemedText
              className="text-center"
              style={{ color: Colors[colorScheme ?? "light"].background }}
            >
              Add Referee
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setcreatePool(true);
            }}
            className="flex w-64 rounded-md items-center justify-center py-3"
            style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
          >
            <ThemedText
              className="text-center"
              style={{ color: Colors[colorScheme ?? "light"].background }}
            >
              Create Pool
            </ThemedText>
          </TouchableOpacity>

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

        <ThemedView className="flex flex-col items-center" style={{ flex: 1 }}>
  <ThemedText
    style={{
      fontWeight: 700,
      fontSize: 24,
      color: Colors[colorScheme ?? "light"].tint,
    }}
    className="mt-8 mb-8"
  >
    Sports Category Rules 
  </ThemedText>

  {/* Add these buttons */}
  <TouchableOpacity
  onPress={() => {
    setSelectedSport("Football");
    setUpdateRulesModal(true);
  }}
  className="flex w-64 rounded-md items-center justify-center py-3 mt-4"
  style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
>
  <ThemedText
    className="text-center"
    style={{ color: Colors[colorScheme ?? "light"].background }}
  >
    Football Rules
  </ThemedText>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => {
    setSelectedSport("Cricket");
    setUpdateRulesModal(true);
  }}
  className="flex w-64 rounded-md items-center justify-center py-3 mt-4"
  style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
>
  <ThemedText
    className="text-center"
    style={{ color: Colors[colorScheme ?? "light"].background }}
  >
    Cricket Rules
  </ThemedText>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => {
    setSelectedSport("Basketball");
    setUpdateRulesModal(true);
  }}
  className="flex w-64 rounded-md items-center justify-center py-3 mt-4"
  style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
>
  <ThemedText
    className="text-center"
    style={{ color: Colors[colorScheme ?? "light"].background }}
  >
    Basketball Rules
  </ThemedText>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => {
    setSelectedSport("Table Tennis");
    setUpdateRulesModal(true);
  }}
  className="flex w-64 rounded-md items-center justify-center py-3 mt-4"
  style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
>
  <ThemedText
    className="text-center"
    style={{ color: Colors[colorScheme ?? "light"].background }}
  >
    TableTennis Rules
  </ThemedText>
</TouchableOpacity>
  
</ThemedView>
        

        {/* <|============= Add Coordinator Modal =============|> */}
        <Modal
          isVisible={addCoordinator}
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
              Add New Coordinator
            </ThemedText>

            <a_c_form.Field
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
                    placeholder="Coordinator Name"
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
                      paddingVertical: 15,
                    }}
                  />
                </ThemedView>
              )}
            </a_c_form.Field>

            <a_c_form.Field
              name="email"
              validators={{
                onSubmitAsync: ({ value }) => {
                  return !value
                    ? "Email is required"
                    : !value.includes("@")
                      ? "Invalid email a_c_format"
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
                      padding: 15,
                    }}
                  />
                </ThemedView>
              )}
            </a_c_form.Field>

            <a_c_form.Field
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
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                    }}
                  />
                </ThemedView>
              )}
            </a_c_form.Field>
        
        <Dropdown
            data={department}
            labelField="label"
            valueField="value"
            placeholder="Select Department"
            value={selectDepartment}
            onChange={(item) => setSelectedDepartment(item.value)}
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



            <TouchableOpacity
              onPress={() => {
                a_c_form.handleSubmit();
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
                setAddCoordinator(false);
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

        {/* <|============= Add refree Modal =============|> */}

        <Modal
          isVisible={addReferee}
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
              Add New Refree
            </ThemedText>

            <a_c_form.Field
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
                    placeholder="Refree Name"
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
                      paddingVertical: 15,
                    }}
                  />
                </ThemedView>
              )}
            </a_c_form.Field>

            <a_c_form.Field
              name="email"
              validators={{
                onSubmitAsync: ({ value }) => {
                  return !value
                    ? "Email is required"
                    : !value.includes("@")
                      ? "Invalid email a_c_format"
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
                      padding: 15,
                    }}
                  />
                </ThemedView>
              )}
            </a_c_form.Field>

            <a_c_form.Field
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
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                    }}
                  />
                </ThemedView>
              )}
            </a_c_form.Field>
        
        <Dropdown
            data={sport}
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



            <TouchableOpacity
              onPress={() => {
                a_c_form.handleSubmit();
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
                setAddReferee(false);
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

        {/* <|============= Change Password Modal =============|> */}

        <Modal
          isVisible={changePasswordModal} // State to control visibility
         >
          <ThemedView
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].background,
              borderColor: Colors[colorScheme ?? "light"].tint,
              borderWidth: 1,
              width: "100%",
            }}
            className="flex flex-col rounded-md px-4 py-8 items-center gap-4"
          >
            <ThemedText
              style={{ fontWeight: 700, fontSize: 24 }}
              className="mb-2"
            >
              Change Password
            </ThemedText>

            {/* Current Password Field */}
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
                    className="border rounded-md w-full"
                    placeholder="Current Password"
                    placeholderTextColor={
                      Colors[colorScheme ?? "light"].tabIconDefault
                    }
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
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                    }}
                  />
                </ThemedView>
              )}
            </change_password_form.Field>

            {/* New Password Field */}
            <a_c_form.Field
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
                    className="border rounded-md w-full"
                    placeholder="New Password"
                    placeholderTextColor={
                      Colors[colorScheme ?? "light"].tabIconDefault
                    }
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
                      paddingHorizontal: 10,
                      paddingVertical: 15,
                    }}
                  />
                </ThemedView>
              )}
            </a_c_form.Field>

            

            {/* Submit Button */}
            <TouchableOpacity
              onPress={() => {
                a_c_form.handleSubmit();
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

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => {
                setChangePasswordModal(false);
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

        {/* Rules Update Modal */}

<Modal
  isVisible={updateRulesModal}
>
  <ThemedView
    style={{
      backgroundColor: Colors[colorScheme ?? "light"].background,
      borderColor: Colors[colorScheme ?? "light"].tint,
      borderWidth: 1,
      width: "100%",
    }}
    className="flex flex-col rounded-md px-4 py-8 items-center gap-4"
  >
    <ThemedText
      style={{ fontWeight: 700, fontSize: 24 }}
      className="mb-2"
    >
      {selectedSport} Rules
    </ThemedText>

    {/* Current Rules Display */}
    <ThemedView className="w-4/5">
      <ThemedText
        style={{
          color: Colors[colorScheme ?? "light"].text,
          marginBottom: 10,
        }}
      >
        Current Rules:
      </ThemedText>
      <ThemedText
        style={{
          color: Colors[colorScheme ?? "light"].text,
          marginBottom: 20,
        }}
      >
        {rules[selectedSport]}
      </ThemedText>
    </ThemedView>

    {/* Rules Input */}
    <ThemedView className="w-4/5">
      <TextInput
        className="border rounded-md w-full"
        placeholder="Enter new rules"
        placeholderTextColor={Colors[colorScheme ?? "light"].tabIconDefault}
        value={newRule}
        onChangeText={setNewRule}
        multiline={true}
        numberOfLines={4}
        style={{
          borderColor: Colors[colorScheme ?? "light"].tabIconDefault + "80",
          color: Colors[colorScheme ?? "light"].text,
          paddingHorizontal: 10,
          paddingVertical: 15,
          textAlignVertical: 'top',
        }}
      />
    </ThemedView>

    {/* Update Button */}
    <TouchableOpacity
      onPress={() => {
        if (newRule.trim()) {
          setRules(prev => ({
            ...prev,
            [selectedSport]: newRule
          }));
          setNewRule("");
          setUpdateRulesModal(false);
        }
      }}
      className="flex w-4/5 rounded-md items-center justify-center py-3"
      style={{ backgroundColor: Colors[colorScheme ?? "light"].tint }}
    >
      <ThemedText
        className="text-center"
        style={{ color: Colors[colorScheme ?? "light"].background }}
      >
        Update Rules
      </ThemedText>
    </TouchableOpacity>

    {/* Cancel Button */}
    <TouchableOpacity
      onPress={() => {
        setNewRule("");
        setUpdateRulesModal(false);
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
        </ScrollView>

      </ThemedView>

      


    );
    
  }
}
const styles = StyleSheet.create({
  dropdown: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    marginTop: 5,
    justifyContent: "center",
    textAlign: "center"
  },
});
