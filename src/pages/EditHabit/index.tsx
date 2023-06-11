import { AntDesign, Feather, Foundation } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Checkbox, Divider, TextInput } from "react-native-paper";
import AlertModal from "../../components/AlertModal";
import Button from "../../components/Button";
import { db } from '../../config/Firebase';
import AuthContext from "../../context/auth";
import { HabitoInterface } from "../../interface/interface";
import styles from "./styles";


const EditHabit = ({route}: any) => {
  const navigation = useNavigation<any>();

  const { habit } = route.params
  const { user, signed, logOut } = useContext(AuthContext);
  const [messageAlert, setMessageAlert] = useState("");
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  let dataHorario = new Date();
  const horaMinuto = habit.horario.split(":");
  dataHorario.setHours(horaMinuto[0]);
  dataHorario.setMinutes(horaMinuto[1]);
  const [habito, setHabito] = useState<HabitoInterface>({
    titulo: habit.titulo ?? "",
    horario: dataHorario,
    recorrencia: habit.recorrencia ?? "d",
    diasDaSemana: habit.diasDaSemana ?? [],
    contador: habit.contador ?? "0",
    diasSeguidos: habit.diasSeguidos ?? "0",
    diaMes: habit.diaMes ?? "",
  });

  const days = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));
  const filteredDays = days.filter((day) => parseInt(day.value) <= 28);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showTime, setShowTime] = useState(true);
  const [daysOfWeek, setDaysOfWeek] = useState([
    { name: "Domingo", selected: false },
    { name: "Segunda", selected: false },
    { name: "Terça", selected: false },
    { name: "Quarta", selected: false },
    { name: "Quinta", selected: false },
    { name: "Sexta", selected: false },
    { name: "Sábado", selected: false },
  ]);

  const onChangeTime = (event: any, selectedTime: Date) => {
    const currentTime = selectedTime || habito.horario;

    setShowTime(true);
    setHabito((prevState) => {
      return { ...prevState, horario: currentTime };
    });
    setShowTimePicker(false);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToMenu() {
    navigation.navigate("Menu");
  }

  useEffect(() => {
    function handleDaysOfWeekChange(newDaysOfWeek: any[]) {
      let diaSemana: string[] = [];
      newDaysOfWeek.map((day) => {
        if (day.selected == true) {
          diaSemana.push(day.name);
        }
      });

      setHabito((prevState) => {
        return { ...prevState, diasDaSemana: diaSemana };
      });

    }

    handleDaysOfWeekChange(daysOfWeek);
  }, [daysOfWeek]);

  async function handleUpdateHabito() {
    try {
      if (habito.titulo) {

        await atualizaHabito();

        setMessageAlert("Hábito atualizado com sucesso");
        setModalAlertVisible(true);
      } else {
        setMessageAlert("Preencha todos os campos");
        setModalAlertVisible(true);
      }
    } catch (error) {
      setMessageAlert("Erro ao atualizar hábito");
      setModalAlertVisible(true);
      console.log(error);

      //alert(error)
    }
  }

  async function atualizaHabito() {
    try {
      const docRef = doc(db, "habits", habit.id ?? "");
      let data = await getDoc(docRef).then((doc: any): HabitoInterface => {
        return doc.data();
      });

      data.titulo = habito.titulo;
      data.horario = habito.horario;
      data.recorrencia = habito.recorrencia;
      data.diasDaSemana = habito.diasDaSemana;
      data.diaMes = habito.diaMes;

      await setDoc(docRef, data);
    } catch (error) {
      console.log("Erro ao atualizar habito");
      console.log(error);
    }
  }

  let modalIcon =
    messageAlert == "Hábito atualizado com sucesso" ? (
      <AntDesign name="checkcircle" size={24} color="green" />
    ) : (
      <Foundation name="alert" size={24} color="#e6d927" />
    );

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
          <Text style={styles.navUpText}>Editar Hábito</Text>
        </View>
      </View>

      <AlertModal
        header={messageAlert}
        comfirmationString="Ok"
        isVisible={modalAlertVisible}
        close={() => {
          setModalAlertVisible(false);
          if (messageAlert == "Hábito atualizado com sucesso") {
            navigateToMenu();
          }
        }}
      >
        {modalIcon}
      </AlertModal>

      <View style={styles.navDown}>
        {/* @ts-ignore */}
        <TextInput
          theme={{
            colors: {
              placeholder: "#FE9D2A",
              text: "#c0c2c4",
              primary: "#c0c2c4",
              outline: "#c0c2c4",
            },
            roundness: 10,
          }}
          style={styles.input}
          mode="outlined"
          placeholder="Título"
          value={habito.titulo}
          onChangeText={(value) =>
            setHabito((prevState) => {
              return { ...prevState, titulo: value };
            })
          }
        />
        <View style={styles.boxRow}>
          <View style={styles.boxRep}>
            <Text>Horário:</Text>
            <TouchableOpacity onPress={showTimepicker}>
              {showTime ? (
                <Text>
                  {habito.horario.toLocaleTimeString().substring(0, 5)}
                </Text>
              ) : (
                <Text>Escolha um horário</Text>
              )}
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                testID="timePicker"
                value={habito.horario}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            )}
          </View>
          <View style={styles.boxRep}>
            <Text>Recorrência:</Text>
            <Picker
              selectedValue={habito.recorrencia}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                setHabito((prevState) => {
                  return { ...prevState, recorrencia: itemValue };
                })
              }
            >
              <Picker.Item label="Diária" value="d" />
              <Picker.Item label="Semanal" value="s" />
              <Picker.Item label="Mensal" value="m" />
            </Picker>
          </View>
          {habito.recorrencia == "m" ? (
            <View style={styles.boxRep}>
              <Text>Dia do mês:</Text>
              <Picker
                selectedValue={habito.diaMes}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) =>
                  setHabito((prevState) => {
                    return { ...prevState, diaMes: itemValue };
                  })
                }
              >
                {filteredDays.map((day, index) => (
                  <Picker.Item
                    key={index}
                    label={day.label}
                    value={day.value}
                  />
                ))}
              </Picker>
            </View>
          ) : null}
          {habito.recorrencia == "s" ? (
            <View style={styles.boxRep}>
              <View>
                {daysOfWeek.map((day, index) => (
                  <View key={index}>
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        status={day.selected ? "checked" : "unchecked"}
                        onPress={() => {
                          const updatedDaysOfWeek = [...daysOfWeek];
                          updatedDaysOfWeek[index] = {
                            ...day,
                            selected: !day.selected,
                          };
                          setDaysOfWeek(updatedDaysOfWeek);
                        }}
                      />
                      <Text style={styles.label}>{day.name}</Text>
                    </View>
                    <Divider />
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
        <Button
          color="#FE9D2A"
          underlayColor="#e69026"
          textColor="white"
          label="Salvar"
          onPress={() => {
            handleUpdateHabito();
          }}
        ></Button>
      </View>
    </View>
  );
};

export default EditHabit;
