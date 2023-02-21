import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { View } from 'react-native';
import styles from './style'
import StudentModal from '../../components/StudentModal'
import { Entypo } from '@expo/vector-icons';
import Separator from '../../components/Separator';
import { UserInterface } from '../../interface/interface';
import SearchBox from '../../components/SearchBox';
import { db } from '../../config/Firebase';
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase';
import AlertModal from '../../components/AlertModal';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import Header from '../../components/Header';
import style from './style';

const CreateTurma = ({ route }) => {

    const navigation = useNavigation();
    const [messageAlert, setMessageAlert] = useState('');
    const [search, setSearch] = useState<string>('')
    const [students, setStudents] = useState<UserInterface[]>()
    const [modalTurmaVisible, setModalTurmaVisible] = useState(false);
    const turmasTemp = []
    const [turmas, setTurmas] = useState([]);
    //,'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'
    const [turma, setTurma] = useState();
    const studentsTemp = []
    const [user, setUser] = useState<UserInterface>()
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    let userTemp: UserInterface = {

    }

    useEffect(() => {
        getStudents()
        getTurmas()
        getUser()
    }, [])

    async function getStudents() {
        while(studentsTemp.length){
            studentsTemp.pop()
        }
        try {
            const data = await db
                .collection('users')
                .where('permission', '==', 1)
                .get()

            data.forEach((doc) => {
                //console.log(doc.data())
                studentsTemp.push(doc.data())
            })
            setStudents(studentsTemp)
        }
        catch (error) {
            alert(error)
        }
    }

    async function getUser() {
        try {
            const data = await db
                .collection('users')
                .where('uid', '==', firebase.auth().currentUser.uid)
                .get()

            data.forEach((doc) => {

                const values = {
                    uid: doc.get("uid"),
                    name: doc.get("name"),
                    turma: doc.get("turma"),
                    permission: doc.get("permission"),
                }
                userTemp = values
            })

            setUser(userTemp)
        }
        catch (error) {
            alert(error)
        }
    }

    async function getTurmas() {
        try {
            const data = await db
                .collection('turmas')
                .where('status', '==', true)
                .get()

            data.forEach((doc) => {

                const turma = {
                    value: doc.get("title"),
                    label: doc.get("title"),
                }
                //console.log(turma)
                turmasTemp.push(turma)
            })
            setTurmas(turmasTemp)
        }
        catch (error) {
            alert(error)
        }
    }    

    function navigateToCharts(data) {
        navigation.navigate('PerformanceStudent', {
            name: data.name,
            uid: data.uid
        });
    }

    function filterBySearch(Student: UserInterface) {
        if (Student.name?.toLocaleLowerCase()?.indexOf(search.toLowerCase()) === -1)
            return null
        if (Student.turma !== turma && turma != null)
            return null

        return Student
    }

    const filtered = students?.filter(filterBySearch)
    let modalIcon = messageAlert == 'Aluno excluido com sucesso' ? <AntDesign name="checkcircle" size={24} color="green" /> : <Foundation name="alert" size={24} color="#e6d927" />

    return (
        <SafeAreaView style={style.container} >
            <Header/>
            <AlertModal
                header={messageAlert}
                comfirmationString='Ok'
                isVisible={modalAlertVisible}
                close={() => {
                    setModalAlertVisible(false)
                }}>
                {modalIcon}
            </AlertModal>
            <View style={styles.inputBox}>
                <Text style={styles.textTurma}>Turma</Text>
                <RNPickerSelect
                    placeholder={{ label: 'Selecione uma turma', value: null }}
                    value={turma}
                    onValueChange={(value) => setTurma(value)}
                    items={turmas}
                    style={pickerSelectStyles}
                />
            </View>
            <View>
                <SearchBox onChangeText={(text) => setSearch(text)} value={search} />
            </View>

            {
                filtered != null ?
                    <FlatList
                        data={filtered}
                        keyExtractor={item => item.uid}
                        ItemSeparatorComponent={() => <Separator />}
                        renderItem={({ item }) => (
                            <StudentModal
                                showAlertModalSucess={() => { 
                                    getStudents()
                                    setMessageAlert('Aluno excluido com sucesso')
                                    setModalAlertVisible(true)
                                }}
                                showAlertModalFail={() => { 
                                    setMessageAlert('Erro ao excluir aluno')
                                    setModalAlertVisible(true)
                                }}
                                user={item}
                                colorStatus="green"
                                onPress={() => { navigateToCharts(item) }}><Entypo name="emoji-happy" size={24} color="green" /></StudentModal>
                        )}
                    />
                    : <ActivityIndicator animating={true} color='#6556A0' size={50} />
            }

        </SafeAreaView>
    )
}

export default CreateTurma;

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