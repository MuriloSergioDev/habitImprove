import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#FBF9F9',
        padding: 25,
        width: Dimensions.get('window').width ,
        marginTop: 20,
        borderRadius: 60,
        justifyContent: 'flex-start',
        flexDirection:'row',
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'left',
        color: '#1D6A02',
        maxWidth: 300
    },

    textTime: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
    },
    viewBox: {
        alignItems: 'center'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 3,
    },
    boxText:{
        alignItems:'flex-start',
    },
    boxTextItem:{
        width: '70%',
        alignItems:'flex-start',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-start',
    },
    iconItem:{
        marginHorizontal: 10
    },
    iconFirst:{
        marginRight: 10
    },
    icon: {
        height: 50,
        width: 50,
        resizeMode: "contain",
        marginRight: 20,
    },
    usuNome:{
        fontWeight: 'bold',
    },
    usuMessage:{
        width: 200,
    }
});