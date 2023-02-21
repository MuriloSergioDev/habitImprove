import { AntDesign, Feather, Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AlertModal from '../../components/AlertModal';
import DatePicker from '../../components/DatePicker';
import { db } from '../../config/Firebase';
import { TurmaInterface } from '../../interface/interface';
import styles from './styles';

type Props = {

}

const CreateTurma = ({ }: Props) => {

    const navigation = useNavigation();

    const [messageAlert, setMessageAlert] = useState('');
    const [turma, setTurma] = useState<TurmaInterface>({
        title: '',
        status: true
    })
    const [dateInicio, setDateInicio] = useState("")
    const [dateFim, setDateFim] = useState("")
    const [modalAlertVisible, setModalAlertVisible] = useState(false);

    function navigateBack() {
        navigation.goBack();
    }

    function navigateToMenu() {
        navigation.navigate('Menu');
    }

    async function handleCreateNewTurma() {

        try {

            if (turma.title && dateInicio && dateFim) {

                const refTurma = db.collection('turmas')
                    .doc()

                const data = {
                    id: refTurma.id,
                    title: turma.title,
                    start: dateInicio,
                    end: dateFim,
                    status: turma.status,
                }
                refTurma.set(data, { merge: true });

                //console.log(refTurma.id)

                setMessageAlert('Turma criada com sucesso')
                setModalAlertVisible(true)
            } else {
                setMessageAlert('Preencha todos os campos')
                setModalAlertVisible(true)
            }



        }
        catch (error) {
            setMessageAlert('Erro ao criar turma')
            setModalAlertVisible(true)
            //alert(error)
        }
    }

    let modalIcon = messageAlert == 'Turma criada com sucesso' ? <AntDesign name="checkcircle" size={24} color="green" /> : <Foundation name="alert" size={24} color="#e6d927" />

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <View style={styles.navUp}>
                    <Feather name="arrow-left" size={30} color="white" onPress={() => { navigateBack() }} />
                    <Image
                        style={styles.logo}
                        source={require("../../../assets/logoalt.png")}></Image>
                    <Feather name="plus" size={30} color="white" onPress={() => { handleCreateNewTurma() }} />
                </View>

            </View>

            <AlertModal
                header={messageAlert}
                comfirmationString='Ok'
                isVisible={modalAlertVisible}
                close={() => {
                    setModalAlertVisible(false)
                    if (messageAlert == 'Turma criada com sucesso') {
                        navigateToMenu()
                    }
                }}>
                {modalIcon}
            </AlertModal>

            <View style={styles.navDown}>

                {/* @ts-ignore */}
                <TextInput
                    theme={{
                        colors: {
                            placeholder: 'white', text: 'white', primary: 'white'
                        }
                    }}
                    style={styles.input}
                    mode='flat'
                    label="Turma"
                    value={turma.title}
                    onChangeText={(value => setTurma(prevState => { return { ...prevState, title: value } }))}
                />

                <Text style={styles.textNav}>Inicio</Text>
                <DatePicker setDate={setDateInicio} value={dateInicio}></DatePicker>

                <Text style={styles.textNav}>Fim</Text>
                <DatePicker setDate={setDateFim} value={dateFim}></DatePicker>
            </View>
        </View>
    )
}

export default CreateTurma;