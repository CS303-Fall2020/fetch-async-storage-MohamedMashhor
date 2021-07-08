import React, { useState } from 'react';
import {
    StyleSheet, View, TextInput, Modal, TouchableOpacity,
    TouchableWithoutFeedback, Keyboard, Text, Button, Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Details({ item, chaneItem, isEditMode, isOpen }) {
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [text, setText] = useState(item.title);
    const changeHandler = (val) => {
        setText(val);
        setDisableEdit(false);
    }
    const [disableEdit, setDisableEdit] = useState(true);
    return (
        <View>
            <Modal visible={isOpen}

                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.header} >
                        <TouchableOpacity onPress={() => isEditMode(false)}>
                                <AntDesign style={{ alignSelf: 'flex-end' }} name="back" size={35} />
                            </TouchableOpacity>
                            <Text style={styles.title}>            ToDo List</Text>
                            
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.txt}>Title:</Text>
                            <TextInput
                                style={styles.input}
                                multiline={true}
                                defaultValue={item.title}
                                onChangeText={changeHandler}

                            />
                            <Button disabled={disableEdit} onPress={() => {
                                if (text != '') {
                                    chaneItem({ userId: item.userId,id: item.id ,title: text, completed: item.completed });
                                    isEditMode(false);
                                    setDisableEdit(true);
                                }
                                else {
                                    Alert.alert('Error', 'Cannot Add New Empty Record!', [{ text: 'Ok' }]);
                                }

                            }}
                                title='Edit' color='#0099ff' />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    detailsContainer: {
        margin: 20,
    },
    container: {
        flex: 1,

    },
    header: {
        flexDirection: 'row',
        height: 70,
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#0099ff',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    title: {
        flex: 1,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#0099ff',
        fontWeight: 'bold',
        fontSize: 20
    },

});