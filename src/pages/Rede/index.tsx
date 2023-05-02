import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import NewsItem from "../../components/NewsItem";
import { db } from "../../config/Firebase";
import AuthContext from "../../context/auth";
import { NewsInterface } from "../../interface/interface";
import styles from "./styles";

const Rede = ({ route }: any) => {
  const navigation = useNavigation<any>();

  const { id } = route.params;
  const { user, signed, logOut } = useContext(AuthContext);
  const [news, setNews] = useState<NewsInterface[]>([]);

  function navigateBack() {
    navigation.goBack();
  }

  function navigateToMenu() {
    navigation.navigate("Menu");
  }

  function getNews() {
    const newsCollection = collection(db, "news");
    const unsubscribe = onSnapshot(
      newsCollection,
      (querySnapshot) => {
        let news: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };

          news.push(data);
        });

        setNews(news);
      },
      (error) => {
        console.error("Error getting news: ", error);
      }
    );
    return unsubscribe;
  }

  useEffect(() => {
    const cancelarEscuta = getNews();

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
          <Text style={styles.navUpText}>Rede de amigos</Text>
        </View>
      </View>

      <View style={styles.navDown}>
        {/* @ts-ignore */}
        <ScrollView style={styles.scroll}>
          {news.map((item) => (
            <NewsItem key={item.id} news={item} />
          ))}
          <View style={styles.endLine}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Rede;
