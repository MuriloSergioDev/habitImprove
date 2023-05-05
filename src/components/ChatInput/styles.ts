import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height: 50,
        zIndex: 2,
      },
      input: {
        flex: 1,
        fontSize: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#A7A7A7",
        paddingHorizontal: 10,
        marginRight: 10,
      },
});
