import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../constants/colors";
import { Pressable } from "react-native";

const HeartIcon = ({ liked, size, changeLike }) => {
  return (
    <Pressable onPress={changeLike}>
      <FontAwesomeIcon
        name={liked ? "heart" : "heart-o"}
        size={size ?? 20}
        color={colors.primary500}
      />
    </Pressable>
  );
};

export default HeartIcon;
