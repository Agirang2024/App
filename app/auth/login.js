import { Alert, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import colors from "../../constants/colors";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import client from "../../lib/api/client";
import { saveToken } from "../../lib/storage/asyncStorage";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("경고", "비어 있는 필드가 존재합니다.");
      return;
    }
    const res = await client.post("/auth/login", { email, password });
    if (res.status >= 200 && res.status < 300) {
      saveToken(res.data.access_token);
      router.push("/home");
    }
    if (res.status >= 400) {
      Alert.alert("경고", "이메일과 비밀번호를", "다시 한 번 확인해주세요");
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 32, fontWeight: "700", marginBottom: 40 }}>
        로그인
      </Text>

      <View style={{ width: 300 }}>
        <Text style={styles.inputlabel}>이메일</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력해주세요."
          autoCapitalize="none"
        />
      </View>
      <View style={{ width: 300 }}>
        <Text style={styles.inputlabel}>비밀번호</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="비밀번호를 입력해주세요."
          autoCapitalize="none"
        />
      </View>

      <CustomButton
        onPress={HandleLogin}
        buttonStyle={{ width: 300, height: 50 }}
      >
        로그인
      </CustomButton>
      <Text style={{ marginTop: 10 }}>
        계정이 없으신가요?{" "}
        <Text
          onPress={() => router.replace("/auth/register")}
          style={{ color: colors.primary500, fontWeight: "700" }}
        >
          회원가입 하기
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 20,
  },
});

export default LoginPage;
