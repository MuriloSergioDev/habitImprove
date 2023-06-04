import { AntDesign, Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AlertModal from '../../components/AlertModal';
import Button from '../../components/Button';
import { auth, db } from '../../config/Firebase';
import { HabitoInterface, UserInterface } from '../../interface/interface';
import styles from './styles';

type Props = {

}

const SignUp = ({ }: Props) => {

    const navigation = useNavigation<any>();
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const [comfirmPassword, setComfirmPassword] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [user, setUser] = useState<UserInterface>(
        {
            name: '',
            email: '',
            password: '',
            pontuacao: 0,
            bonus: 1,
        }
    )

    const hoje = new Date();
    hoje.setHours(8);
    hoje.setMinutes(0);
    hoje.setSeconds(0);
    hoje.setMilliseconds(0);

    const habito3 : HabitoInterface = {
        titulo: "8h de sono",
        horario: hoje,
        recorrencia: "d",
        diasDaSemana: [],
        contador: '0',
        diasSeguidos: '0',
    };

    const habito2 : HabitoInterface = {
        titulo: "10 min cardio",
        horario: hoje,
        recorrencia: "d",
        diasDaSemana: [],
        contador: '0',
        diasSeguidos: '0',
    };

    const habito1 : HabitoInterface = {
        titulo: "Comer uma maça",
        horario: hoje,
        recorrencia: "d",
        diasDaSemana: [],
        contador: '0',
        diasSeguidos: '0',
    };

    async function handleSignUp() {

        if (user.name && user.email && user.password && comfirmPassword) {
            console.log(user)
            try {
                const response = await createUserWithEmailAndPassword(auth ,user.email, user.password);

                await sendEmailVerification(response.user);

                if (response.user.uid) {
                    const data = {
                        uid: response.user.uid,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        pontuacao: 0,
                        bonus: 1,
                    }

                    const docRef = doc(db, "users", response.user.uid);
                    setDoc(docRef, data, { merge: true });

                    handleCreateNewHabito(response.user.uid, habito1);
                    handleCreateNewHabito(response.user.uid, habito2);
                    handleCreateNewHabito(response.user.uid, habito3);

                    setMessageAlert('Cadastro realizado com sucesso')
                    setModalAlertVisible(true)
                }
            }
            catch (error) {
                setMessageAlert('Erro ao realizar cadastro')
                setModalAlertVisible(true)
                console.log(error);
                //alert(error)
            }
        } else {
            setMessageAlert('Preencha todos os campos')
            setModalAlertVisible(true)
        }

    }

    async function handleCreateNewHabito(uid: string , habito: HabitoInterface) {
        try {
          if (habito.titulo) {

            const data = {
                titulo: habito.titulo ?? '',
                horario: habito.horario ?? '',
                recorrencia: habito.recorrencia ?? '',
                diasDaSemana: habito.diasDaSemana ?? '',
                diaMes: habito.diaMes ?? '',
                contador: habito.contador ?? '',
                diasSeguidos: habito.diasSeguidos ?? '',
                dataUltimaRealizacao : null,
                dataCriacao : new Date(),
                powerup : true,
                uid: uid,
            }
            console.log(data);


            const dbRef = collection(db, "habits");
            addDoc(dbRef, data)
          } else {
          }
        } catch (error) {
          console.log(error);
          //alert(error)
        }
      }

    function navigateBack() {
        navigation.goBack();
    }

    let modalIcon = messageAlert == 'Cadastro realizado com sucesso' ? <AntDesign name="checkcircle" size={24} color="green" /> : <Foundation name="alert" size={24} color="#e6d927" />

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={styles.logo}
                        source={require("../../../assets/logo.png")}></Image>

                    <AlertModal
                        header={messageAlert}
                        comfirmationString='Ok'
                        isVisible={modalAlertVisible}
                        close={() => {
                            setModalAlertVisible(false)
                            if (messageAlert == 'Cadastro realizado com sucesso') {
                                navigateBack()
                            }
                        }}>
                        {modalIcon}
                    </AlertModal>

                    <View style={styles.inputBox}>
                        {/* @ts-ignore */}

                        <TextInput
                            theme={{
                                colors: {
                                    placeholder: '#FE9D2A', text: '#FE9D2A', primary: '#FE9D2A'
                                }
                            }}
                            style={styles.input}
                            mode='flat'
                            label="Nome"
                            value={user.name}
                            onChangeText={(value => setUser(prevState => { return { ...prevState, name: value } }))}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        {/* @ts-ignore */}
                        <TextInput
                            theme={{
                                colors: {
                                    placeholder: '#FE9D2A', text: '#FE9D2A', primary: '#FE9D2A'
                                }
                            }}
                            style={styles.input}
                            mode='flat'
                            label="Email"
                            value={user.email}
                            onChangeText={(value => setUser(prevState => { return { ...prevState, email: value } }))}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        {/* @ts-ignore */}
                        <TextInput
                            theme={{
                                colors: {
                                    placeholder: comfirmPassword === user.password ? '#FE9D2A' : 'red', text: comfirmPassword === user.password ? '#FE9D2A' : 'red', primary: comfirmPassword === user.password ? '#FE9D2A' : 'red'
                                }
                            }}
                            style={styles.input}
                            secureTextEntry={true}
                            mode='flat'
                            label="Senha"
                            value={user.password}
                            onChangeText={(value => setUser(prevState => { return { ...prevState, password: value } }))}
                        />
                    </View>

                    <View style={styles.inputBox}>
                        {/* @ts-ignore */}
                        <TextInput
                            theme={{
                                colors: {
                                    placeholder: comfirmPassword === user.password ? '#FE9D2A' : 'red', text: comfirmPassword === user.password ? '#FE9D2A' : 'red', primary: comfirmPassword === user.password ? '#FE9D2A' : 'red'
                                }
                            }}
                            style={styles.input}
                            secureTextEntry={true}
                            mode='flat'
                            label="Confirmar senha"
                            value={comfirmPassword}
                            onChangeText={(value => setComfirmPassword(value))}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonBox}>
                            <Button
                                color='#FE9D2A'
                                underlayColor='#e69026'
                                textColor='white'
                                label="CRIAR CONTA"
                                onPress={() => { handleSignUp() }}></Button>
                        </View>
                        <View style={styles.buttonBox}>
                            <Button
                                color='black'
                                textColor='white'
                                label="JÁ POSSUO CONTA"
                                onPress={() => { navigateBack() }}></Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default SignUp;

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