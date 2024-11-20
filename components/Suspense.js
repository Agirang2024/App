import { ActivityIndicator, View } from "react-native";

const Suspense = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

export default Suspense;
