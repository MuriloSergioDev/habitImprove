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
        width: Dimensions.get('window').width*0.9,
        flexDirection: 'column',
        padding:20,
        marginVertical: 10,
        backgroundColor: '#6556A0',
        borderRadius:20,
        
    },
    logo: {
        height: Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width * 0.2,
        resizeMode: "contain",
    },
    input: {
        padding: 5,
        fontSize: 20,
        width: Dimensions.get('window').width * 0.7,

    },
    text: {
        color: 'black',
        width: Dimensions.get('window').width * 0.7,
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20
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
    searchBox: {
        borderColor: '#6556A0',
        borderWidth: 1,
        borderStyle: 'solid',
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 5,
        borderRadius: 20,
        width: Dimensions.get('window').width * 0.9
    },
    scroll: {
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(229, 229, 229)',
    },
    textScroll: {
        fontSize: 16,
        color: '#6556A0',
        padding: 5,
        textAlign: 'center',
        marginBottom: 20 
    },
    chart: {
        
    },
    icon: {

    },
    containerExclusion:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6556A0',
        borderRadius: 10,
        padding: 5,
        width: Dimensions.get('window').width * 0.7        
        
    },
    textExclusion: {
        color: 'red',
        fontSize: 16,
        marginRight: 10
    },
    textTurma: {
        color: '#6556A0',
        fontSize: 20,
        textAlign: 'center',
      },
    textUid:  {
        color: 'black',
        marginBottom : 20
    }
});