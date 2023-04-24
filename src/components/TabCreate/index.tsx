import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import styles from "./style";

type TabCreateProps = {
  focused : boolean;
};

const TabCreate = ({focused}: TabCreateProps) => {
  return (
    <View style={[styles.container, {backgroundColor: focused ? '#FE9D2A' : '#e99228'}]}>
      <Entypo name="plus" color={focused ? 'white' : '#f8f8f8'} size={30}></Entypo>
    </View>
  );
};

export default TabCreate;
