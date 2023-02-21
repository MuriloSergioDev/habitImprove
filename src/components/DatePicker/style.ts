import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    datePicker: {
        width: Dimensions.get('window').width* 0.8 
    },
    container: {
        flexDirection: 'row',
        width: Dimensions.get('window').width* 0.8,
        padding: 10,
        alignItems: 'center',
    }
});