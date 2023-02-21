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
  text: {
    color: 'black',
    width: Dimensions.get('window').width * 0.7,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  inputBox: {
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'flex-start'
  },
  buttonBox: {
    marginBottom: 20
  },

  searchBox: {
    borderColor: '#6556A0',
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    width: Dimensions.get('window').width * 0.9,

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

  modalHeaderText: {
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
  modalContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width * 0.8,
    justifyContent: 'center'
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

    padding: 15,

    width: Dimensions.get('window').width * 0.7,

    justifyContent: 'center',
    borderRadius: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textTurma: {
    color: '#6556A0',
    fontSize: 20,
    textAlign: 'center',

  },
});