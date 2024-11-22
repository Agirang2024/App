import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import colors from "../../constants/colors";
import { useRouter } from "expo-router";

const MakeBooks = () => {
  const router = useRouter();

  // 상태 관리
  const [character, setCharacter] = useState(""); // 주인공 이름
  const [theme, setTheme] = useState(""); // 테마

  const handleSubmit = () => {
    if (!character.trim() || !theme) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    Alert.alert(
      "알림",
      "스토리를 만드는 데 2분 정도 소요될 수 있습니다. 잠시만 기다려 주세요..."
    );

    router.push({
      pathname: "/books/suspense",
      params: { character, theme },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <Text style={styles.back}>나가기</Text>
      </Pressable>
      <View>
        <Text style={styles.label}>주인공 이름이 무엇인가요?</Text>
        <TextInput
          style={styles.input}
          placeholder="ex)김아기"
          autoCapitalize="none"
          value={character}
          onChangeText={(text) => setCharacter(text.trim())} // onChange 핸들러
          autoCorrect={false}
          keyboardType="default"
        />
      </View>
      <View>
        <Text style={styles.label}>테마를 선택해주세요!</Text>
        <View style={styles.input}>
          <RNPickerSelect
            onValueChange={(value) => setTheme(value)} // onChange 핸들러
            items={[
              { label: "왕자/공주 이야기", value: "왕자/공주 이야기" },
              { label: "공룡 이야기", value: "공룡 이야기" },
              { label: "마법 이야기", value: "마법 이야기" },
              { label: "우주 이야기", value: "우주 이야기" },
            ]}
            placeholder={{ label: "테마를 선택하세요", value: null }}
            value={theme} // 선택된 값
          />
        </View>
      </View>
      <Pressable style={styles.makeStoryButton} onPress={handleSubmit}>
        <Text style={{ fontWeight: "700", fontSize: 18 }}>
          동화책 생성하기✨
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    rowGap: 40,
  },
  back: {
    color: colors.caution,
    alignSelf: "flex-end",
  },
  input: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray0,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  label: {
    fontWeight: "600",
    marginBottom: 10,
  },
  makeStoryButton: {
    width: 353,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary500,
    borderRadius: 24,
  },
});

export default MakeBooks;
