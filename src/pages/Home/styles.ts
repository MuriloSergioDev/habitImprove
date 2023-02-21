import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center'
    },
    backgroundimage: {
        flex: 1,
        resizeMode: "cover",
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    },
    layer: {
        flex: 1,
    },
    buttonBox: {
        marginVertical: 10,
    },
    logo: {
        height: Dimensions.get('window').height* 0.3,
        width: Dimensions.get('window').width * 0.5,
        resizeMode: "contain",
        marginBottom: 50
    }
    
});