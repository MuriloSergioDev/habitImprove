import { AntDesign, Feather, Foundation } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { Tooltip } from "react-native-elements";
import { TextInput } from "react-native-paper";
import AlertModal from "../../components/AlertModal";
import Button from "../../components/Button";
import { db } from '../../config/Firebase';
import AuthContext from "../../context/auth";
import { RewardsInterface, UserInterface } from "../../interface/interface";
import styles from "./styles";


const CreateReward = ({route}: any) => {
  const navigation = useNavigation<any>();

  const { id } = route.params
  const { user, signed, logOut } = useContext(AuthContext);
  const [messageAlert, setMessageAlert] = useState("");
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [reward, setReward] = useState<RewardsInterface>({
    nome: "",
    idUsuario: user?.uid,
    preco : '0',
    prazo : '0',
    surpresa : false,
    resgatado : false,
  });


  function navigateBack() {
    navigation.goBack();
  }

  function navigateToRecompensa() {
    navigation.navigate("Recompensa");
  }

  function getUsers() {
    const usersCollection = collection(db, "users");
    const unsubscribe = onSnapshot(
      usersCollection,
      (querySnapshot) => {
        let users: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = {
            uid: doc.id,
            name: doc.get('name')
          };

          users.push(data);
        });

        users = users.filter((u)=>{
          if(u.uid != user?.uid){
            return true;
          }

          return false;
        })
        setUsers(users);
      },
      (error) => {
        console.error("Error getting habits: ", error);
      }
    );
    return unsubscribe;
  }

  useEffect(() => {
    const cancelarEscuta = getUsers();

    return () => {
      cancelarEscuta();
    };
  }, []);

  async function handleCreateNewReward() {
    try {
      if (reward.nome) {
        const dbRef = collection(db, "rewards");
        reward.dataCriacao = new Date();
        addDoc(dbRef, reward)

        setMessageAlert("Recompensa criada com sucesso");
        setModalAlertVisible(true);
      } else {
        setMessageAlert("Preencha todos os campos");
        setModalAlertVisible(true);
      }
    } catch (error) {
      setMessageAlert("Erro ao criar recompensa");
      setModalAlertVisible(true);
      console.log(error);
      //alert(error)
    }
  }

  function checkOnlyNumbers(value: string) {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < value.length; i++) {
        if(numbers.indexOf(value[i]) > -1 ) {
            newText = newText + value[i];
        }
        else {
            Alert.alert(
              "Atenção",
              "Apenas números permitidos",
              [{ text: "Ok", onPress: () => {} }],
              { cancelable: true }
            )
        }
    }
    return newText;
  }

  let modalIcon =
    messageAlert == "Recompensa criada com sucesso" ? (
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
          <Text style={styles.navUpText}>Nova Recompensa</Text>
        </View>
      </View>

      <AlertModal
        header={messageAlert}
        comfirmationString="Ok"
        isVisible={modalAlertVisible}
        close={() => {
          setModalAlertVisible(false);
          if (messageAlert == "Recompensa criada com sucesso") {
            navigateToRecompensa();
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
          value={reward.nome}
          onChangeText={(value) =>
            setReward((prevState) => {
              return { ...prevState, nome: value };
            })
          }
        />
        <View style={styles.boxRow}>

        <View style={styles.boxRep}>
            <Text>Custo (moedas):</Text>
            <TextInput
            keyboardType='numeric'
            onChangeText={(value) =>
              setReward((prevState) => {
                let newText = checkOnlyNumbers(value);
                return { ...prevState, preco: newText };
              })
            }
            value={reward.preco}
            maxLength={10}  //setting limit of input
          />
        </View>
        </View>
        <View style={styles.boxRep}>
            <Text>Usuario:</Text>
            <Picker
              selectedValue={reward.idUsuario}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                setReward((prevState) => {
                  return { ...prevState, idUsuario: itemValue };
                })
              }
            >
              <Picker.Item key={user?.uid} label="Para mim" value={user?.uid} />
              {users.map((usu)=> (
                <Picker.Item key={usu.uid} label={usu.name} value={usu.uid} />
                ))}
            </Picker>
        </View>

        {reward.idUsuario != user?.uid  ? (
        <View style={styles.boxRow}>
        <View style={styles.boxRep}>
            <Text>Prazo (dias):
            <Tooltip popover={<Text>Selecione um prazo em dias, 0 correponde a sem limite de prazo</Text>} width={300} height={60}>
              <Foundation name="info" size={24} color="black" />
            </Tooltip>

            </Text>
            <TextInput
            keyboardType='numeric'
            onChangeText={(value) =>
              setReward((prevState) => {
                let newText = checkOnlyNumbers(value);
                return { ...prevState, prazo: newText };
              })
            }
            value={reward.prazo}
            maxLength={3}  //setting limit of input
          />
          </View>
        </View>
          ) : null
        }

        {reward.idUsuario != user?.uid ? (
        <View style={styles.boxRep}>
            <Text>Surpresa:
            <Tooltip popover={<Text>Selecione se a recompensa irá ter seu título aparecendo ou apenas no momento do resgate</Text>} width={300} height={80}>
              <Foundation name="info" size={24} color="black" />
            </Tooltip>
            </Text>
            <Picker
              selectedValue={reward.surpresa}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue, itemIndex) =>
                setReward((prevState) => {
                  return { ...prevState, surpresa: itemValue };
                })
              }
            >
              <Picker.Item label="Não" value={false} />
              <Picker.Item label="Sim" value={true}/>
            </Picker>
        </View>
          ) : null
        }

        <Button
          color="#FE9D2A"
          underlayColor="#e69026"
          textColor="white"
          label="Salvar"
          onPress={() => {
            handleCreateNewReward();
          }}
        ></Button>
      </View>
    </View>
  );
};

export default CreateReward;
