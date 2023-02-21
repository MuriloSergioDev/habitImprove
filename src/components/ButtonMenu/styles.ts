import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 10,
        height: Dimensions.get('window').width / 5,
        width: Dimensions.get('window').width * 0.4,
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 20,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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