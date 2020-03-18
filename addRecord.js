import React, { useState } from 'react';
import {
    StyleSheet, Text, View, TextInput, Button, Modal, TouchableOpacity,
    TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';




export default function AddNewRecord({ addNewHandler }) {
    const [text, setText] = useState('');
    const changeHandler = (val) => {
        setText(val);
    }
    const [openAddNewModal, setOpenAddNewModal] = useState(false);
    return (
        <View>
            <TouchableOpacity onPress={() => setOpenAddNewModal(true)}>
                <Entypo name="add-to-list" size={40} />
            </TouchableOpacity>
            <Modal visible={openAddNewModal}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.header} >
                            <Text style={styles.title}>ToDo List</Text>
                            <TouchableOpacity onPress={() => setOpenAddNewModal(false)}>
                                <AntDesign style={{ alignSelf: 'flex-end' }} name="back" size={35} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.txt}>Title:</Text>
                            <TextInput
                                ref={input => { this.textInput = input }}
                                multiline={true}
                                style={styles.input}
                                placeholder='What you want ToDo?...'
                                onChangeText={changeHandler}
                            />
                            <View>
                                <Button onPress={() => {
                                    addNewHandler(text);
                                    this.textInput.clear(); setOpenAddNewModal(false)
                                }}
                                    title='Add New' color='#0099ff' />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    txt:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    detailsContainer:{
        margin:20,
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
        flex:1,
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