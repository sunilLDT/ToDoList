import React from 'react';
import {StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import TickIcon from '../assets/svg/TickIcon';
import { colors } from '../constants/colors';
import {globalStyle} from '../styles/global';

const Input = ({
    value,
    placeHolder,
    onChange,
    addToDo,
    keyboardShow
}) => {
    return(
        <>
            <TextInput
                value={value}
                placeholder={placeHolder}
                style={[styles.input,globalStyle.fontDetails]}
                placeholderTextColor={colors.placeHolderColor}
                onChangeText={text => onChange(text)}
            />
            {placeHolder == "Add To do"?(
                <TouchableOpacity style={[styles.okBtn,{top:keyboardShow?"22%":"13%"}]} onPress={addToDo}>
                    <TickIcon/>
                </TouchableOpacity>
            ):null}
            
        </>
    )
}

export default Input;

const styles = StyleSheet.create({
    input:{
        color: colors.placeHolderColor,
        letterSpacing:0.5,
        padding:'3%',
        borderWidth:1,
        borderRadius:2,
        borderColor:colors.secondary,
        marginHorizontal:'1%',
        marginVertical:'2%',
    },
    okBtn:{
        position:'absolute',
        left:"90%",

    }
})