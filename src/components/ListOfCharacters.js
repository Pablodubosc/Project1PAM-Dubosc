import {View, TouchableOpacity, Image,  StyleSheet,Text,FlatList, } from 'react-native';
import { useState } from 'react';


export default function ListOfCharacters({data,setModalItem,setModalVisible}) {
    const renderItem = ({item}) => (
        <View style={styles.characters}>
          <TouchableOpacity onPress={() => {setModalVisible(true);setModalItem(item)}}>
            <Image style={styles.image} source={{uri: item.image}} onPress={() => {setModalVisible(true);setModalItem(item)}} />
            </TouchableOpacity>
            <Text style={styles.name}>{item.name}</Text>
        </View>
    );
    return (
      <View>
      {data && ( <FlatList style={styles.flatlist}
            key={item => item.id}
            data={data}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
      )}
      {!data && (
        <View>
            <Text style = {styles.noResults}> No Results Found!! Try searching again </Text>
        </View>
      )}
    </View>
    )
};
const styles = StyleSheet.create({
    flatlist:{
        flex:1,
        top:30, 
        width:"80%",
        height:40
    },
    name: {
        textAlign:'center',
        textAlignVertical:'center',
        fontSize: 15,
        fontWeight: 'bold',
        top:5,
        height:40
      },
      characters: {
        flex: 1,
        backgroundColor: '#e0fbfc',
        alignItems: 'center',
        justifyContent:'center',
      },
      separator: {
        width: '100%',
        height: 2,
        backgroundColor: 'grey',
      },
      image: {
        alignContent:'center',
        justifyContent:'center',
        width: 100,
        height: 100,
        top: "8%",
        borderRadius: 20,
        borderWidth: 1,
        borderColor:"red"
      },

      noResults: {
        textAlign:'center',
        textAlignVertical:'center',
        fontSize: 15,
        fontWeight: 'bold',
        top:255,
        height:40
      },
});