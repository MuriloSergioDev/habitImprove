import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 10,
        height: Dimensions.get('window').width / 7,
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 20,
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    viewBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});