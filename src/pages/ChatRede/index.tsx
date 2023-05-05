import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ChatInput from "../../components/ChatInput";
import CommentItem from "../../components/CommentItem";
import { db } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import { CommentsInterface, NewsInterface } from "../../interface/interface";
import styles from "./styles";

const ChatRede = ({ route }: any) => {
  const navigation = useNavigation<any>();

  const { news } = route.params;
  const { user, signed, logOut } = useContext(AuthContext);
  const [comments, setComments] = useState<CommentsInterface[]>([]);

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToMenu() {
    navigation.navigate("Menu");
  }

  function getComments() {
    const commentsCollection = collection(db, "comments");

    const unsubscribe = onSnapshot(
      query(commentsCollection, where("idNews", "==", news.id)),
      (querySnapshot) => {
        let comments: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };

          comments.push(data);
        });

        comments.sort((a, b) => a.dataCriacao - b.dataCriacao);

        setComments(comments);
      },
      (error) => {
        console.error("Error getting comments: ", error);
      }
    );
    return unsubscribe;
  }

  function saveComment(message: string) {
    try {
      const data = {
        mensagem: message ?? "",
        idNews: news.id ?? "",
        idUsuario: user?.uid ?? "",
        nomeUsuario: user?.name ?? "",
        dataCriacao : new Date(),
      };
      console.log(data);

      const dbRef = collection(db, "comments");
      addDoc(dbRef, data);
      atualizaNews();

      console.log("Mensagem enviada com sucesso");
    } catch (error) {
      console.log("Erro ao enviar mensagem");
    }
  }

  async function atualizaNews() {
    try {
      const docRef = doc(db, "news", news.id ?? "");
      let data = await getDoc(docRef).then((doc: any): NewsInterface => {
        return doc.data();
      });
      data.comentarios = data.comentarios + 1;
      await setDoc(docRef, data);
    } catch (error) {
      console.log("Erro ao atualizar news");
      console.log(error);
    }
  }

  useEffect(() => {
    const cancelarEscuta = getComments();

    return () => {
      cancelarEscuta();
    };
  }, []);

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
          <Text style={styles.navUpText}>Comentários</Text>
        </View>
      </View>

      <View style={styles.navDown}>
        {/* @ts-ignore */}
        <ChatInput onSend={saveComment} />
        <ScrollView style={styles.scroll}>
          {comments.map((item) => (
            <CommentItem key={item.id} comment={item} />
          ))}
          <View style={styles.endLine}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ChatRede;
