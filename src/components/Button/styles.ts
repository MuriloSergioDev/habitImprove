import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 10,
        height: Dimensions.get('window').width / 7,
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 20,
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
    },
    viewBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});