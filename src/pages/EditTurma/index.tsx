import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Switch, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AlertModal from '../../components/AlertModal';
import DatePicker from '../../components/DatePicker';
import { db } from '../../config/Firebase';
import { TurmaInterface } from '../../interface/interface';
import styles from './style';


// import { Container } from './styles';

type Props = {

}

const EditTurma = ({ route }) => {
    
    const { id, title, start, end, status } = route.params
    const navigation = useNavigation();

    const [turma, setTurma] = useState<TurmaInterface>({
        id,
        title,
        start,
        end,
        status,
    })
    const [dateInicio, setDateInicio] = useState(start)
    const [dateFim, setDateFim] = useState(end)
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    

    function navigateBack() {
        navigation.goBack();
    }

    function navigateToMenu() {
        navigation.navigate('Menu');
    }

    async function handleUpdateTurma() {

        try {
            const data = {
                title: turma.title,
                start: dateInicio,
                end: dateFim,
                status: turma.status,
            }

            db.collection('turmas')
                .doc(turma.id)
                .update(data)

            setModalAlertVisible(true)

        }
        catch (error) {
            alert(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <View style={styles.navUp}>
                    <Feather name="arrow-left" size={30} color="white" onPress={() => { navigateBack() }} />
                    <Image
                        style={styles.logo}
                        source={require("../../../assets/logoalt.png")}></Image>
                    <Entypo name="save" size={30} color="white" onPress={() => { handleUpdateTurma() }} />
                </View>

            </View>

            <AlertModal
                header='Turma editada com sucesso'
                comfirmationString='Ok'
                isVisible={modalAlertVisible}
                close={() => {
                    setModalAlertVisible(false)
                    navigateToMenu()
                }}>
                <AntDesign name="checkcircle" size={24} color="green" />
            </AlertModal>

            <View style={styles.navDown}>
                <View style={styles.containerAtivo}>
                    <Text style={styles.textAtivo}>Ativar / Desativar</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "green" }}
                        thumbColor={turma.status ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value => setTurma(prevState => { return { ...prevState, status: value } }))}
                        value={turma.status}
                        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    />
                </View>
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

export default EditTurma;