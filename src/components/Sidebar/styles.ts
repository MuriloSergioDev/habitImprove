import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 20,
        
    },
    textUser: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,      
    },
    containerOption: {
        padding: 20,
        flexDirection: 'row',
    },
    textTitle: {
        marginLeft: 20,
        color: 'black'
    }
});