import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 10,
        width: Dimensions.get('window').width * 0.9,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#6556A0',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 'auto',
        marginBottom: 'auto'
    },

    viewBox: {
        width: Dimensions.get('window').width * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        
        
    },
    textTitle: {
        fontSize: 18,
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    textPeriod: {

    },
    buttonBox: {
        marginVertical: 10,
    },
});