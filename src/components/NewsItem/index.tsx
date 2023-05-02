import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where
} from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { db } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import { NewsInterface } from "../../interface/interface";
import styles from "./styles";

type Props = {
  news: NewsInterface;
};

const NewsItem = ({ news }: Props) => {
  const { user, signed, logOut } = useContext(AuthContext);
  const [isReacted, setIsReacted] = React.useState(false);

  const stylesIntern = StyleSheet.create({
    green: {
      color: "#1D6A02",
    },
    red: {
      color: "red",
    },
    text: {
      fontSize: 18,
      fontWeight: "400",
      textAlign: "left",
      maxWidth: 300,
    },
  });

  async function handleCreateNewReaction() {
    try {
      const data = {
        idNews: news.id,
        idUsuario: user?.uid ?? "",
        tipo: news.tipo == "p" ? "like" : "support",
      };

      const dbRef = collection(db, "reactions");
      await addDoc(dbRef, data);
      atualizaNews();
      setIsReacted(true);
      console.log("reaction criada com sucesso");
    } catch (error) {
      console.log("Erro ao criar reaction");
      console.log(error);
      //alert(error)
    }
  }

  useEffect(() => {
    const cancelarEscuta = getReaction();

    return () => {
      cancelarEscuta();
    };
  }, []);

  async function atualizaNews() {
    try {
      const docRef = doc(db, "news", news.id ?? "");
      let data = await getDoc(docRef).then((doc: any): NewsInterface => {
        return doc.data();
      });
      data.reacoes = data.reacoes + 1;
      await setDoc(docRef, data);
    } catch (error) {
      console.log("Erro ao atualizar news");
      console.log(error);
    }
  }

  function getReaction() {
    const reactionsCollection = collection(db, "reactions");
    const unsubscribe = onSnapshot(
      query(reactionsCollection, where("idNews", "==", news.id), where("idUsuario", "==", user?.uid)),
      (querySnapshot) => {
        let reactions: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };

          reactions.push(data);
        });
        if(reactions.length > 0){
          setIsReacted(true);
        }else{
          setIsReacted(false);
        }
      },
      (error) => {
        console.error("Error getting habits: ", error);
      }
    );
    return unsubscribe;
  }

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <TouchableOpacity onPress={() => {}}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icon.png")}
        ></Image>
      </TouchableOpacity>
      <View style={styles.boxText}>
        <Text
          style={
            news.tipo == "p"
              ? [stylesIntern.text, stylesIntern.green]
              : [stylesIntern.text, stylesIntern.red]
          }
        >
          {news.descricao}
        </Text>
        <View style={styles.boxTextItem}>
          {news.tipo == "p" ? (
            <TouchableOpacity onPress={() => {
              if(!isReacted){
                handleCreateNewReaction();
              }
            }}>
              <AntDesign
                name="like1"
                size={24}
                color="black"
                style={styles.iconFirst}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {
              if(!isReacted){
                handleCreateNewReaction();
              }
            }}>
              <MaterialCommunityIcons
                name="handshake"
                size={24}
                color="black"
                style={styles.iconFirst}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.textTime}>{news.reacoes}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Entypo
              name="chat"
              size={24}
              color="black"
              style={styles.iconItem}
            />
          </TouchableOpacity>
          <Text style={styles.textTime}>{news.comentarios?.length}</Text>
        </View>
      </View>
    </View>
  );
};

export default NewsItem;
