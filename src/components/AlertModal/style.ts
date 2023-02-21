import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'column',
        justifyContent:'space-around'
      },
      
      modalHeaderText:{
        color: "#6556A0",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalHeader: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * 0.7,
        justifyContent: 'space-around',
        alignItems: 'center',
        
      },
      modalContent:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center'
      },
});