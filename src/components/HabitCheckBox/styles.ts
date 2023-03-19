import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#FBF9F9',        
        padding: 25,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width ,
        marginTop: 20,
        borderRadius: 60,        
        justifyContent: 'space-between',
        flexDirection:'row',
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        color: '#1D6A02',
    },

    textTime: {
        fontSize: 12,
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
    }
});