import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

import styles from "./styles";

type Props = {
  onSend: Function;
};

const ChatInput = ({ onSend } : Props) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={(value) => setText(value)}
        placeholder="Type a message..."
        placeholderTextColor="#A7A7A7"
        returnKeyType="send"
        onSubmitEditing={handleSend}
      />
      <Ionicons
        name="send"
        size={24}
        color={text.trim() ? "#00aced" : "#A7A7A7"}
        onPress={handleSend}
      />
    </View>
  );
};

export default ChatInput;