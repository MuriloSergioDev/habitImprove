import { AntDesign, Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AlertModal from '../../components/AlertModal';
import Button from '../../components/Button';
import { auth } from '../../config/Firebase';
import styles from './style';

type Props = {

}

const Login = ({ }: Props) => {

    const [messageAlert, setMessageAlert] = useState('');
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const [email, setEmail] = useState('')
    const navigation = useNavigation()

    function navigateBack() {
        navigation.goBack();
    }

    function handleRecoverPassword() {        
        if (email) {
            sendPasswordResetEmail(auth,email).then(function () {
                setMessageAlert('Email para redefinição enviado')
                setModalAlertVisible(true)
            }).catch(function (error) {
                setMessageAlert('Erro ao enviar email')
                setModalAlertVisible(true)
            });
        }else{
            setMessageAlert('Escreva um email válido')
            setModalAlertVisible(true)
        }

    }

    let modalIcon = messageAlert == 'Email para redefinição enviado' ? <AntDesign name="checkcircle" size={24} color="green" /> : <Foundation name="alert" size={24} color="#e6d927" />

    return (
        <View style={styles.container}>
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

            <View style={styles.contentBox}>
                <Text style={styles.text}>Digite seu email</Text>
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
                    style={[styles.input, { marginBottom: 180 }]}
                    mode='outlined'
                    placeholder="Email"
                    value={email}
                    onChangeText={(value => setEmail(value))}
                    left={<TextInput.Icon icon="email" />}
                />
                <View style={styles.buttonBox}>
                    <Button
                        color='#FE9D2A'
                        underlayColor='#e69026'
                        textColor='white'
                        borderColor='#F0D65D'
                        label="Solicitar senha"
                        onPress={() => { handleRecoverPassword() }}></Button>
                </View>
                <View style={styles.buttonBox}>
                    <Button
                        color='black'                        
                        textColor='white'                        
                        label="Voltar"
                        onPress={() => { navigateBack() }}></Button>
                </View>
            </View>

        </View>
    )
}

export default Login;