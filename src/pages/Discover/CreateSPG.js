import CheckBox from '@react-native-community/checkbox';
import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Cell, Col, Rows } from 'react-native-table-component';
import { IconBack, LogoSmpHP } from '../../assets';
import Title2 from '../../components/Title2';
import { BiruKu } from '../../utils/constant';
import PickedDateFull from '../../components/pickedDateFull';
import InputPanelNames from '../../components/InputPanelNames';
import { useNavigation } from '@react-navigation/native';
import Search from '../../components/Search';

const CreateSPG = (props) => {
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
      ['1','LVMDP','1', '28-09-2022']
      // {id:1, panelName:'LVMDP', qty:2, dueDate:'28-09-2022'},
     ],
  };
  
  return (
      <ScrollView >
        <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
            <IconBack onPress={()=> navigation.navigate('Discover')}/>
            <LogoSmpHP style={{marginLeft: 200 }}/>
        </View>
        <Title2 TxtTitle="**SURAT PERINTAH GAMBAR**" SubTitle={"Nomor: 025"}/>
        <View style={styles.container}>
        {/* <Search placeholder={"Import From SPG No . .??"}/> */}
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
  
        <View style={styles.row}>
        </View>
                
        <View style={styles.description}>
          <Text style={{color: BiruKu,  fontFamily: 'Poppins-SemiBold', fontSize: 14}}>Description : </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column', marginStart: 10}}>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                disabled={false}
                value={descConst}
                onValueChange={(newValue) => setDescConst(newValue)}
                /> 
              <Text style={styles.descTxt}>Construction</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <CheckBox
                disabled={false}
                value={descTLD}
                onValueChange={(newValue) => setDescTLD(newValue)}
                /> 
              <Text style={styles.descTxt}>Three Line Diagram</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <CheckBox
                disabled={false}
                value={descWCD}
                onValueChange={(newValue) => setDescWCD(newValue)}
                /> 
              <Text style={styles.descTxt}>Wiring Control Diagram</Text>
            </View>
            </View>
          <View style={{flexDirection: 'column', marginStart: 40}}>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                disabled={false}
                value={ralA}
                onValueChange={(newValue) => setRalA(newValue)}
                /> 
              <Text style={styles.descTxt}>Ral 7032</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                disabled={false}
                value={ralB}
                onValueChange={(newValue) => setRalB(newValue)}
                /> 
              <Text style={styles.descTxt}>Ral 2011</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                disabled={false}
                value={ralC}
                onValueChange={(newValue) => setRalC(newValue)}
                /> 
              <Text style={styles.descTxt}>Ral 6029</Text>
            </View>
          </View>
          </View>
        </View>
        <View style={{marginHorizontal: 20}}>
        <Table borderStyle={{borderWidth: .5, borderColor: BiruKu }}>
            <Row
              data={CONTENT.tableHead}
              flexArr={[0.5, 3, 0.75, 1.7]}
              style={styles.headRow}
              textStyle={styles.titleRow}
            />
            <TableWrapper style={styles.wrapper1}>
              {/* <Rows
                data={CONTENT.tableData}
                flexArr={[0.5, 3, 0.75, 1.7]}
                style={styles.row1}
                textStyle={styles.text2}
              /> */}
            </TableWrapper>
          </Table>

          <InputPanelNames />
        </View>
        <View>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Home')}>
          <Text style={{textAlign: 'center', color:'#FFF', fontFamily: 'Poppins-Bold', fontSize: 16}}>CREATE TASK</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }

export default CreateSPG

const styles = StyleSheet.create({

  headRow: { height: 35, backgroundColor: BiruKu },
  titleRow: { textAlign: 'center', color: '#FFF', fontFamily: 'Poppins-SemiBold', fontSize: 13 },

  button:{
    color: '#FFF',
    backgroundColor: BiruKu,
    marginTop: 35,
    marginHorizontal: 55,
    paddingHorizontal: 10,
    paddingVertical: 14,
    elevation: 10,
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center'
  },
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