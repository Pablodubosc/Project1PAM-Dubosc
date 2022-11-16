// React
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Dropdown({ style, options, filterOptions, setOptions }) {
    const [visibility, optionsVisibility] = useState(false);
    const dropdownOptions = (option) => {
        optionsVisibility(false);
        setOptions(option);
    }

    return (
        <View style = {[style, styles.options]}>
            <View style = {styles.row}>
                <Text style= {styles.text}> {filterOptions} </Text>

                <TouchableOpacity onPress = {() => optionsVisibility(prevVisibility => !prevVisibility)} style = {styles.botonDesplegable}>
                    <Image source = {require('../../assets/flecha.png')} style = {styles.moreIcon} />
                </TouchableOpacity> 
            </View>

            {visibility && (
                <View style = {styles.optionsBox}>
                    {options.map(option => (
                        <TouchableOpacity onPress = {() => dropdownOptions(option)} key = {option} ><Text style = {styles.opciones}>{option}</Text></TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        fontSize: 17,
        backgroundColor: "#0096c7",
        borderRadius:25,
        borderColor:'black',
        borderWidth:2
    },

    botonDesplegable: {
        marginLeft: 'auto',
        backgroundColor: "#0096c7",
        height:2,
        width:33,
        right:4,
        borderRadius:20,
    },

    moreIcon: {
        width: 20, 
        height: 20,
        left:8,
        top:3,
        backgroundColor: "#0096c7",
    },

    text: {
        fontSize: 15,
        left:5,
        textAlignVertical:'center',
        color:"white",
        textAlign:'center'
    },
    
    filterOptions: {
        backgroundColor: "#0096c7",
        borderWidth: 1,
        height: 34,
        borderRadius:25,
        textAlignVertical:'center',

    },

    optionBox: {
        backgroundColor: "#0096c7",
        borderRadius:25,      
    },
    
    opciones: {
        borderWidth: 1,
        paddingLeft: 5,
        fontSize: 15,
        backgroundColor: "#0096c7",
        borderRadius:25,
        textAlignVertical:'center',
        textAlign:"center",
        color:"white",
    }
});