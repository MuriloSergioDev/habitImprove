import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { db } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import {
  HabitoInterface,
  RealizationsInterface,
} from "../../interface/interface";
import styles from "./styles";

const Estatisticas = ({ route }: any) => {
  const navigation = useNavigation<any>();

  const { id } = route.params;
  const { user, signed, logOut } = useContext(AuthContext);
  const [habitos, setHabitos] = useState<HabitoInterface[]>([]);
  const [aproveitamento, setAproveitamento] = useState<number>(0);
  const [msgAproveitamento, setMsgAproveitamento] = useState<string>("");
  const [markedDates, setMarkedDates] = useState({});
  const [habito, setHabito] = useState<HabitoInterface>({
    titulo: "",
    horario: new Date(),
    recorrencia: "d",
    diasDaSemana: [],
    contador: "0",
    diasSeguidos: "0",
  });

  const [selectedDate, setSelectedDate] = useState("");

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
  };

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToCreateRecompensa() {
    navigation.navigate("CreateReward");
  }

  function getHabits() {
    const habitsCollection = collection(db, "habits");
    const unsubscribe = onSnapshot(
      query(habitsCollection, where("uid", "==", user?.uid)),
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
        const daysOfWeek = [
          "Domingo",
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado",
        ];
        setHabito(habitos[0]);
        setHabitos(habitos);
      },
      (error) => {
        console.error("Error getting habits: ", error);
      }
    );
    return unsubscribe;
  }

  function getHabitRealizations() {
    const habitsRealizationsCollection = collection(db, "realizations");
    const unsubscribe = onSnapshot(
      query(
        habitsRealizationsCollection,
        where("idUsuario", "==", user?.uid),
        where("idHabito", "==", habito.id)
      ),
      (querySnapshot) => {
        let realizations: any[] = [];
        querySnapshot.forEach((doc: RealizationsInterface) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          const realization = (data.data = new Date(
            data.data.seconds * 1000 + data.data.nanoseconds / 1000000
          ));
          const formattedDate = `${realization.getFullYear()}-${(
            "0" +
            (realization.getMonth() + 1)
          ).slice(-2)}-${("0" + realization.getDate()).slice(-2)}`;
          realizations.push(formattedDate);
        });
        const dataCriacao = new Date(
          habito.dataCriacao.seconds * 1000 +
            habito.dataCriacao.nanoseconds / 1000000
        );
        const endDate = new Date();
        let datasNaoRealizadas: any[] = [];
        if (habito.recorrencia == "d") {
          datasNaoRealizadas = getOccurrencesBetween(
            dataCriacao.toISOString().slice(0, 10),
            endDate.toISOString().slice(0, 10),
            realizations
          );
        } else if (habito.recorrencia == "s") {
          const selectedDaysIndexes = getSelectedDaysOfWeek(
            habito.diasDaSemana ?? []
          );
          datasNaoRealizadas = getOccurrencesBetween(
            dataCriacao.toISOString().slice(0, 10),
            endDate.toISOString().slice(0, 10),
            realizations,
            selectedDaysIndexes
          );
        } else {
          datasNaoRealizadas = getLastOccurrencesOfMonth(
            dataCriacao.toISOString().slice(0, 10),
            habito.diaMes ?? 1,
            realizations
          );
        }

        console.log(datasNaoRealizadas);

        const markedDates = {
          ...retornaDatasRealizadas(realizations),
          ...retornaDatasNaoRealizadas(datasNaoRealizadas),
        };

        const markedDatesObject = markedDates;
        let aprv = parseFloat(
          (
            (realizations.length /
              (realizations.length + datasNaoRealizadas.length)) *
            100
          ).toFixed(2)
        );

        setAproveitamento(aprv);
        if (aprv >= 75) {
          setMsgAproveitamento("Otimo");
        } else if (aprv >= 50 && aprv < 75) {
          setMsgAproveitamento("Bom");
        } else {
          setMsgAproveitamento("Precisa melhorar");
        }
        setMarkedDates(markedDatesObject);
      },
      (error) => {
        console.error("Error getting realizations: ", error);
      }
    );
    return unsubscribe;
  }

  function getSelectedDaysOfWeek(daysOfWeek: string[]): number[] {
    const selectedDaysOfWeek = [];

    for (let i = 0; i < daysOfWeek.length; i++) {
      const dayOfWeek = daysOfWeek[i];
      const index = [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ].indexOf(dayOfWeek);
      if (index !== -1) {
        selectedDaysOfWeek.push(index);
      }
    }

    return selectedDaysOfWeek;
  }

  function retornaDatasRealizadas(datas: any[]) {
    const markedDatesObject = datas.reduce((acc, date) => {
      return {
        ...acc,
        [date]: {
          selected: true,
          marked: true,
          dotColor: "green",
          selectedColor: "green",
        },
      };
    }, {});

    return markedDatesObject;
  }

  function retornaDatasNaoRealizadas(datas: any[]) {
    const markedDatesObject = datas.reduce((acc, date) => {
      return {
        ...acc,
        [date]: {
          selected: true,
          marked: true,
          dotColor: "red",
          selectedColor: "red",
        },
      };
    }, {});

    return markedDatesObject;
  }

  function getOccurrencesBetween(
    startDate: string,
    endDate: string,
    excludeDates: string[] = [],
    weekDays: number[] = [0, 1, 2, 3, 4, 5, 6]
  ): string[] {
    const occurrences: string[] = [];
    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate <= new Date(endDate)) {
      const currentDayOfWeek = currentDate.getDay(); // 0 = domingo, 1 = segunda, ..., 6 = sábado
      const currentDateFormatted = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      if (
        weekDays.includes(currentDayOfWeek) &&
        !excludeDates.includes(currentDateFormatted)
      ) {
        occurrences.push(currentDateFormatted);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return occurrences;
  }

  function getLastOccurrencesOfMonth(
    startDate: string,
    dayOfMonth: number,
    excludeDates: string[] = []
  ): string[] {
    const lastOccurrences: string[] = [];
    const currentDate = new Date();
    const start = new Date(startDate);
    const currentMonth = currentDate.getMonth();

    // retrocede do mês atual até o mês em que a data de início está
    while (currentDate >= start) {
      const currentMonth = currentDate.getMonth();
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentMonth + 1,
        0
      ).getDate();

      // verifica se o dia do mês desejado está dentro do mês atual
      if (dayOfMonth <= lastDayOfMonth) {
        const occurrenceDate = new Date(
          currentDate.getFullYear(),
          currentMonth,
          dayOfMonth
        );
        const occurrenceDateString = formatDate(occurrenceDate);

        // adiciona a data se não estiver na lista de exclusões
        if (!excludeDates.includes(occurrenceDateString)) {
          lastOccurrences.push(occurrenceDateString);
        }
      }

      // retrocede um mês
      currentDate.setMonth(currentMonth - 1, 1);
    }

    return lastOccurrences;
  }

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const cancelarEscuta = getHabits();

    return () => {
      cancelarEscuta();
    };
  }, []);

  useEffect(() => {
    if (habito.id != undefined) {
      const cancelarEscuta = getHabitRealizations();

      return () => {
        cancelarEscuta();
      };
    }
  }, [habito]);

  const stylesIntern = StyleSheet.create({
    green: {
      color: "#1D6A02",
    },
    blue: {
      color: "rgb(4, 108, 188)",
    },
    red: {
      color: "rgb(188, 4, 4)",
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });

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
          <Text style={styles.navUpText}>Estatisticas</Text>
        </View>
      </View>

      <View style={styles.navDown}>
        {/* @ts-ignore */}
        <View style={styles.containerSaldoFull}>
          <View style={styles.containerSaldo}>
            <Text style={styles.saldoText}>Resumo de realizacões</Text>
            <Picker
              selectedValue={habito.id}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue) => {
                const habitoSelecionado = habitos.filter(
                  (item) => item.id == itemValue
                );
                setHabito(habitoSelecionado[0]);
              }}
            >
              {habitos.map((habito) => (
                <Picker.Item
                  label={habito.titulo}
                  value={habito.id}
                  key={habito.id}
                />
              ))}
            </Picker>
          </View>
        </View>
        <ScrollView style={styles.scroll}>
          <Calendar
            style={styles.calendario}
            onDayPress={handleDayPress}
            markedDates={markedDates}
          />
          <View style={[styles.containerAproveitamento, styles.shadowProp]}>
            <Text style={styles.txtAproveitamento}>Aproveitamento</Text>
            <Text
              style={
                aproveitamento >= 75
                  ? [stylesIntern.text, stylesIntern.blue]
                  : aproveitamento >= 50 && aproveitamento < 75
                  ? [stylesIntern.text, stylesIntern.green]
                  : [stylesIntern.text, stylesIntern.red]
              }
            >
              {aproveitamento}%
            </Text>
            <Text style={styles.txtAproveitamentoResult}>
              {msgAproveitamento}
            </Text>
          </View>
          <View style={styles.endLine}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Estatisticas;
