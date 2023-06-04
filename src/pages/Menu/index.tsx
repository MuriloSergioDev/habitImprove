import { useNavigation } from "@react-navigation/native";
import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
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
  const [isLoading, setIsLoading] = useState(false);

  function navigateBack() {
    navigation.goBack();
  }

  async function handleSignOut() {
    await logOut();
  }

  function getHabits() {
    const habitsCollection = collection(db, "habits");
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      query(habitsCollection, where("uid", "==", user?.uid)),
      (querySnapshot) => {
        let habitos: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };

          const horario = new Date(
            data.horario.seconds * 1000 + data.horario.nanoseconds / 1000000
          );
          const hora = horario.getHours();
          let minuto = horario.getMinutes();

          if (minuto.valueOf() <= 10) {
            minuto = minuto.toString() + "0";
          }
          data.horario = `${hora}:${minuto}`;

          habitos.push(data);
        });
        const date = new Date();
        const daysOfWeek = [
          "Domingo",
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado",
        ];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();

        habitos = habitos.filter((habito) => {
          if (habito.recorrencia == "d") {
            return true;
          }

          if (
            habito.recorrencia == "s" &&
            habito.diasDaSemana.includes(dayOfWeek)
          ) {
            return true;
          }

          if (habito.recorrencia == "m" && habito.diaMes == dayOfMonth) {
            return true;
          }

          return false;
        });

        const powerups = habitos.filter((habito) => habito.powerup == true);

        habitos.sort(compararHorario);
        setHabitos(habitos);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error getting habits: ", error);
      }
    );
    return unsubscribe;
  }

  useEffect(() => {
    const cancelarEscuta = getHabits();

    return () => {
      cancelarEscuta();
    };
  }, []);

  function compararHorario(a: HabitoInterface, b: HabitoInterface) {
    const [horaA, minutoA] = a.horario.split(":");
    const [horaB, minutoB] = b.horario.split(":");

    if (horaA === horaB) {
      return minutoA - minutoB;
    }
    return horaA - horaB;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <LogoutModal
          visible={modalVisible}
          onLogoutPress={handleSignOut}
          onRequestClose={() => setModalVisible(false)}
        />
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
          <View style={styles.pontuacaoContainer}>
            <Text style={styles.placarBoxItem}>Pontuação</Text>
            <Text style={styles.placarBoxItem}>{user?.pontuacao}</Text>
            <Image
              style={styles.iconCoin}
              source={require("../../../assets/moeda.png")}
            />
          </View>
          <View style={styles.pontuacaoContainer}>
            <Text style={styles.placarBoxItem}>Hábitos </Text>
            <Text style={styles.placarBoxItem}>{habitos.length}</Text>
            <Image
              style={styles.iconCoin}
              source={require("../../../assets/list2.png")}
            />
          </View>
          <View style={styles.pontuacaoContainer}>
            <Text style={styles.placarBoxItem}>Bônus </Text>
            <Text style={styles.placarBoxItem}>x{user?.bonus}</Text>
            <Image
              style={styles.iconCoin}
              source={require("../../../assets/bonus.png")}
            />
          </View>
        </View>

        <View style={styles.contentBox}>
          <Text style={styles.contentBoxText}>Atividades próximas</Text>
          <ScrollView style={styles.scroll}>
            {isLoading ? (
              <View style={styles.spinnerContainer}>
                <ActivityIndicator size="large" />
              </View>
            ) : habitos.length > 0 ? (
              habitos.map((habito) => (
                <HabitCheckBox key={habito.id} habito={habito} />
              ))
            ) : (
              <Text style={styles.noContent}>
                Nenhuma recompensa cadastrada
              </Text>
            )}
            <View style={styles.endLine}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Menu;
