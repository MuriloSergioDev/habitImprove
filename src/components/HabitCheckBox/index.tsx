import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
import { db } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import { HabitoInterface, UserInterface } from "../../interface/interface";
import styles from "./styles";

type Props = {
  habito: HabitoInterface;
};

const HabitCheckBox = ({ habito }: Props) => {
  const navigation = useNavigation<any>();
  const { user, signed, logOut } = useContext(AuthContext);
  const [checked, setChecked] = React.useState(false);
  const [isUpdatedToday, setIsUpdatedToday] = React.useState(false);
  const [isUpdatedYesterday, setIsUpdatedYesterday] = React.useState(false);
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

  useEffect(() => {
    if (habito.dataUltimaRealizacao != null) {
      habito.dataUltimaRealizacao = new Date(
        habito.dataUltimaRealizacao.seconds * 1000 +
          habito.dataUltimaRealizacao.nanoseconds / 1000000
      );
      setIsUpdatedYesterday(
        habito.dataUltimaRealizacao >= startOfYesterday &&
          habito.dataUltimaRealizacao <= endOfYesterday
      );
      setIsUpdatedToday(
        habito.dataUltimaRealizacao >= startOfToday &&
          habito.dataUltimaRealizacao <= endOfToday
      );
    }
  }, []);

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
    const today = new Date();
    let lastDayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    let diff = lastDayDate.getDay() - dayOfWeek;
    if (diff < 0) diff += 7;
    lastDayDate.setDate(lastDayDate.getDate() - diff);
    if (lastDayDate > today) {
      lastDayDate.setDate(lastDayDate.getDate() - 7);
    }
    return lastDayDate;
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

      const ultimaOcorrencia = procuraUltimaRecorrencia(data);

      const startOfOcorrencia = new Date(
        ultimaOcorrencia.getFullYear(),
        ultimaOcorrencia.getMonth(),
        ultimaOcorrencia.getDate(),
        0,
        0,
        0
      );
      const endOfOcorrencia = new Date(
        ultimaOcorrencia.getFullYear(),
        ultimaOcorrencia.getMonth(),
        ultimaOcorrencia.getDate(),
        23,
        59,
        59
      );

      const dataMesPassado = new Date(
        hoje.getFullYear(),
        hoje.getMonth() - 1,
        hoje.getDate()
      );

      const startOfDataMesPassado = new Date(
        dataMesPassado.getFullYear(),
        dataMesPassado.getMonth(),
        dataMesPassado.getDate(),
        0,
        0,
        0
      );
      const endOfDataMesPassado = new Date(
        dataMesPassado.getFullYear(),
        dataMesPassado.getMonth(),
        dataMesPassado.getDate(),
        23,
        59,
        59
      );

      if (data.dataUltimaRealizacao != null) {
        data.dataUltimaRealizacao = new Date(
          data.dataUltimaRealizacao.seconds * 1000 +
            data.dataUltimaRealizacao.nanoseconds / 1000000
        );
      }

      if (
        data.recorrencia == "d" &&
        !isUpdatedYesterday &&
        !isUpdatedYesterday
      ) {
        verificaQuebraMetas(parseInt(data.diasSeguidos));
        data.diasSeguidos = "0";
      } else if (
        data.recorrencia == "s" &&
        data.dataUltimaRealizacao != null &&
        (data.dataUltimaRealizacao < startOfOcorrencia ||
          data.dataUltimaRealizacao > endOfOcorrencia)
      ) {
        verificaQuebraMetas(parseInt(data.diasSeguidos));
        data.diasSeguidos = "0";
      } else if (
        data.recorrencia == "m" &&
        data.dataUltimaRealizacao != null &&
        (data.dataUltimaRealizacao < startOfDataMesPassado ||
          data.dataUltimaRealizacao > endOfDataMesPassado)
      ) {
        verificaQuebraMetas(parseInt(data.diasSeguidos));
        data.diasSeguidos = "0";
      } else {
        data.diasSeguidos = (parseInt(data.diasSeguidos) + 1).toString();
        verificaMetas(parseInt(data.diasSeguidos));
      }
      data.dataUltimaRealizacao = new Date();
      await setDoc(docRef, data);
    } catch (error) {
      console.log("Erro ao atualizar habito");
      console.log(error);
    }
  }

  async function atualizaPontuacaoAndBonus() {
    try {
      const docRef = doc(db, "users", user?.uid ?? "");
      let data = await getDoc(docRef).then((doc: any): UserInterface => {
        return doc.data();
      });
      data.pontuacao = calculaPontuacao(habito);
      data.bonus = calculaBonus();
      await setDoc(docRef, data);
    } catch (error) {
      console.log("Erro ao atualizar pontuacao");
      console.log(error);
    }
  }

  function calculaPontuacao(habito: HabitoInterface) {
    let pontuacao = 0;
    if (user) {
      pontuacao = user.pontuacao;
      pontuacao =
        pontuacao +
        (1 + 0.25 * parseInt(habito.diasSeguidos ?? 0)) * user.bonus;
    }
    return pontuacao;
  }

  function verificaMetas(diasSeguidos: number) {
    if (habito.metas?.includes(diasSeguidos.toString())) {
      handleCreateNewNews(
        "p",
        `${user?.name} completou ${diasSeguidos} realizações: ${habito.titulo}`
      );
    }
    // if(habito.recorrencia == 'd'){

    //   if(diasSeguidos == 7 || diasSeguidos == 30 || diasSeguidos == 60 || diasSeguidos == 90 || diasSeguidos == 120){
    //     handleCreateNewNews('p', `${user?.name} completou ${diasSeguidos} realizações: ${habito.titulo}`);
    //   }

    // } else if(habito.recorrencia == 's'){

    //   if(diasSeguidos == 10 || diasSeguidos == 20 || diasSeguidos == 40 || diasSeguidos == 60 || diasSeguidos == 80){
    //     handleCreateNewNews('p', `${user?.name} completou ${diasSeguidos} realizações: ${habito.titulo}`);
    //   }

    // }else{
    //   if(diasSeguidos == 1 || diasSeguidos == 4 || diasSeguidos == 7 || diasSeguidos == 10 || diasSeguidos == 12){
    //     handleCreateNewNews('p', `${user?.name} completou ${diasSeguidos} realizações: ${habito.titulo}`);
    //   }
    // }
  }

  function verificaQuebraMetas(diasSeguidos: number) {
    if (diasSeguidos > 7) {
      handleCreateNewNews(
        "n",
        `${user?.name} encerrou ${diasSeguidos} realizações: ${habito.titulo}`
      );
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
      atualizaPontuacaoAndBonus();
      setIsUpdatedToday(true);
      console.log("Realizacao criada com sucesso");
    } catch (error) {
      console.log("Erro ao criar realizacao");
      console.log(error);
      //alert(error)
    }
  }

  async function handleCreateNewNews(tipo: string, descricao: string) {
    try {
      const now = new Date();
      const data = {
        dataCriacao: now,
        idHabito: habito.id,
        idUsuario: user?.uid ?? "",
        comentarios: 0,
        reacoes: 0,
        tipo: tipo,
        descricao: descricao,
      };

      const dbRef = collection(db, "news");
      await addDoc(dbRef, data);

      console.log("News criada com sucesso");
    } catch (error) {
      console.log("Erro ao criar news");
      console.log(error);
      //alert(error)
    }
  }

  function calculaBonus() {
    let bonus = user?.bonus ?? 1;
    if (habito.powerup) {
      bonus = parseFloat((bonus + 0.05).toFixed(2));
    }
    return bonus;
  }

  function handleHabitoDelete() {
    console.log("deletar aluno");

    // Works on both Android and iOS
    Alert.alert(
      "Deseja mesmo excluir o hábito?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const docRef = doc(db, "habits", habito.id ?? "");
            await deleteDoc(docRef)
              .then(() => {
                console.log("Document successfully deleted!");
                Alert.alert(
                  "Sucesso",
                  `Hábito excluido com sucesso`,
                  [{ text: "Ok", onPress: () => {} }],
                  { cancelable: true }
                );
              })
              .catch((error) => {
                console.error("Error deleting document:", error);
                Alert.alert(
                  "Erro",
                  `Erro ao excluir hábito`,
                  [{ text: "Ok", onPress: () => {} }],
                  { cancelable: true }
                );
              });
          },
        },
      ],
      { cancelable: false }
    );
  }

  function handleHabitoEdit() {
    navigation.navigate("EditHabit", {
      habit: habito,
    });
  }

  function rightActions(progress: any, dragX: any) {
    return (
      <View style={styles.boxAction}>
        <TouchableOpacity
          onPress={() => {
            handleHabitoDelete();
          }}
        >
          <View style={styles.deleteAction}>
            <Text style={styles.textAction}>Excluir</Text>
            <Feather name="trash-2" size={20} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handleHabitoEdit();
          }}
        >
          <View style={styles.editAction}>
            <Text style={styles.textAction}>Editar</Text>
            <AntDesign name="edit" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Swipeable renderLeftActions={rightActions} overshootLeft={false}>
      <View style={styles.containerTeste}>
        <View
          style={
            habito.powerup
              ? [styles.container, styles.shadowProp, styles.containerPower]
              : [styles.container, styles.shadowProp, styles.containerNotPower]
          }
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Goals", {
                habito: habito,
              });
            }}
          >
            <View style={styles.boxText}>
              <Text style={styles.text}>{habito.titulo}</Text>
              <View style={styles.boxTextItem}>
                <Text style={styles.textTime}>Contador: {habito.contador}</Text>
                <Text style={styles.textTime}>
                  Sequência: {habito.diasSeguidos}
                </Text>
                <Text style={styles.textTime}>Horário: {habito.horario}</Text>
              </View>
            </View>
          </TouchableOpacity>

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
      </View>
    </Swipeable>
  );
};

export default HabitCheckBox;
