import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import styles from './styles'
import Separator from '../../components/Separator';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    name?: string
    uid?: string
    permission?: number
}

const Sidebar = ({ name, uid, permission }: Props) => {

    const navigation = useNavigation()
    const [options, setOptions] = useState([
        { title: 'Desempenho', page: 'ListStudents', icon: <Feather name="trending-up" size={20} color="#6556A0" />, admin: false },
        { title: 'Turmas', page: 'Turmas', icon: <Entypo name="users" size={20} color="#6556A0" />, admin: true },
        { title: 'Configurações', page: 'EditUser', icon: <Ionicons name="settings" size={24} color="#6556A0" />, admin: false },
    ]);

    return (
        <View style={styles.container}>
            <Text style={styles.textUser}> {name}</Text>

            <FlatList
                data={options}
                keyExtractor={item => item.title}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => (
                    (item.admin && permission === 0) || !item.admin ?
                        <TouchableOpacity onPress={() => {
                            if (item.page == 'ListStudents') {
                                if (permission === 1) {
                                    navigation.navigate('PerformanceStudent', {
                                        name,
                                        uid
                                    });
                                } else {
                                    navigation.navigate('ListStudents');
                                }
                            } else {
                                navigation.navigate(item.page);
                            }
                        }}
                        >
                            <View style={styles.containerOption}>
                                {item.icon}
                                <Text style={styles.textTitle}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        null
                )}
            />
        </View>
    );

}

export default Sidebar;


