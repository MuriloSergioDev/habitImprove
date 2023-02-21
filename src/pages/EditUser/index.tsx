import { AntDesign, Entypo, Feather, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import AlertModal from "../../components/AlertModal";
import { auth, db } from "../../config/Firebase";
import { UserInterface } from "../../interface/interface";
import styles from "./styles";
type Props = {};

const EditUser = ({}: Props) => {
  const navigation = useNavigation();
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const turmasTemp = [];
  const [turmas, setTurmas] = useState([]);
  let userTemp: UserInterface = {};
  const [user, setUser] = useState<UserInterface>({
    name: "",
    email: "",
    password: "",
    turma: "",
    permission: 1,
  });

  useEffect(() => {
    getTurmas();
    getUser();
  }, []);

  async function getTurmas() {
    // try {
    //     const data = await db
    //         .collection('turmas')
    //         .where('status', '==', true)
    //         .get()
    //     data.forEach((doc) => {
    //         const turma = {
    //             value: doc.get("title"),
    //             label: doc.get("title"),
    //         }
    //         //console.log(turma)
    //         turmasTemp.push(turma)
    //     })
    //     setTurmas(turmasTemp)
    // }
    // catch (error) {
    //     alert(error)
    // }
  }

  function navigateBack() {
    navigation.goBack();
  }

  async function getUser() {
    try {
      const docRef = doc(db, "users", auth.currentUser?.uid ?? "");
      const data = await getDoc(docRef);

      if (data.exists()) {
        console.log(data.data());
        const values = {
          uid: data.get("uid"),
          name: data.get("name"),
          turma: data.get("turma"),
          permission: data.get("permission"),
        };
        userTemp = values;
        setUser(userTemp);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      alert(error);
    }
  }

  async function handleUpdateUser() {
    try {
      const data = {
        name: user.name,
        turma: user.turma,
        password: user.password,
      };

      if (
        (user.name && user.turma && user.password) ||
        (user.name && user.password && user.permission === 0)
      ) {
        var currentUser = firebase.auth().currentUser;
        currentUser
          .updatePassword(user.password)
          .then(function () {
            db.collection("users").doc(user.uid).update(data);
            setMessageAlert("Informações alteradas com sucesso");
            setModalAlertVisible(true);
          })
          .catch(function (error) {
            setMessageAlert("Erro ao alterar usuario");
            setModalAlertVisible(true);
          });
      } else {
        setMessageAlert("Preencha todos os campos");
        setModalAlertVisible(true);
      }
    } catch (error) {
      setMessageAlert("Erro ao alterar usuario");
      setModalAlertVisible(true);
      //alert(error)
    }
  }

  let modalIcon =
    messageAlert == "Informações alteradas com sucesso" ? (
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
          <Image
            style={styles.logo}
            source={require("../../../assets/logoalt.png")}
          ></Image>
          <Entypo
            name="save"
            size={30}
            color="white"
            onPress={() => {
              handleUpdateUser();
            }}
          />
        </View>
      </View>

      <AlertModal
        header={messageAlert}
        comfirmationString="Ok"
        isVisible={modalAlertVisible}
        close={() => {
          setModalAlertVisible(false);
          if (messageAlert == "Informações alteradas com sucesso") {
            navigateBack();
          }
        }}
      >
        {modalIcon}
      </AlertModal>

      <View style={styles.inputBox}>
        {/* @ts-ignore */}
        <TextInput
          theme={{
            colors: {
              placeholder: "#6556A0",
              text: "#6556A0",
              primary: "#6556A0",
            },
          }}
          style={styles.input}
          mode="flat"
          label="Nome"
          value={user.name}
          onChangeText={(value) =>
            setUser((prevState) => {
              return { ...prevState, name: value };
            })
          }
        />
      </View>

      <View style={styles.inputBox}>
        {/* @ts-ignore */}
        <TextInput
          theme={{
            colors: {
              placeholder: "#6556A0",
              text: "#6556A0",
              primary: "#6556A0",
            },
          }}
          style={styles.input}
          secureTextEntry={true}
          mode="flat"
          label="Senha"
          value={user.password}
          onChangeText={(value) =>
            setUser((prevState) => {
              return { ...prevState, password: value };
            })
          }
        />
      </View>

      {user.name != "" ? (
        user.permission === 1 ? (
          <View style={styles.inputBoxSelect}>
            {/* <RNPickerSelect
              placeholder={{ label: "Selecione uma turma", value: null }}
              value={user.turma}
              onValueChange={(value) =>
                setUser((prevState) => {
                  return { ...prevState, turma: value };
                })
              }
              items={turmas}
              style={pickerSelectStyles}
            /> */}
          </View>
        ) : null
      ) : (
        <ActivityIndicator animating={true} color="#6556A0" size={50} />
      )}
    </View>
  );
};

export default EditUser;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
