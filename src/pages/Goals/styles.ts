import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight
    },
    nav: {
        backgroundColor: '#FE9D2A',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        padding: 10,
    },
    textNav: {
        fontSize: 20,
        color: 'white',
        marginTop: 20
    },
    textTitle:{
        fontSize: 20,
        color: 'black',
        marginBottom : 15,
    },
    navUp:{
        width: Dimensions.get('window').width*0.9,
        flexDirection: 'row',
        alignItems:'center',
        textAlign:'center',
        justifyContent: 'space-between'
    },
    navUpText:{
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    navDown: {
        paddingTop: 20,
        alignItems: 'center',
    },
    logo: {
        height: Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width * 0.15,
        resizeMode: "contain",
        marginRight: '40%',
    },
    input: {
        padding: 5,
        fontSize: 15,
        width: Dimensions.get('window').width * 0.8,
        backgroundColor: '#ffffff',
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
    },
    datePicker: {
        width: Dimensions.get('window').width* 0.8
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 3,
    },
    boxRep:{
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width* 0.8
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        width: Dimensions.get('window').width* 0.8,
    },
    label: {
        margin: 8,
    },
    scroll: {
        width: Dimensions.get('window').width,
    },
    boxRow:{
        marginVertical: 10
    }
});