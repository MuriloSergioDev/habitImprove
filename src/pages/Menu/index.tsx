import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HabitCheckBox from "../../components/HabitCheckBox";
import { auth } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import styles from "./styles";

const Menu = ({ route }) => {
  const navigation = useNavigation();

  const { user } = useContext(AuthContext);

  function navigateBack() {
    navigation.goBack();
  }

  function handleSignOut() {    
      signOut(auth)
      .then(() => {
        navigateBack();
      })
      .catch((error) => {});
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Text style={styles.text}>
            Olá <Text style={styles.textBlack}>{user.name}João</Text>
          </Text>
          <Image
            style={styles.icon}
            source={require("../../../assets/icon.png")}
          ></Image>
        </View>

        <View style={[styles.placarBox, styles.shadowProp]}>
          <View>
            <Text style={styles.placarBoxItem}>Pontuação</Text>
            <Text style={styles.placarBoxItem}>Hábitos</Text>
            <Text style={styles.placarBoxItem}>Sequência</Text>
          </View>
          <View>
            <Text style={styles.placarBoxItem}>
              1000 <AntDesign name="Trophy" size={20} color="black" />
            </Text>
            <Text style={styles.placarBoxItem}>2</Text>
            <Text style={styles.placarBoxItem}>16 dias</Text>
          </View>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.contentBoxText}>Atividades próximas</Text>
          <ScrollView style={styles.scroll}>
            <HabitCheckBox habitoNome="Acordar 5h" duracao="Indefinida"></HabitCheckBox>
            <HabitCheckBox habitoNome="Acordar 5h" duracao="Indefinida"></HabitCheckBox>
            <HabitCheckBox habitoNome="Acordar 5h" duracao="Indefinida"></HabitCheckBox>                 
            <View style={styles.endLine}></View>                               
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
