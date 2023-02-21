import { AntDesign, Entypo, Feather, Foundation } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AlertModal from '../../components/AlertModal';
import { db } from '../../config/Firebase';
import { DesempenhoInterface, UserInterface } from '../../interface/interface';
import styles from './style';

type Props = {

}

const EditPerformance = ({ route }) => {

    const navigation = useNavigation();

    const { name, uid, turma } = route.params
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const desempenhoTemp: DesempenhoInterface[] = []
    const [messageAlert, setMessageAlert] = useState('');
    const bimestresTemp = []
    const [bimestres, setBimestres] = useState([])
    const [bimestre, setBimestre] = useState('');
    const [desempenho, setDesempenho] = useState<DesempenhoInterface[]>()
    const [valuesBimestre, setValuesBimestre] = useState<DesempenhoInterface>({
        uid,
        turma,
        facil: 0,
        medio: 0,
        dificil: 0,
    });
    const [user, setUser] = useState<UserInterface>(
        {
            name,
            uid,
            turma
        }
    )

    useEffect(() => {
        getDesempenhoFirebase()
    }, [])

    function navigateBack() {
        navigation.goBack();
    }

    async function getDesempenhoFirebase() {
        try {
            const data = await db
                .collection('desempenho')
                .where('uid', '==', user.uid)
                .where('turma', '==', user.turma)
                .get()

            data.forEach((doc) => {

                const data = {
                    facil: doc.get("facil"),
                    medio: doc.get("medio"),
                    dificil: doc.get("dificil"),
                    bimestre: doc.get("bimestre"),
                }
                //console.log(turma)
                desempenhoTemp.push(data)
            })

            desempenhoTemp.map((value) => {
                const data = {
                    value: `${value.bimestre.toString()}º Bimestre`,
                    label: `${value.bimestre.toString()}º Bimestre`,
                }
                bimestresTemp.push(data)
            })
            setBimestres(bimestresTemp)
            setDesempenho(desempenhoTemp)
        }
        catch (error) {
            alert(error)
        }
    }

    async function setDesempenhoFirebase() {
        try {
            if (!(bimestre === null)) {
                db.collection('desempenho')
                .doc(user.uid+user.turma+valuesBimestre.bimestre)
                .set(valuesBimestre)

                setMessageAlert('Desempenho editado com sucesso')
                setModalAlertVisible(true)    
            } else {
                setMessageAlert('Selecione um bimestre')
                setModalAlertVisible(true) 
            }
            
        }
        catch (error) {
            setMessageAlert('Erro ao editar desempenho')
            setModalAlertVisible(true) 
        }
    }

    function setValues() {
        if (desempenho && bimestre) {
            const data = desempenho.find(value => value.bimestre.toString() === bimestre.substr(0, 1))

            setValuesBimestre(prevState => { return { ...prevState, facil:  data.facil, medio:  data.medio, dificil:  data.dificil,} })
            
        }else{
            setValuesBimestre(prevState => { return { ...prevState, facil:  0, medio:  0, dificil:  0,} })
        }
    }

    let modalIcon = messageAlert== 'Desempenho editado com sucesso' ? <AntDesign name="checkcircle" size={24} color="green" /> : <Foundation name="alert" size={24} color="#e6d927" />

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <View style={styles.navUp}>
                    <Feather name="arrow-left" size={30} color="white" onPress={() => { navigateBack() }} />
                    <Image
                        style={styles.logo}
                        source={require("../../../assets/logoalt.png")}></Image>
                    <Entypo name="save" size={30} color="white" onPress={() => { setDesempenhoFirebase() }} />
                </View>
            </View>
            <AlertModal
                header= {messageAlert}//'Desempenho editado com sucesso'
                comfirmationString='Ok'
                isVisible={modalAlertVisible}
                close={() => {
                    setModalAlertVisible(false)
                }}>
                {modalIcon}
            </AlertModal>
            <View style={styles.inputBox}>
                <Text style={styles.text}>Aluno : {user.name}</Text>
                <Text style={styles.textTurma}>Bimestre</Text>
                <RNPickerSelect
                    placeholder={{ label: 'Selecione um bimestre', value: null }}
                    value={bimestre}
                    onValueChange={(value) => {
                        setBimestre(value)
                        setValuesBimestre(prevState => { return { ...prevState, bimestre:  parseInt(value)} })
                        setValues()
                    }}
                    items={bimestres}
                    style={pickerSelectStyles}
                />
            </View>
            <View>
                <View style={styles.textSliderBox}>
                    <Text>Facil</Text>
                    <Text>{valuesBimestre.facil}</Text>
                </View>
                <Slider
                    style={styles.sliderBox}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    maximumTrackTintColor="#000000"
                    value={valuesBimestre.facil}
                    onValueChange={value=> setValuesBimestre(prevState => { return { ...prevState, facil: value } })}
                />
            </View>
            <View>
                <View style={styles.textSliderBox}>
                    <Text>Medio</Text>
                    <Text>{valuesBimestre.medio}</Text>
                </View>
                <Slider
                    style={styles.sliderBox}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    maximumTrackTintColor="#000000"
                    value={valuesBimestre.medio}
                    onValueChange={value=> setValuesBimestre(prevState => { return { ...prevState, medio: value } })}
                />
            </View>

            <View>
                <View style={styles.textSliderBox}>
                    <Text>Dificil</Text>
                    <Text>{valuesBimestre.dificil}</Text>
                </View>
                <Slider
                    style={styles.sliderBox}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    maximumTrackTintColor="#000000"
                    value={valuesBimestre.dificil}
                    onValueChange={value=> setValuesBimestre(prevState => { return { ...prevState, dificil: value } })}
                />
            </View>

        </View>
    )
}

export default EditPerformance;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});