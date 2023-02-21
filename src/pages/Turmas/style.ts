import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(229, 229, 229)',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight
    },
    nav: {
        backgroundColor: '#6556A0',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        padding: 10,
    },
    textNav: {
        fontSize: 20,
        color: 'white',
    },
    navUp: {
        width: Dimensions.get('window').width*0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    navDown: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 20        
    },
    logo: {
        height: Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width * 0.2,
        resizeMode: "contain",
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#6556A0',
        borderStyle: 'solid',
        padding: 5,
        fontSize: 20,
        width: Dimensions.get('window').width * 0.7,

    },
    text: {
        color: 'black',
        width: Dimensions.get('window').width * 0.7,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    inputBox: {
        marginBottom: 20
    },
    buttonBox: {
        marginTop: 'auto',
        marginBottom: 20
    },
    buttonMenuBox: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: Dimensions.get('window').width * 0.9,
    },
    menuBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
});