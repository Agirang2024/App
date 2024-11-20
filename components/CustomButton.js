import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../constants/colors";

// 커스텀 버튼 사용시, width와 height를 꼭 명시해주세요.

const CustomButton = ({
  secondary = false,
  children,
  buttonStyle,
  TextStyle,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        secondary ? styles.buttonSecondary : styles.buttonPrimary,

        buttonStyle,
      ]}
      secondary={secondary}
      onPress={onPress}
    >
      <Text
        style={[
          secondary ? styles.textSecondary : styles.textPrimary,
          TextStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary400,
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: colors.primary400,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  textPrimary: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  textSecondary: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary400,
  },
});

export default CustomButton;
