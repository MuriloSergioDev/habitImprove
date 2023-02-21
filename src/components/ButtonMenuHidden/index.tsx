import React from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styles from './styles'

type Props = {

}

const ButtonMenuHidden = ({ }: Props) => {

    return (
        <TouchableHighlight style={styles.container}>
            <View style={styles.viewBox}>
                <Text style={styles.text}></Text>
            </View>
        </TouchableHighlight>
    );

}

export default ButtonMenuHidden;


