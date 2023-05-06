import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#FBF9F9',
        padding: 25,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width ,
        marginTop: 20,
        justifyContent: 'flex-start',
        flexDirection:'row',
        alignItems: 'center'
    },
    containerText: {
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        height: 50,
        width: 50,
        resizeMode: "contain",
    },
    title: {
        width: 200,
        fontSize: 16,
        marginLeft: 20
    },
    price: {
        fontWeight: 'bold'
    }
});