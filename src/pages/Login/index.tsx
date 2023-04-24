import { AntDesign, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import AlertModal from "../../components/AlertModal";
import Button from "../../components/Button";
import AuthContext from "../../context/auth";
import styles from "./styles";

type Props = {};

const Login = ({}: Props) => {
  const { signed, signIn } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigation<any>();
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToRecoverPassword() {
    navigation.navigate("Profile");
  }

  async function handleLogin() {
    const response = await signIn(user.email, user.password);
    if (response == 'Seu email ainda não foi verificado') {
      setMessageAlert(response);
      setModalAlertVisible(true);
    }

  }

  let modalIcon =
    messageAlert == " " ? (
      <AntDesign name="checkcircle" size={24} color="green" />
    ) : (
      <Foundation name="alert" size={24} color="#e6d927" />
    );

  return (
    <View style={styles.container}>
      <AlertModal
        header={messageAlert}
        comfirmationString="Ok"
        isVisible={modalAlertVisible}
        close={() => {
          setModalAlertVisible(false);
          if (messageAlert == "Cadastro realizado com sucesso") {
            navigateBack();
          }
        }}
      >
        <Foundation name="alert" size={24} color="#e6d927" />
      </AlertModal>
      <Image
        style={styles.logo}
        source={require("../../../assets/logo.png")}
      ></Image>
      <View>
        <AlertModal
          header={messageAlert}
          comfirmationString="Ok"
          isVisible={modalAlertVisible}
          close={() => {
            setModalAlertVisible(false);
          }}
        >
          {modalIcon}
        </AlertModal>

        <View style={styles.inputBox}>
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
            placeholder="Email"
            value={user.email}
            onChangeText={(value) =>
              setUser((prevState) => {
                return { ...prevState, email: value };
              })
            }
            left={<TextInput.Icon icon="email" />}
          />
        </View>

        <View style={styles.inputBox}>
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
            secureTextEntry={true}
            mode="outlined"
            placeholder="Senha"
            value={user.password}
            onChangeText={(value) =>
              setUser((prevState) => {
                return { ...prevState, password: value };
              })
            }
            left={<TextInput.Icon icon="lock" />}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigateToRecoverPassword();
          }}
        >
          <Text style={styles.textForget}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <View style={styles.buttonBox}>
          <Button
            color="#FE9D2A"
            underlayColor="#e69026"
            textColor="white"
            label="LOGIN"
            onPress={() => {
              handleLogin();
            }}
          ></Button>
        </View>
        <View style={styles.buttonBox}>
          <Button
            color="#1b1a1c"
            textColor="white"
            label="VOLTAR"
            onPress={() => {
              navigateBack();
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default Login;
