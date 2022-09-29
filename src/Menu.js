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
import Dropdown from "./components/Dropdown";

const Menu = () => {
  const filter =["Name","Status","Species","Type","Gender"]
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState("");
  const [text, onChangeText]=useState("")
  const [data_filtrada,setDataFiltrada]=useState([]);
  const criterio=["Name","Status","Species","Type","Gender"]
  const [criterioElegido,setCriterio]=useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const obtener=async()=> {
    const data= await fetch('https://rickandmortyapi.com/api/character/?'+selectedFilter.toLowerCase()+"="+text).then(response => response.json());
    setDataFiltrada(data.results);
    console.log(data_filtrada);
}

const selectFilter = (item) => {
  setSelectedFilter(item);
};
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
        <Dropdown
                value={selectedFilter}
                items={filter}
                name={"Filter"}
                onSelect={(selectFilter)}
                style={styles.criterio}
        />
        

        <View style={styles.sumbitContainer}>
          <TouchableOpacity style={styles.submit} disabled={selectedFilter==""?true:false} onPress={()=>{obtener();}} >
            <Image style={styles.sumbitImage} source={require('./lupa.png')}></Image>
          </TouchableOpacity>
        </View>
        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
          width:"90%",
          borderWidth:2,
          borderRadius:40,
          top:90
          }}
        />
        <FlatList style={{flex:1,top:110}}
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
    width:"40%",
    backgroundColor:"#0096c7",
    borderRadius:25,
    height:40,
    justifyContent:"center",
    padding:20,
    top:65
  },
  inputText:{
    height:80,
    fontSize:18,
    color:"white",
    textAlign:'center',
    textAlignVertical:'center',
  },
  titulo:{
    top:60,
      fontSize:14,
      fontWeight:"900"
  },
  sumbitContainer:{
    top:55,
    paddingLeft:"80%"
  },
  sumbitImage:{
    width:35,
    backgroundColor:"#0096c7",
    borderRadius:20,
    borderWidth:1,
    borderColor:"black",
    height:35,
    color:'white',
    textAlign:'center',
    textAlignVertical:'center',
    fontSize:17,
    justifyContent:"flex-end"
  },
  criterio:{
    top:85,
      fontSize:15,
      fontWeight:"900"
  },
  pickerCont:{
    alignContent:'center',
    justifyContent:'center',
    alignSelf:'center',
    top:60
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
