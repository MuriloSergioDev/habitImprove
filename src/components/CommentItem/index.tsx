import React, { useContext } from "react";
import {
  Image,
  Text,
  View
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthContext from "../../context/auth";
import { CommentsInterface } from "../../interface/interface";
import styles from "./styles";

type Props = {
  comment: CommentsInterface;
};

const CommentItem = ({ comment }: Props) => {
  const { user, signed, logOut } = useContext(AuthContext);

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <TouchableOpacity onPress={() => {}}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icon.png")}
        ></Image>
      </TouchableOpacity>
      <View style={styles.boxText}>
        <Text style={styles.usuNome}>{comment.nomeUsuario}</Text>
        <Text style={styles.usuMessage}>{comment.mensagem}</Text>
      </View>
    </View>
  );
};

export default CommentItem;
