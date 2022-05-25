import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Text,TouchableOpacity,Keyboard} from 'react-native';
import Check from '../component/Check';
import Header from '../component/Hearder';
import Input from '../component/Input';
import { colors } from '../constants/colors';
import {cloneDeep} from 'lodash';
import DeleteIcon from '../assets/svg/DeleteIcon';
import PlusIcon from '../assets/svg/PlusIcon';
import CrossIcon from '../assets/svg/CrossIcon';
import DotIcon from '../assets/svg/DotIcon';
import { data,filterData } from '../constants/data';
import { globalStyle } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ToDoList = () => {
    const [searchedData,setSearchedData] = useState('');
    const [placeholderText,setPlaceholderText] = useState('Search ...');
    const [isSearch,setIsSearch] = useState(true)
    const [list,setList] = useState(data);
    const [filter,setFilter] = useState(filterData);
    const [keyboardShow, setKeyboardShow] = useState();

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('listData', jsonValue)
        } catch (e) {
          console.log("while storing data",e)
        }
      }

    useEffect(() => {
        storeData(list)
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
              setKeyboardShow(true);
            }
          );
          const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
              setKeyboardShow(false);
            }
          );
          return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
          };
    },[])

    const cliked = (id) => {
        let newArr = [...list]; 
        newArr.forEach((each) => {
        if(each.id == id){
            each.checked = !each.checked
            each.isCompleted = !each.isCompleted
        }
        })
        setList(newArr);
    }

    const deleteTodo = (id) => {
        let newArr = [...list]; 
        for( var i = 0; i < newArr.length; i++){ 
            if (newArr[i].id === id) { 
                newArr.splice(i, 1); 
                setList(newArr)
                i--;
            }
        }
    }

    const handleSearchInput =(query)=>{
        if(searchedData === ""){
            setList(list)
        }
        setSearchedData(query)
        const copyOfTodos = cloneDeep(list)
        const filteredToDos = copyOfTodos.filter(({value})=>value.toLowerCase().includes(query.toLowerCase()))
        setList(filteredToDos)
    }

    const addToDoList = () => {
        setPlaceholderText('Add To do')
        setIsSearch(false)
    }

    const backToSearch = () => {
        setPlaceholderText('Search ...')
        setIsSearch(true)
    }

    const addNewToDo = () => {
        if(!searchedData){
            alert("please enter the name of your To do")
        }else{
            let payload = {
                id:Math.floor(Math.random() * 1000),
                value:searchedData,
                checked:false,
                isCompleted:false,
            }
            if(payload){
                setList([...list,payload])
                setPlaceholderText('Search ...')
                setIsSearch(true)
                setSearchedData('')
            }
        }
    }

    const applyFilter = async (id) => {
        try{
            let newArr = [...filter]; 
            newArr[id].isSelected = true; 
            newArr.forEach((each,index) => {
                if(each.id == id){
                    newArr[id].isSelected = true; 
                }else{
                    newArr[index].isSelected = false;
                }
            })
            setFilter(newArr);
            let compArray = [];
            if(id == 1){
                list.forEach((items) => {
                    if(items.isCompleted == true){
                        compArray.push(items)
                    }
                })
                setList(compArray)
            }else if(id == 2){
                list.forEach((items) => {
                    if(items.isCompleted == false){
                        compArray.push(items)
                    }
                })
                setList(compArray)
            }else{
                const jsonValue = await AsyncStorage.getItem('listData')
                const value = JSON.parse(jsonValue)
                setList(value)
            }
        }catch(e){
            console.log("while applying filetr ",e)
        }

    }

    return(
        <View style={styles.container}>
            <Header/>
            <Input 
                value={searchedData} 
                placeHolder={placeholderText} 
                onChange={(value) => isSearch? handleSearchInput(value): setSearchedData(value)}
                addToDo={addNewToDo}
                keyboardShow={keyboardShow}
            />
            {Array.isArray(list) && list?.map((each,index) => {
                return(
                    <View key={index} style={styles.listContainer}>
                        <Check 
                            isChecked={each.checked} 
                            onChange={(e) => cliked(e)} 
                            leftText={each.value}
                            listId={each.id}
                        />
                        <TouchableOpacity onPress={() => deleteTodo(each.id)}>
                            <DeleteIcon/>
                        </TouchableOpacity>
                    </View>
                )
            })}
            <View style={styles.bottomFooter}>
                <View style={styles.bottomContentContainer}>
                    {isSearch?(
                        <TouchableOpacity onPress={addToDoList}>
                            <PlusIcon/>
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity onPress={backToSearch}>
                            <CrossIcon/>
                        </TouchableOpacity>
                    )}
                    
                    <Text style={[styles.toDoCount,globalStyle.fontDetails]}>{list.length} items</Text>
                    <View style={styles.filterContainer}>
                        {filter.map((each,index) => {
                            return(
                                <View key={index}>
                                    <TouchableOpacity style={{borderRightWidth:index == 2?0:1,borderRightColor:index == 2?colors.primary:''}} onPress={() => applyFilter(each.id)}>
                                        <Text style={[styles.filterText,globalStyle.fontDetails]}>{each.name}</Text>
                                    </TouchableOpacity>

                                    <View style={styles.selectedIcon}>
                                        {each.isSelected === true?<DotIcon/>:null}
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ToDoList;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.primary,
    },
    heading:{
        color:colors.white,
    },
    listContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:20,
        paddingHorizontal:'2%',
        paddingVertical:'5%',
    },
    bottomFooter:{
        flex:1,
        justifyContent:"flex-end",
    },
    bottomContentContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:colors.secondary,
        paddingHorizontal:'5%',
        paddingVertical:'3%',
        alignItems:"center",
    },
    filterContainer:{
        borderWidth:1,
        borderColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:50,
        alignItems:'center',
    },
    filterText:{
        padding:"1.9%",
        color:colors.primary,
    },
    selectedIcon:{
        alignSelf:'center'
    },
    toDoCount:{
        color:colors.primary,
    }
})