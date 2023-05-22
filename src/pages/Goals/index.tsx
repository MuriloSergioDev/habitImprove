import { AntDesign, Feather, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Text, View } from "react-native";
import AlertModal from "../../components/AlertModal";
import Button from "../../components/Button";
import MyTagInput from "../../components/MyTagInput";
import { db } from '../../config/Firebase';
import AuthContext from "../../context/auth";
import { HabitoInterface, RewardsInterface } from "../../interface/interface";
import styles from "./styles";


const Goals = ({route}: any) => {
  const navigation = useNavigation<any>();

  const { habito } = route.params
  const { user, signed, logOut } = useContext(AuthContext);
  const [messageAlert, setMessageAlert] = useState("");
  const [modalAlertVisible, setModalAlertVisible] = useState(false);
  const [reward, setReward] = useState<RewardsInterface>({
    nome: "",
    idUsuario: user?.uid,
    preco : '0',
    resgatado : false,
  });

  const [selectedTags, setSelectedTags] = useState<any>(habito.metas ?? []);

  const handleTagsChange = (updatedTags: any) => {
    console.log('Tags atualizadas:', updatedTags);
    setSelectedTags(updatedTags);
    // Faça qualquer manipulação necessária com as tags atualizadas
  };

  function navigateBack() {
    navigation.goBack();
  }

  async function atualizaHabito() {
    try {
      const docRef = doc(db, "habits", habito.id ?? "");
      let data = await getDoc(docRef).then((doc: any): HabitoInterface => {
        return doc.data();
      });
      data.metas = selectedTags;
      await setDoc(docRef, data);
      setMessageAlert("Metas atualizadas com sucesso");
      setModalAlertVisible(true);
    } catch (error) {
      console.log("Erro ao atualizar habito");
      console.log(error);
      setMessageAlert("Erro ao atualizar metas");
      setModalAlertVisible(true);
    }
  }

  let modalIcon =
    messageAlert == "Metas atualizadas com sucesso" ? (
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
          <Text style={styles.navUpText}>Metas</Text>
        </View>
      </View>

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

      <View style={styles.navDown}>
        {/* @ts-ignore */}
        <Text style={styles.textTitle}>{habito.titulo}</Text>
        <MyTagInput initialTags={selectedTags} onTagsChange={handleTagsChange}></MyTagInput>
        <Button
          color="#FE9D2A"
          underlayColor="#e69026"
          textColor="white"
          label="Salvar"
          onPress={() => {
            atualizaHabito();
          }}
        ></Button>
      </View>
    </View>
  );
};

export default Goals;
