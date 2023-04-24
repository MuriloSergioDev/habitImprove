import React, { FC } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";

interface Props {
  visible: boolean;
  onRequestClose: () => void;
  onLogoutPress: () => void;
}

const LogoutModal: FC<Props> = ({ visible, onRequestClose, onLogoutPress }) => {
  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Você deseja sair da sua conta?</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onRequestClose}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={onLogoutPress}
          >
            <Text style={[styles.buttonText, styles.logoutButtonText]}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
