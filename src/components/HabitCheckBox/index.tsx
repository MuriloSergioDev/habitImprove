import React, { useState } from "react";
import { View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
import styles from "./styles";

type Props = {
    habitoNome?: string
    duracao?: string    
}

const HabitCheckBox = ({habitoNome, duracao}: Props) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <View style={[styles.container, styles.shadowProp]}>
      <View style={styles.boxText}>
        <Text style={styles.text}>{habitoNome}</Text>
        <Text style={styles.textTime}>Duração: {duracao}</Text>
      </View>
      <Checkbox
        status={checked ? "checked" : "unchecked"}
        onPress={() => {
          setChecked(!checked);
        }}
      />
    </View>
  );
};

export default HabitCheckBox;
