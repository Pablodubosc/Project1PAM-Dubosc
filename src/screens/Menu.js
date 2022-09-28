import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
  Modal
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const Menu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const [text, onChangeText]=useState("")
  const [data_filtrada,setDataFiltrada]=useState([]);
  const criterio=["Name","Status","Species","Type","Gender"]
  const [criterioElegido,setCriterio]=useState("");
  const obtener=async()=> {
    const data= await fetch('https://rickandmortyapi.com/api/character/?'+criterioElegido.toLowerCase()+"="+text).then(response => response.json());
    setDataFiltrada(data.results);
    console.log(data_filtrada);
}


  const renderItem = ({item}) => (
      <View>
          <Image style={styles.image} source={{uri: item.image}} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.info} onPress={() => {setModalVisible(true);setModalItem(item)}}>Show more info</Text>
      </View>
  );
  
  return (
    <View style={styles.container}> 
        <Text style={styles.titulo}>SEARCH YOUR RICK & MORTY CHARACTER!</Text>
        <View style={styles.inputView}>
          <TextInput placeholder="Keyword" style={styles.inputText} placeholderTextColor="white" onChangeText={(text) => {onChangeText(text)}} value={text}></TextInput>
        </View>
        <Text style={styles.criterio}>Using the filter</Text>
        <View style={styles.pickerCont}>
        <SelectDropdown
          data={criterio}
          onSelect={(selectedItem, index) => {
            setCriterio(selectedItem);
            }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          defaultButtonText={"Filter"}
          buttonStyle={{height:45,width:175,borderRadius:20,backgroundColor:"#0096c7"}}
          buttonTextStyle={{color:'white',fontSize:15}}
          />
        </View>

        <View style={styles.sumbitContainer}>
          <TouchableOpacity style={styles.submit} disabled={criterioElegido==""?true:false} onPress={()=>{obtener();}} >
            <Text style={styles.sumbitText}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList style={{flex:1,top:160}}
          key={item => item.id}
          data={data_filtrada}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
       <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}>
            <View style={styles.modal} >
              <Image style={styles.image} source={{uri: modalItem.image}} />
                <Text style={styles.modalText}>Name : {modalItem.name}</Text>
                <Text style={styles.modalText}>Status: {modalItem.status}</Text>
                <Text style={styles.modalText}>Species: {modalItem.species}</Text>
                <Text style={styles.modalText}>Type: {modalItem.type}</Text>
                <Text style={styles.modalText}>Gender: {modalItem.gender}</Text>
                <Text style={styles.modalHide} onPress={() => setModalVisible(!modalVisible)}>Hide info</Text>
            </View>
          </Modal>
        </View>
    </View>  
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0fbfc',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
inputView:{
    width:"60%",
    backgroundColor:"#0096c7",
    borderRadius:25,
    height:50,
    justifyContent:"center",
    padding:20,
    top:"10%"
  },
  inputText:{
    height:80,
    fontSize:18,
    color:"white",
    textAlign:'center',
    textAlignVertical:'center',
  },
  titulo:{
    top:"10%",
      fontSize:14,
      fontWeight:"900"
  },
  sumbitContainer:{
    position:"absolute"
  },
  sumbitText:{
    width:130,
    backgroundColor:"#0096c7",
    borderRadius:25,
    height:40,
    color:'white',
    textAlign:'center',
    textAlignVertical:'center',
    top:220,
    fontSize:17
  },
  criterio:{
    top:"12%",
      fontSize:14,
      fontWeight:"900"
  },
  pickerCont:{
    alignContent:'center',
    justifyContent:'center',
    alignSelf:'center',
    top:"12%"
  },
  name: {
    textAlign:'center',
    textAlignVertical:'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  info: {

    backgroundColor:"#90e0ef",
    borderRadius:25,
    height:20,
    fontSize: 15,
    fontWeight: 'bold',
    margin: 10,
    width: '50%',
    textAlign:'center',
    textAlignVertical:'center',
    alignSelf:'center',
  },

  modal: {
    flex: 1,
    backgroundColor: '#e0fbfc',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  modalText:{
    textAlign:'center',
    textAlignVertical:'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 7,
    top: "5%"
  },

  modalHide:{
    width:"50%",
    fontWeight: 'bold',
    backgroundColor:"#90e0ef",
    borderRadius:25,
    height:50,
    top:"5%",
    textAlign:'center',
    textAlignVertical:'center',
    fontSize: 20,
  },
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: 'grey',
    top: "-1%"
  },
  image: {
    alignContent:'center',
    justifyContent:'center',
    width: 300,
    height: 330,
    top: "2%",
    borderRadius: 20,
    borderWidth: 3,
    borderColor:"red"
  }
});
