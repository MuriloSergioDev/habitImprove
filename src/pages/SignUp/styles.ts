import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
  },
  logo: {
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').width * 0.6,
    resizeMode: "contain",
    marginBottom: 40
  },
  input: {
    padding: 5,
    fontSize: 15,
    width: Dimensions.get('window').width * 0.7,
    backgroundColor: 'white',
  },
  text: {
    color: '#6556A0',
    width: Dimensions.get('window').width * 0.7,
    fontSize: 20,
  },
  textTurma: {
    color: '#6556A0',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 20,
    width: Dimensions.get('window').width * 0.7
  },
  inputBox: {
    marginBottom: 10,
  },
  inputBoxSelect: {
    width: Dimensions.get('window').width * 0.7,
    marginVertical: 20
  },
  buttonBox: {
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
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
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  turmaHighlight: {
    backgroundColor: '#6556A0',
    padding: 15,
    margin: 10,
    width: Dimensions.get('window').width * 0.3,
    height: 60,
    justifyContent: 'center',
    borderRadius: 10
  },
  turmaHighlightSelect: {
    backgroundColor: '#6556A0',
    padding: 15,
    margin: 10,
    width: Dimensions.get('window').width * 0.7,
    height: 60,
    justifyContent: 'center',
    borderRadius: 10
  },
  modalHeaderText: {
    color: "#6556A0",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center'
  },
  buttonContainer:{
    marginTop: 100
  }
});