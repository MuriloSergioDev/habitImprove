import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../config/Firebase';
import { UserInterface } from '../../interface/interface';


type Props = {
    user: UserInterface
    colorStatus?: string
    onPress?: any
    children?: ReactNode
    showAlertModalSucess?: Function
    showAlertModalFail?: Function
}

const StudentModal = ({ user, colorStatus = "black", onPress, children, showAlertModalSucess, showAlertModalFail }: Props) => {

    const navigation = useNavigation();


    // useEffect(() => {
    //     getUser()
    // })

    function handleAlunoDelete() {
        console.log('deletar aluno')

        // Works on both Android and iOS
        Alert.alert(
            'Deseja mesmo excluir o aluno',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        db.collection("users").doc(user.uid).delete().then(function () {
                            //console.log("Document successfully deleted!");
                            showAlertModalSucess();
                        }).catch(function (error) {
                            //console.error("Error removing document: ", error);
                            showAlertModalFail();
                        });
                    }
                }
            ],
            { cancelable: false }
        );



    }

    function handleAlunoEdit() {
        // console.log('editar aluno')
        navigation.navigate('EditPerformance', {
            name : user.name,
            uid: user.uid,
            turma: user.turma
        });
    }

    function rightActions(progress, dragX) {
        return (
            <>
                <TouchableOpacity onPress={() => { handleAlunoDelete() }}>
                    <View style={styles.deleteAction}>
                        <Text style={styles.textAction}>Excluir</Text>
                        <Feather name="trash-2" size={20} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { handleAlunoEdit() }}>
                    <View style={styles.editAction}>
                        <Text style={styles.textAction}>Editar</Text>
                        <Feather name="trash-2" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </>
        );
    }

    return (
        <Swipeable renderRightActions={rightActions} >
            <TouchableHighlight onPress={onPress} >

                <View style={styles.container} >
                    {children}
                    <View style={styles.viewBox}>
                        <Text style={styles.textTitle}>{user.name}</Text>
                    </View>
                </View>

            </TouchableHighlight>
        </Swipeable>
    );

}



export default StudentModal;


