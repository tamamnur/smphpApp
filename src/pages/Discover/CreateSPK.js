import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell, Col, Rows } from 'react-native-table-component';
import { IconBack, LogoSmpHP } from '../../assets';
import Search from '../../components/Search';
import Title2 from '../../components/Title2';
import { BiruKu } from '../../utils/constant';
import { useNavigation } from '@react-navigation/native';
import PickedDateFull from '../../components/pickedDateFull';

const CreateSPK = (props) => {
  const navigation = useNavigation();
  const [onChangeText, projectName, customer] = useState(state);
  const [state, setState] = useState();
  const [descConst, setDescConst] = useState(false);
  const [descTLD, setDescTLD] = useState(false);
  const [descWCD, setDescWCD] = useState(false);
  const [ralA, setRalA] = useState(false);
  const [ralB, setRalB] = useState(false);
  const [ralC, setRalC] = useState(false);

const CONTENT = {
  tableHead: [ 'No.', 'Panel Name', 'QTY', 'Due Date'],
  tableData: [
    ['1','LVMDP', '1', '28-09-2022'],
    ['2','CAPACITOR BANK 1200kVAR', '1', '28-09-2022'],
    ['3','MDP', '1', '28-09-2022'],
    ['4','SDP-HUNIAN', '1', '28-09-2022'],
    ['5','MDP-HUNIAN', '1', '28-09-2022']
  ],
};

// _alertIndex(index) {
  //   Alert.alert(`This is row ${index + 1}`);
  // }
  
    // const element = (data, index) => (
      //   <TouchableOpacity onPress={() => this._alertIndex(index)}>
      //     <View style={styles.btn}>
      //       <Text style={styles.btnText}>Cek</Text>
      //     </View>
      //   </TouchableOpacity>
      // );
      
    return (
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <IconBack onPress={()=> this.props.navigation.navigate('Discover')}/>
            <LogoSmpHP style={{marginLeft: 200 }}/>
        </View>
        <Title2 TxtTitle="SURAT PERINTAH KERJA" SubTitle={"No: 038"}/>
        <Search placeholder={"Import From SPG No . .??"}/>
        <View style={styles.container}>
          <View style={styles.label}>
              <Text style={styles.label}>Project Name </Text>
              <Text style={styles.label}>Customer </Text>
              <Text style={styles.label}>Date </Text>
          </View>
          <View style={styles.values} >
              <TextInput 
                  style={styles.txtInput}
                  key={projectName}                    
                  onChangeText={projectName=>setState({projectName})}
              />
              <TextInput 
                  style={styles.txtInput}
                  key={customer}
                  onChangeText={customer=>setState({customer})}
              />
              <Text style={styles.txtInput}>
              <PickedDateFull />
              </Text>
          </View>
        </View>
        <View style={{padding: 5,marginVertical: 15,borderColor: BiruKu, borderRadius: 5, height: 35,
           borderColor: BiruKu, borderWidth: 2}}>
          <Text style={{color: BiruKu,  fontFamily: 'Poppins-SemiBold'}}>Description : </Text>
        
          {/* <Table style={{height: 35}}>
          <Row data={state.tableHead} style={styles.headName} textStyle={styles.rowFill}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.description}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={(cellData) } textStyle={styles.text}/>
                    // <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                    ))
                }
              </TableWrapper>
            ))
          }
        </Table> */}

        <View style={styles.container1}>
          <Table borderStyle={{ borderWidth: 1, borderWidth: 1, borderColor: BiruKu }}>
            <Row
              data={CONTENT.tableHead}
              flexArr={[0.5, 3, 0.75, 1.7]}
              style={styles.head1}
              textStyle={styles.text1}
              />
            <TableWrapper style={styles.wrapper1}>
              <Rows
                data={CONTENT.tableData}
                flexArr={[0.5, 3, 0.75, 1.7]}
                style={styles.row1}
                textStyle={styles.text2}
              />
            </TableWrapper>
          </Table>
        </View>

        </View>
        {/* <Table borderStyle={{borderColor: BiruKu}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {
            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
              {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table> */}

      </ScrollView>
    )
  }
  
export default CreateSPK;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  description: {flexDirection: 'row', borderWidth: 1, borderColor: BiruKu},
  headName: { height: 40, backgroundColor: BiruKu },
  rowFill: { margin: 6, fontFamily: 'Poppins-SemiBold', color: '#FFF' },

  container1: { flex: 2, backgroundColor: '#fff', marginTop: 8, marginHorizontal: -7 },
  head1: { height: 40, backgroundColor: BiruKu },
  wrapper1: { borderWidth: 1, borderColor: BiruKu },
  row1: { height: 30, borderWidth: 1, borderColor: BiruKu },
  text1: { textAlign: 'center', color: '#FFF', fontFamily: 'Poppins-SemiBold', fontSize: 12 },
  text2: { fontSize: 11, fontFamily: 'Poppins-Regular', paddingLeft: 10 },

  txtInput:{
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 5,    
    height: 35,
    padding: 10,
    marginVertical: 8,
    width: 240
},
container:{
    flexDirection: 'row', marginTop: -10
},
label:{
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginBottom: 5,
    marginTop:2,
    padding: 10,
    color: BiruKu
},
values:{
    marginBottom: 15,
    height: 40,
    width: 230,
    paddingVertical: 10,
},
description:{
  flex: 1,
  padding: 5,
  marginBottom: 10,
  marginHorizontal: 20,
  borderColor: BiruKu, 
  borderRadius: 5, 
  borderWidth: 2,
  height: 130,
},
descTxt:{
  color: BiruKu,
  marginTop: 6,
  fontFamily: 'Poppins-Medium',
  fontSize: 12
}
});