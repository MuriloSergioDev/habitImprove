import { AntDesign, Feather, Foundation } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
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
          placeholder="Titulo"
          value={reward.nome}
          onChangeText={(value) =>
            setReward((prevState) => {
              return { ...prevState, nome: value };
            })
          }
        />
        <View style={styles.boxRow}>
        <View style={styles.boxRep}>
            <Text>Custo:</Text>
            <TextInput
            keyboardType='numeric'
            onChangeText={(value) =>
              setReward((prevState) => {
                return { ...prevState, preco: value };
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
