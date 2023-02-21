import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './style';
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabNavigation = () => {
    return (
        <>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.icoWrapper}>
                        <AntDesign name="user" style={styles.ico} />
                    </View>
                    <Text style={styles.menuItemName}>Minha Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.icoWrapper}>
                        <MaterialCommunityIcons name="google-classroom" style={styles.ico} />
                    </View>
                    <Text style={styles.menuItemName}>Minhas turmas</Text>
                </TouchableOpacity>                
                <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.icoWrapper}>
                        <MaterialCommunityIcons name="google-classroom" style={styles.ico} />
                    </View>
                    <Text style={styles.menuItemName}>Minhas turmas</Text>
                </TouchableOpacity>                
            </View>
        </>
    );
}

export default TabNavigation;