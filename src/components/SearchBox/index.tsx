import React from 'react';
import { TextInput, View } from 'react-native';
import styles from './style';
import { Feather } from '@expo/vector-icons';

type Props = {
    placeholder?: string
    onChangeText: Function,
    value?: string
}

const SearchBox = ( { placeholder, onChangeText, value }: Props) => {
    return (
        <View style={styles.searchBox}>
            <Feather name="search" size={20} color="#6556A0" />
            <TextInput
                placeholder = {placeholder}
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                value={value}
            ></TextInput>
        </View>
    );
}

export default SearchBox;


