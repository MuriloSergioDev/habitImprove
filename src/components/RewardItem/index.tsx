import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { db } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import { RewardsInterface, UserInterface } from "../../interface/interface";
import styles from "./styles";

type Props = {
  reward: RewardsInterface;
};

const RewardItem = ({ reward }: Props) => {
  const { user, signed, logOut } = useContext(AuthContext);
  const [checked, setChecked] = React.useState(false);

  async function handleConsumePrize() {
    try {

      if (
        user?.pontuacao != undefined &&
        user?.pontuacao < parseFloat(reward.preco)
      ) {
        Alert.alert(
          "Atenção",
          "Você nao possui saldo",
          [{ text: "Ok", onPress: () => {} }],
          { cancelable: true }
        );
      } else {
        const dbRef = collection(db, "rewards");
        const meuDocumentoRef = doc(dbRef, reward.id);
        reward.resgatado = true;
        await setDoc(meuDocumentoRef, reward);
        atualizaPontuacao();
        setChecked(true);
        if (reward.surpresa) {
          Alert.alert(
            "Sucesso",
            `Recompensa resgatada com sucesso, sua recompensa é "${reward.nome}"`,
            [{ text: "Ok", onPress: () => {} }],
            { cancelable: true }
          );
        }else{
          Alert.alert(
            "Sucesso",
            "Recompensa resgatada com sucesso",
            [{ text: "Ok", onPress: () => {} }],
            { cancelable: true }
          );
        }
        console.log("Premio resgatado com sucesso");
      }
    } catch (error) {
      console.log("Erro ao resgatar premio");
      console.log(error);
      //alert(error)
    }
  }

  async function atualizaPontuacao() {
    try {
      const docRef = doc(db, "users", user?.uid ?? "");
      let data = await getDoc(docRef).then((doc: any): UserInterface => {
        return doc.data();
      });
      data.pontuacao = calculaPontuacao(reward);
      await setDoc(docRef, data);
    } catch (error) {
      console.log("Erro ao atualizar pontuacao");
      console.log(error);
    }
  }

  function calculaPontuacao(reward : RewardsInterface) {
    let pontuacao = user?.pontuacao;
    if(pontuacao){
      pontuacao = pontuacao - parseFloat(reward.preco);
    }
    return pontuacao;
  }

  const stylesIntern = StyleSheet.create({
    gold: {
      color: "#e4ab00",
    },
    black: {
      color: "black",
    },
    text: {
      width: 200,
      fontSize: 16,
      marginLeft: 20
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Image
          style={styles.icon}
          source={require("../../../assets/moeda.png")}
        />
        <Text style={styles.price}>{reward.preco}</Text>
      </View>
      <View>
      <Text style={
                reward.surpresa
                ? [stylesIntern.text, stylesIntern.gold]
                : [stylesIntern.text, stylesIntern.black]
              }>{reward.surpresa && reward.resgatado == false ? '🎁 Surpresa 🎁' : reward.nome}</Text>
      <Text style={stylesIntern.text}><Text style={styles.price}>Prazo:</Text> {reward.prazo != '0' && reward.prazo != null ? `${reward.prazo} dias` : 'Ilimitado'}</Text>
      </View>
      <Checkbox
        status={checked || reward.resgatado ? "checked" : "unchecked"}
        onPress={() => {
          if (!checked && !reward.resgatado) {
            handleConsumePrize();
          } else {
            Alert.alert(
              "Atenção",
              "Recompensa ja foi resgatada",
              [{ text: "Ok", onPress: () => {} }],
              { cancelable: true }
            );
          }
        }}
      />
    </View>
  );
};

export default RewardItem;
