import React from 'react';
import {StyleSheet,Dimensions} from 'react-native';
import { colors } from '../constants/colors';
import CheckBox from 'react-native-check-box';

const {width,height} = Dimensions.get('window');

const Check = ({isChecked,onChange,leftText,listId}) => {
    return(
        <CheckBox
            style={{flex: 1}}
            onClick={() => onChange(listId)}
            isChecked={isChecked}
            rightText={leftText}
            rightTextStyle={
                {
                    color:isChecked?colors.placeHolderColor:colors.white,
                    height:21,
                    textDecorationLine: isChecked?'line-through':'none',
                    fontSize:18,
                    fontWeight:'500',
                }
            }
            checkBoxColor={colors.white}
            checkedCheckBoxColor={colors.secondary}
        />
    )
}

export default Check;

const styles = StyleSheet.create({
   
})