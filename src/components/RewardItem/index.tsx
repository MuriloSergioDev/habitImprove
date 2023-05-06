import { collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { Alert, Image, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { db } from "../../config/Firebase";
import { RewardsInterface } from "../../interface/interface";
import styles from "./styles";

type Props = {
  reward: RewardsInterface;
};

const RewardItem = ({ reward }: Props) => {
  const [checked, setChecked] = React.useState(false);

  async function handleConsumePrize() {
    try {
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
      console.log("Premio resgatado com sucesso");
    } catch (error) {
      console.log("Erro ao resgatar premio");
      console.log(error);
      //alert(error)
    }
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
        status={checked || reward.resgatado  ? "checked" : "unchecked"}
        onPress={() => {
          if (!checked && !reward.resgatado) {
            handleConsumePrize();
            setChecked(true);
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
