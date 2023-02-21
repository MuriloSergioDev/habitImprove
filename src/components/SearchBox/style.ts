import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    searchBox: {
        borderColor: '#6556A0',
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 5,
        borderRadius: 20,
        width: Dimensions.get('window').width * 0.9,
        marginVertical: 20
        
    },
    input: {
        padding: 5,
        fontSize: 20,
        width: Dimensions.get('window').width * 0.7,
    },
});