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
    logo: {
        height: Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width * 0.2,
        resizeMode: "contain",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    nav: {
        backgroundColor: '#6556A0',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        padding: 10,
    },
    navUp: {
        width: Dimensions.get('window').width * 0.9,
        flexDirection: 'row',
        alignItems: 'center'
    },
});