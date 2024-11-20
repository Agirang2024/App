import { Alert, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import colors from "../../constants/colors";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import client from "../../lib/api/client";
import { saveToken } from "../../lib/storage/asyncStorage";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const HandleRegister = async () => {
    if (email === "" || password === "" || confirm === "") {
      Alert.alert("경고", "비어 있는 필드가 존재합니다.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("경고", "비밀번호와 확인 필드를", "다시 한번 확인해주세요");
      return;
    }
    const res = await client.post("/auth/register", { email, password });
    if (res.data) {
      saveToken(res.data.access_token);
      router.push("/start3");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 32, fontWeight: "700", marginBottom: 40 }}>
        회원가입
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
      <View style={{ width: 300 }}>
        <Text style={styles.inputlabel}>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          autoCapitalize="none"
        />
      </View>
      <CustomButton
        onPress={HandleRegister}
        buttonStyle={{ width: 300, height: 50 }}
      >
        회원가입
      </CustomButton>
      <Text style={{ marginTop: 10 }}>
        이미 계정이 있으신가요?{" "}
        <Text
          onPress={() => router.replace("/auth/login")}
          style={{ color: colors.primary500, fontWeight: "700" }}
        >
          로그인 하기
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

export default RegisterPage;
