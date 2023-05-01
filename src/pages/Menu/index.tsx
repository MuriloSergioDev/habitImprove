import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HabitCheckBox from "../../components/HabitCheckBox";
import LogoutModal from "../../components/LogoutModal";
import { db } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import { HabitoInterface } from "../../interface/interface";
import styles from "./styles";

const Menu = ({ route }: any) => {
  const navigation = useNavigation<any>();

  const { user, signed, logOut } = useContext(AuthContext);
  const [habitos, setHabitos] = useState<HabitoInterface[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);

  function navigateBack() {
    navigation.goBack();
  }

  async function handleSignOut() {
    await logOut();
  }

  function getHabits() {
    const habitsCollection = collection(db, "habits");
    const unsubscribe = onSnapshot(
      habitsCollection,
      (querySnapshot) => {
        let habitos: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };

          habitos.push(data);
        });
        const date = new Date();
        const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();
        calculaPontuacao(habitos);
        habitos = habitos.filter((habito)=>{
          if(habito.recorrencia == 'd'){
            return true;
          }

          if(habito.recorrencia == 's' && habito.diasDaSemana.includes(dayOfWeek)){
            return true;
          }

          if(habito.recorrencia == 'm' && habito.diaMes == dayOfMonth){
            return true;
          }

          return false;
        })
        setHabitos(habitos);
      },
      (error) => {
        console.error("Error getting habits: ", error);
      }
    );
    return unsubscribe;
  }

  function calculaPontuacao(habitos : HabitoInterface[]) {
    let pontuacao = 0;
    habitos.forEach((habito: HabitoInterface)=>{
      pontuacao = pontuacao + (parseInt(habito.contador ?? 0) * parseInt(habito.diasSeguidos ?? 0));
    })

    setPontuacao(pontuacao);
  }

  useEffect(() => {
    const cancelarEscuta = getHabits();

    return () => {
      cancelarEscuta();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <LogoutModal visible={modalVisible} onLogoutPress={handleSignOut} onRequestClose={() => setModalVisible(false)}/>
        <View style={styles.nav}>
          <Text style={styles.text}>
            Olá <Text style={styles.textBlack}>{user?.name}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Image
              style={styles.icon}
              source={require("../../../assets/icon.png")}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={[styles.placarBox, styles.shadowProp]}>
          <View>
            <Text style={styles.placarBoxItem}>Pontuação</Text>
            <Text style={styles.placarBoxItem}>Hábitos</Text>
            <Text style={styles.placarBoxItem}>Bônus</Text>
          </View>
          <View>
            <Text style={styles.placarBoxItem}>
              {pontuacao} <AntDesign name="Trophy" size={20} color="black" />
            </Text>
            <Text style={styles.placarBoxItem}>{habitos.length}</Text>
            <Text style={styles.placarBoxItem}>x1</Text>
          </View>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.contentBoxText}>Atividades próximas</Text>
          <ScrollView style={styles.scroll}>
            {habitos.map((habito) => (
              <HabitCheckBox
                key={habito.id}
                habito={habito}
              />
            ))}
            <View style={styles.endLine}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
