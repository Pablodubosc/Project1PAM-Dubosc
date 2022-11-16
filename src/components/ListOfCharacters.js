import {View,TouchableOpacity, Image,  StyleSheet,Text,FlatList,Animated } from 'react-native';
import React, { useEffect, useState } from "react";
import CharacterItem from './CharacterItem';
import { useDispatch } from 'react-redux';
export default function ListOfCharacters({data,getNext,favorites}) {
  const dispatch = useDispatch();
  const [dataF, setDataF] = useState([]);
  useEffect(() => {
    console.log(data)
    setDataF(data);
  }, [data])
  const removeFromList = (id)  => {
    let arr = dataF.filter(function(item) {
      return item.id != id
    })
    setDataF(arr);
};
    return (
      <View>
      {dataF && ( <FlatList style={styles.flatlist}
            keyExtractor={item => item.id}
            data={dataF}
            renderItem={({ item }) => (
              <CharacterItem
                  item={item}
                  favorite={favorites}
                  removeFromList={removeFromList}
              />
          )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={getNext}
            onEndReachedThreshold = {0.5}
          />
      )}
      {!dataF && (
        <View>
            <Text style = {styles.noResults}> No Results Found!!</Text>
        </View>
      )}
    </View>
    )
};
const styles = StyleSheet.create({
    flatlist:{
      flexGrow: 0,
        top:60, 
        width:350,
        height:490,
    },
      separator: {
        width: '50%',
        height: 2,
        left:'25%',
        backgroundColor: 'grey',
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