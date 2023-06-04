import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import RewardItem from "../../components/RewardItem";
import { db } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import { RewardsInterface } from "../../interface/interface";
import styles from "./styles";

const Recompensa = ({ route }: any) => {
  const navigation = useNavigation<any>();

  const { id } = route.params;
  const { user, signed, logOut } = useContext(AuthContext);
  const [rewards, setRewards] = useState<RewardsInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToCreateRecompensa() {
    navigation.navigate("CreateReward");
  }

  function getRewards() {
    const rewardsCollection = collection(db, "rewards");
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      query(rewardsCollection, where("idUsuario", "==", user?.uid)),
      (querySnapshot) => {
        let rewards: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          let prazoEncerrado = false;
          if(data.prazo != 0 ){
            const hoje = new Date();
            const dataCriacao =  new Date(
              data.dataCriacao.seconds * 1000 +
              data.dataCriacao.nanoseconds / 1000000
            );

            let dataCriacaoComPrazoAdd = new Date(
              data.dataCriacao.seconds * 1000 +
              data.dataCriacao.nanoseconds / 1000000
            );

            dataCriacaoComPrazoAdd.setDate(dataCriacaoComPrazoAdd.getDate() + parseInt(data.prazo));
            if (hoje.getTime() >= dataCriacaoComPrazoAdd.getTime()) {
              prazoEncerrado = true;
            }
          }

          if(!prazoEncerrado){
            rewards.push(data);
          }
        });

        rewards.sort((a, b) => a.preco - b.preco);
        setRewards(rewards);
        setIsLoading(false); // Set isLoading to false after loading the
      },
      (error) => {
        console.error("Error getting rewards: ", error);
      }
    );
    return unsubscribe;
  }

  useEffect(() => {
    const cancelarEscuta = getRewards();

    return () => {
      cancelarEscuta();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View style={styles.navUp}>
          <Feather
            name="arrow-left"
            size={30}
            color="white"
            onPress={() => {
              navigateBack();
            }}
          />
          <Text style={styles.navUpText}>Recompensas</Text>
          <Feather
            name="plus"
            size={30}
            color="white"
            onPress={() => {
              navigateToCreateRecompensa();
            }}
          />
        </View>
      </View>

      <View style={styles.navDown}>
        {/* @ts-ignore */}
        <View style={styles.containerSaldoFull}>
          <View style={styles.containerSaldo}>
            <Text style={styles.saldoText}>Saldo</Text>
            <Text style={styles.containerSaldo}>{user?.pontuacao}</Text>
          </View>
          <Image
              style={styles.iconCoin}
              source={require("../../../assets/moeda.png")}
          />
        </View>
        <ScrollView style={styles.scroll}>
          {isLoading ?
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" />
          </View>
          :
          (rewards.length > 0 ? rewards.map((item) => (
            <RewardItem key={item.id} reward={item} />
          )) :
            <Text style={styles.noContent}>Nenhuma recompensa cadastrada</Text>
          )}
          <View style={styles.endLine}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Recompensa;
