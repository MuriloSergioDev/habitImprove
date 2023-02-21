import React from 'react';
import { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import { View, Text } from 'react-native';
import styles from './style'


type Props = {
    header: string
    comfirmationString: string
    isVisible: boolean
    children?: ReactNode
    close?: Function
}

const Button = ({ header, comfirmationString, isVisible, close, children }: Props) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderText}>{header}</Text>

                    {children}
                </View>

                <TouchableOpacity onPress={() => { close() }}>
                    <Text style={{ color: '#6556A0' }}>{comfirmationString}</Text>
                </TouchableOpacity>

            </View>
            </View>
        </Modal >
    );

}

export default Button;


