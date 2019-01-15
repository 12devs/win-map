import { AsyncStorage } from "react-native";

const hasItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  }
  catch (error) {
    return false;
  }
};

export default hasItem;
