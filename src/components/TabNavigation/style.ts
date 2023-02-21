import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';
import theme from "../../theme";

export default StyleSheet.create({
    tabContainer: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        paddingTop: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        elevation: 5,
        backgroundColor: "#fff",
    },
    icoWrapper: {
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },
    menuItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    menuItemActive: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ico: {
        fontSize: 23,
        color: theme.colors.purple200,
    },
    icoActive: {
        fontSize: 23,
        color: theme.colors.shape,
    },
    menuItemName: {        
        fontSize: 9,
        color: theme.colors.purple200,
    },
    menuItemNameActive: {        
        fontSize: 9,
        color: theme.colors.shape,
    },
});