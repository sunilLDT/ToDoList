import React from 'react';
import {Text,StyleSheet,SafeAreaView,Dimensions} from 'react-native';
import { colors } from '../constants/colors';
import {globalStyle} from '../styles/global';

const {height} = Dimensions.get('window');

const Header = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={[styles.heading,globalStyle.fontDetails]}>To Do List</Text>
        </SafeAreaView>
    )
}

export default Header;

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.secondary,
        height:height * 0.1,
        justifyContent:'center',
    },
    heading:{
        paddingHorizontal:'4%',
        color:colors.primary,
    }
})