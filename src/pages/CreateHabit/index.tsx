import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, Image } from 'react-native';
import { View } from 'react-native';
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import DatePicker from '../../components/DatePicker';
import { TextInput } from 'react-native-paper';
import { HabitoInterface, TurmaInterface } from '../../interface/interface';
import AlertModal from '../../components/AlertModal';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../config/Firebase';
import { Foundation } from '@expo/vector-icons';
import Button from '../../components/Button';
import NumericInput from 'react-native-numeric-input'

type Props = {

}

const CreateHabit = ({ }: Props) => {

    const navigation = useNavigation();

    const [messageAlert, setMessageAlert] = useState('');
    const [habito, setHabito] = useState<HabitoInterface>({
        titulo: '',
        tipo: 'd'
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

            if (habito.titulo && dateInicio && dateFim) {

                // const refTurma = db.collection('turmas')
                //     .doc()

                // const data = {
                //     id: refTurma.id,
                //     title: turma.title,
                //     start: dateInicio,
                //     end: dateFim,
                //     status: turma.status,
                // }
                // refTurma.set(data, { merge: true });

                //console.log(refTurma.id)

                setMessageAlert('Hábito criado com sucesso')
                setModalAlertVisible(true)
            } else {
                setMessageAlert('Preencha todos os campos')
                setModalAlertVisible(true)
            }



        }
        catch (error) {
            setMessageAlert('Erro ao criar hábito')
            setModalAlertVisible(true)
            //alert(error)
        }
    }

    let modalIcon = messageAlert == 'Hábito criado com sucesso' ? <AntDesign name="checkcircle" size={24} color="green" /> : <Foundation name="alert" size={24} color="#e6d927" />

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <View style={styles.navUp}>                    
                    <Text style={styles.navUpText}>Novo Hábito</Text>
                </View>

            </View>

            <AlertModal
                header={messageAlert}
                comfirmationString='Ok'
                isVisible={modalAlertVisible}
                close={() => {
                    setModalAlertVisible(false)
                    if (messageAlert == 'Hábito criado com sucesso') {
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
                placeholder: "#FE9D2A",
                text: "#c0c2c4",
                primary: "#c0c2c4",
                outline: "#c0c2c4",
              },
              roundness: 10,
            }}
            style={styles.input}
            mode="outlined"
            placeholder="Titulo"
            value={habito.titulo}
            onChangeText={(value) =>
              setHabito((prevState) => {
                return { ...prevState, titulo: value };
              })
            }            
          />
          
          <NumericInput onChange={value => console.log(value)} />

          <Button
            color="#FE9D2A"
            underlayColor="#e69026"
            textColor="white"
            label="Salvar"
            onPress={() => {
              
            }}
          ></Button>
            </View>
        </View>
    )
}

export default CreateHabit;