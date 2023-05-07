import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Alert, Image, Text, View } from "react-native";
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
        const data = {
          idUsuario: reward.idUsuario,
          nome: reward.nome,
          preco: reward?.preco,
          resgatado: true,
        };
        await setDoc(meuDocumentoRef, data);
        atualizaPontuacao();
        setChecked(true);
        Alert.alert(
          "Sucesso",
          "Recompensa resgatada com sucesso",
          [{ text: "Ok", onPress: () => {} }],
          { cancelable: true }
        );
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

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Image
          style={styles.icon}
          source={require("../../../assets/moeda.png")}
        />
        <Text style={styles.price}>{reward.preco}</Text>
      </View>
      <Text style={styles.title}>{reward.nome}</Text>
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
