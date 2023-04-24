import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FE9D2A',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight
    },
    contentBox: {
        flex: 1,
        paddingTop: 130,
        backgroundColor: 'white',
        borderTopRightRadius:80,
        borderTopLeftRadius:80,
        width: '100%',
    },
    nav: {
        backgroundColor: '#FE9D2A',
        width: Dimensions.get('window').width,
        alignItems: 'flex-start',
        padding: 20,
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textNav: {
        fontSize: 20,
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    logo: {
        height: 50,
        width: 50,
        resizeMode: "contain",
        zIndex:1,
        marginRight: 20,
    },
    icon: {
        height: 50,
        width: 50,
        resizeMode: "contain",
        marginRight: 20,
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
        color: 'white',
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
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width * 0.85,
    },
    menuBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    placarBox:{
        position: 'absolute',
        top: '20%',
        left: '12.5%',
        width: '75%',
        height: 150,
        padding: 27,
        backgroundColor: '#FBF9F9',
        zIndex: 10,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 3,
    },

    placarBoxItem:{
        marginBottom: 18,
        fontSize:16,
    },

    textBlack:{
        color: 'black',
    },
    contentBoxText:{
        fontWeight: '400',
        fontSize: 18,
        marginLeft: 20,
    },
    scroll: {
        width: Dimensions.get('window').width,
        maxHeight: 380,
    },
    endLine:{
        height: 10,
    }
});