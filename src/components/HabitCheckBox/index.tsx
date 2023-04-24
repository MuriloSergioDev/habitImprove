import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useContext } from "react";
import { Alert, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { db } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import { HabitoInterface } from "../../interface/interface";
import styles from "./styles";

type Props = {
  habito: HabitoInterface;
};

const HabitCheckBox = ({ habito }: Props) => {
  const { user, signed, logOut } = useContext(AuthContext);
  const [checked, setChecked] = React.useState(false);
  const hoje = new Date();
  const ontem = new Date(hoje);
  ontem.setDate(hoje.getDate() - 1);

  const startOfToday = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
    0,
    0,
    0
  );
  const endOfToday = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate(),
    23,
    59,
    59
  );

  const startOfYesterday = new Date(
    ontem.getFullYear(),
    ontem.getMonth(),
    ontem.getDate(),
    0,
    0,
    0
  );
  const endOfYesterday = new Date(
    ontem.getFullYear(),
    ontem.getMonth(),
    ontem.getDate(),
    23,
    59,
    59
  );

  let isUpdatedToday = false;
  let isUpdatedYesterday = false;
  if (habito.dataUltimaRealizacao != null) {
    habito.dataUltimaRealizacao = new Date(
      habito.dataUltimaRealizacao.seconds * 1000 +
        habito.dataUltimaRealizacao.nanoseconds / 1000000
    );
    isUpdatedYesterday =
      habito.dataUltimaRealizacao >= startOfYesterday &&
      habito.dataUltimaRealizacao <= endOfYesterday;
    isUpdatedToday =
      habito.dataUltimaRealizacao >= startOfToday &&
      habito.dataUltimaRealizacao <= endOfToday;
  }

  async function getRealization() {
    const realizationsCollection = collection(db, "realizations");

    const q = query(
      realizationsCollection,
      where("data", ">=", startOfToday),
      where("data", "<=", endOfToday),
      where("idHabito", "==", habito.id),
      where("idUsuario", "==", user?.uid)
    );
    const querySnapshot = await getDocs(q);
    let docRef = null;
    querySnapshot.forEach((doc) => {
      docRef = doc.id;
    });

    return docRef;
  }

  function getLastDayOfWeek(dayOfWeek: number) {
    const date = new Date();
    const lastDayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    let lastDay = lastDayOfMonth - ((date.getDay() - dayOfWeek + 7) % 7) - 7;
    if (lastDay < 1) {
      lastDay += 7;
    }
    return new Date(date.getFullYear(), date.getMonth(), lastDay);
  }

  function procuraUltimaRecorrencia(data: HabitoInterface) {
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

    let dia = "Domingo";
    if (data.diasDaSemana?.includes(dayOfWeek)) {
      const index = data.diasDaSemana.indexOf(dayOfWeek);
      if (data.diasDaSemana.length == 1) {
        dia = data.diasDaSemana[index];
      } else if (data.diasDaSemana.length > 1 && index == 0) {
        dia = data.diasDaSemana[data.diasDaSemana.length - 1];
      } else {
        dia = data.diasDaSemana[index - 1];
      }
    }
    const indexDiaSemana = daysOfWeek.indexOf(dia);
    return getLastDayOfWeek(indexDiaSemana);
  }

  async function atualizaHabito() {
    try {
      const docRef = doc(db, "habits", habito.id ?? "");
      let data = await getDoc(docRef).then((doc: any): HabitoInterface => {
        return doc.data();
      });
      data.contador = (parseInt(data.contador) + 1).toString();

      const ultimoDia = procuraUltimaRecorrencia(data);

      const startOfOcorrencia = new Date(
        ultimoDia.getFullYear(),
        ultimoDia.getMonth(),
        ultimoDia.getDate(),
        0,
        0,
        0
      );
      const endOfOcorrencia = new Date(
        ultimoDia.getFullYear(),
        ultimoDia.getMonth(),
        ultimoDia.getDate(),
        23,
        59,
        59
      );

      const dataMesPassado = new Date(hoje.getFullYear(), hoje.getMonth() - 1, hoje.getDate());

      const startOfDataMesPassado = new Date(
        ultimoDia.getFullYear(),
        ultimoDia.getMonth(),
        ultimoDia.getDate(),
        0,
        0,
        0
      );
      const endOfDataMesPassado = new Date(
        ultimoDia.getFullYear(),
        ultimoDia.getMonth(),
        ultimoDia.getDate(),
        23,
        59,
        59
      );

      console.log(dataMesPassado);

      data.dataUltimaRealizacao = new Date(
        data.dataUltimaRealizacao.seconds * 1000 +
          data.dataUltimaRealizacao.nanoseconds / 1000000
      );

      if (
        data.recorrencia == "d" &&
        !isUpdatedYesterday &&
        !isUpdatedYesterday
      ) {
        data.diasSeguidos = "0";
      } else if (
        data.recorrencia == "s" &&
        data.dataUltimaRealizacao != null &&
        (data.dataUltimaRealizacao < startOfOcorrencia ||
          data.dataUltimaRealizacao > endOfOcorrencia)
      ) {
        data.diasSeguidos = "0";
      }else if(data.recorrencia == 'm' &&
      data.dataUltimaRealizacao != null &&
      (data.dataUltimaRealizacao < startOfDataMesPassado ||
        data.dataUltimaRealizacao > endOfDataMesPassado)
      ){
        data.diasSeguidos = "0";
      } else {
        data.diasSeguidos = (parseInt(data.diasSeguidos) + 1).toString();
      }
      data.dataUltimaRealizacao = new Date();
      await setDoc(docRef, data);
    } catch (error) {
      console.log("Erro ao atualizar habito");
    }
  }

  async function handleCreateNewRealizacao() {
    try {
      const now = new Date();
      const docRef = await getRealization();
      const data = {
        data: now,
        idHabito: habito.id,
        idUsuario: user?.uid ?? "",
      };

      const dbRef = collection(db, "realizations");
      if (docRef != null) {
        const meuDocumentoRef = doc(dbRef, docRef); // obtendo a referência do documento "meuDocumento" na coleção "minhaColecao"
        await setDoc(meuDocumentoRef, data);
      } else {
        await addDoc(dbRef, data);
      }

      atualizaHabito();

      console.log("Realizacao criada com sucesso");
    } catch (error) {
      console.log("Erro ao criar realizacao");
      console.log(error);
      //alert(error)
    }
  }

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={styles.boxText}>
        <Text style={styles.text}>{habito.titulo}</Text>
        <Text style={styles.textTime}>Contador: {habito.contador}</Text>
      </View>
      <Checkbox
        status={checked || isUpdatedToday ? "checked" : "unchecked"}
        onPress={() => {
          if (!isUpdatedToday) {
            handleCreateNewRealizacao();
            setChecked(!checked);
          } else {
            Alert.alert(
              "Atenção",
              "Habito já foi realizado hoje",
              [{ text: "Ok", onPress: () => {} }],
              { cancelable: true }
            );
          }
        }}
      />
    </View>
  );
};

export default HabitCheckBox;
