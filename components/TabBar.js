import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import colors from "../constants/colors";
import { usePathname, useRouter } from "expo-router";
import BOTTOM_NAVIGATIONS from "../constants/bottomNavigation";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

const TabBar = () => {
  const { navigate } = useRouter();
  const pathname = usePathname();
  return (
    <View style={styles.tabBarContainer}>
      {BOTTOM_NAVIGATIONS.map((value, index) => {
        const isActive = pathname === value.href;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigate(value.href)} // 탭 클릭 시 해당 경로로 이동
            style={[
              styles.tabButton,
              isActive && { color: colors.primary500 },
              { alignItems: "center", width: 40, height: 40 },
            ]}
          >
            <MaterialCommunityIcon
              name={value.iconName}
              size={25}
              color={isActive ? colors.primary500 : "black"}
            />
            <Text
              style={{
                color: isActive ? colors.primary500 : "black",
              }}
            >
              {value.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    height: 90,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray0,
    flexDirection: "row",
    columnGap: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default TabBar;
