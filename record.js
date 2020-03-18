import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Details from './details';


export default function Record({ item, pressHandler }) {
    const unCheckedTxtStyle = {
        flex: 1,
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 20,
    }
    const unCheckedRecordStyle = {
        padding: 15,
        marginTop: 10,
        borderColor: '#0099ff',
        borderWidth: 1,
        borderStyle: 'dotted',
        borderRadius: 10,
        flexDirection: 'row'
    }
    const checkedTxtStyle = {
        flex: 1,
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 20,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }
    const checkedRecordStyle = {
        padding: 15,
        marginTop: 10,
        borderColor: '#0099ff',
        borderWidth: 1,
        borderStyle: 'dotted',
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#e6f5ff'
    }
    const [checkColor, setCheckColor] = useState(()=>{
        if(item.completed == false){
            return 'green';
        }
        else{
            return 'black';
        }
     });

    const [currTxtStyle, setCurrTxtStyle] = useState( ()=>{
        if(item.completed == false){
            return unCheckedTxtStyle;
        }
        else{
            return checkedTxtStyle;
        }
     });
    const [currStyle, setCurrStyle] = useState(()=>{
        if(item.completed == false){
            return unCheckedRecordStyle;
        }
        else{
            return checkedRecordStyle;
        }
     });
    const [disabled, setDisabled] = useState(item.completed);
    const [recordItem, setRecordItem] = useState(item);
    const changeRecordItemHandler = (val) => {
        setRecordItem(val);
    }
    const [isEM, setIsEM] = useState(false);
    const changeIEMHandler = (val) => {
        setIsEM(val);
    }
    
    
    return (
        <TouchableOpacity disabled={disabled} onPress={() => {
            changeIEMHandler(true);
        }}>
            <View style={currStyle}>
                <Details item={recordItem} chaneItem={changeRecordItemHandler} isEditMode={changeIEMHandler} isOpen={isEM} ></Details>
                <TouchableOpacity  onPress={() => {
                    if (disabled == false) {
                        setCurrTxtStyle(checkedTxtStyle);
                        setCurrStyle(checkedRecordStyle);
                        setDisabled(true);
                        setCheckColor('black');
                    }
                    else if (disabled == true) {
                        setCurrTxtStyle(unCheckedTxtStyle);
                        setCurrStyle(unCheckedRecordStyle);
                        setDisabled(false);
                        setCheckColor('green');
                    }
                }}>
                    <MaterialIcons style={{ alignSelf: 'flex-end' }} name="done" size={35}
                        color={checkColor} />
                </TouchableOpacity>
                <Text style={currTxtStyle}
                    multiline={true}
                >{recordItem.title}</Text>
                <TouchableOpacity onPress={() => {
                    pressHandler(recordItem.id);
                }}>
                    <MaterialIcons style={{ alignSelf: 'flex-end' }} name="delete-forever" size={35}
                        color='red' />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    record: {
        padding: 15,
        marginTop: 10,
        borderColor: '#0099ff',
        borderWidth: 1,
        borderStyle: 'dotted',
        borderRadius: 10,
        flexDirection: 'row'
    },
    recordText: {
        flex: 1,
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 20,
    },

});