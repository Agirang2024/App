import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem("access_token", token);
    console.log("Token saved successfully!");
  } catch (error) {
    console.error("Failed to save the token to storage:", error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (token !== null) {
      console.log("Token retrieved successfully:", token);
      return token;
    }
    console.log("No token found in storage");
  } catch (error) {
    console.error("Failed to retrieve the token from storage:", error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("access_token");
    console.log("Token removed successfully!");
  } catch (error) {
    console.error("Failed to remove the token from storage:", error);
  }
};
