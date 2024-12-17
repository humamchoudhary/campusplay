import AsyncStorage from "@react-native-async-storage/async-storage";

export async function adminLogin(email: string, password: string) {
  try {
    // Use the fetched IP in the request URL
    const response = await fetch(`http://192.168.1.21:3002/dsalogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Store token in AsyncStorage
      await AsyncStorage.setItem("token", data.token);
      // Alert.alert('Success', 'Login successful!');
      return;
      // navigation.navigate('AdminLandingPage'); // Navigate to the next screen
    } else {
      throw "Login failed";
      // Alert.alert('Error', data.message || 'Login failed');
    }
  } catch (error) {
    throw "An Error occurred during login";
    // Alert.alert('Error', 'An error occurred during login');
  }
}
