import AsyncStorage from "@react-native-async-storage/async-storage";

// <====================================ADMIN LOGIN=================================>
export async function adminLogin(email: string, password: string) {
  try {
    // Use the fetched IP in the request URL
    const response = await fetch(`${process.env.BACKEND_URL}/dsalogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      await AsyncStorage.setItem("token", data.token);
      return;
    } else {
      throw "Login failed";
    }
  } catch (error) {
    throw "An Error occurred during login";
  }
}

// <====================================COACH LOGIN=================================>
export async function coachLogin(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/sportscoachlogin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (data.success) {
      await AsyncStorage.setItem("token", data.token);
      return;
    } else {
      throw "Login failed";
    }
  } catch (error) {
    throw "An Error occurred during login";
  }
}

// <====================================COORD LOGIN=================================>
export async function coordLogin(email: string, password: string) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/coordinatorlogin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );

    const data = await response.json();

    if (data.success) {
      await AsyncStorage.setItem("token", data.token);
      return;
    } else {
      throw "Login failed";
    }
  } catch (error) {
    throw "An Error occurred during login";
  }
}

// <====================================REP LOGIN=================================>
export async function repLogin(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/studentreplogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      await AsyncStorage.setItem("token", data.token);
      return;
    } else {
      throw "Login failed";
    }
  } catch (error) {
    throw "An Error occurred during login";
  }
}
