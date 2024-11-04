import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from "../../constants/colors";

export default function Home() {
  return (
    <View>
      <View style = {styles.titleField}>
        <Text style={styles.title}>HOME</Text>
      </View>

      <View style={styles.bannerField}>
        <View style={styles.banner}></View>
      </View>
      
      <View style = {styles.mainField}>
        <Text style = {styles.semiTitle}>
          새로 업데이트된 <br />
          출산 지원 정책을 확인해 보세요!
        </Text>

        
        <View style = {styles.policyBox}>
          <Text style = {styles.policyTitle}>정책 이름</Text>
          <Text>대상 : </Text>

          <View style ={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Text>지원 금액 : </Text>
            <Icon name="heart-o" size={20} color={colors.primary500} />
          </View>
        </View>


      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  titleField : {
    width : "100%",
    paddingTop : 24,
    paddingBottom : 24,
    paddingRight : 16,
    paddingLeft : 16 ,
  },

  title: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 24,
  },

  banner : {
    width : "100%",
    height : 100,
    backgroundColor : "gray",
  },

  bannerField : {
    width : "100%",
    paddingTop : 12,
    paddingBottom : 12,
  },

  mainField : {
    paddingRight : 16,
    paddingLeft : 16,
    gap : 20
  },

  semiTitle : {
    fontWeight : 500,
    fontSize : 18
  },

  policyBox : {
    width : "100%",
    height : 116,
    padding : 20,
    borderRadius : 12,
    border: "solid",
    borderColor : colors.gray0,
    justifyContent: "center"
  },

  policyTitle : {
    fontSize : 18,
    fontWeight : "bold",
    marginBottom : 7,
  }
});
