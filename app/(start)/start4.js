import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import colors from "../../constants/colors";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import client from "../../lib/api/client";
import { useUser } from "../../hooks/useUser";

const Start4 = () => {
  const router = useRouter();
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [babyAge, setBabyAge] = useState("");

  const regions = [
    { label: "서울특별시", value: "서울특별시" },
    { label: "부산광역시", value: "부산광역시" },
    { label: "대구광역시", value: "대구광역시" },
    { label: "인천광역시", value: "인천광역시" },
    { label: "광주광역시", value: "광주광역시" },
    { label: "대전광역시", value: "대전광역시" },
    { label: "울산광역시", value: "울산광역시" },
    { label: "세종특별자치시", value: "세종특별자치시" },
    { label: "경기도", value: "경기도" },
    { label: "강원도", value: "강원도" },
    { label: "충청북도", value: "충청북도" },
    { label: "충청남도", value: "충청남도" },
    { label: "전라북도", value: "전라북도" },
    { label: "전라남도", value: "전라남도" },
    { label: "경상북도", value: "경상북도" },
    { label: "경상남도", value: "경상남도" },
    { label: "제주특별자치도", value: "제주특별자치도" },
  ];

  const babyAges = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}개월`,
    value: `${i + 1}개월`,
  }));

  const handleComplete = async () => {
    if (!username || !location || !babyAge) {
      alert("모든 필드를 채워주세요!");
      return;
    }
    const res = await client.patch(`/user/${user.userId}`, {
      username,
      location,
      baby_born: babyAge,
    });
    if (res.data) {
      router.push("/home");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/home")} style={styles.skip}>
        <Text style={{ marginRight: 5 }}>지금은 건너뛰기</Text>
        <AntDesignIcon name="right" size={16} />
      </Pressable>

      <Text style={styles.inputlabel}>어떻게 불러드리면 될까요?</Text>
      <TextInput
        style={styles.input}
        placeholder="ex) 당근아빠"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
      />

      <Text style={styles.inputlabel}>거주지역이 어디인가요?</Text>
      <View style={styles.input}>
        <RNPickerSelect
          onValueChange={setLocation}
          value={location}
          items={regions}
          placeholder={{ label: "거주 지역 선택", value: null }}
          style={pickerStyles}
        />
      </View>

      <Text style={styles.inputlabel}>아기가 태어난지 얼마나 됐나요?</Text>
      <View style={styles.input}>
        <RNPickerSelect
          onValueChange={setBabyAge}
          items={babyAges}
          placeholder={{ label: "아기 개월 수 선택", value: null }}
          style={pickerStyles}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleComplete}>
        <Text style={styles.next}>완료하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 30,
    justifyContent: "flex-end",
  },
  skip: {
    flexDirection: "row",
    position: "absolute",
    top: 90,
    right: 40,
  },
  inputlabel: {
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray0,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginBottom: 40,
  },
  next: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  button: {
    backgroundColor: colors.primary500,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 90,
    borderRadius: 12,
  },
});

const pickerStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    color: "black",
    paddingRight: 30, // to ensure the text is not obscured by the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0,
    color: "black",
    paddingRight: 30, // to ensure the text is not obscured by the icon
  },
};

export default Start4;
