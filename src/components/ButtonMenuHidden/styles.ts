import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgb(229, 229, 229)',
        borderColor: 'rgb(229, 229, 229)',
        padding: 10,
        height: Dimensions.get('window').width / 5,
        width: Dimensions.get('window').width * 0.4,
        marginTop: 20,
    },
    text: {
        fontSize: 14,
        fontWeight: '100',
        textAlign: 'center',
    },
    viewBox: {
        alignItems: 'center'
    }
});