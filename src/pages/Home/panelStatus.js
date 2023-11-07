import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Title2 from '../../components/Title2'
import { BiruKu } from '../../utils/constant'
import EndOf from '../../components/Footer'
import firestore from '@react-native-firebase/firestore'
import FormatDate2 from '../../components/FormatDate2'
import LoadingComponent from '../../components/LoadingComponentS'

const PanelStatus = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const [date, setDate] = useState({
    submit: '---',   revisi: '---',       approve: '---',
    constPO: '---',  constSched: '---',   constReal: '---',
    busbarPO: '---', busbarSched: '---',  busbarReal:'---',
    compPO: '---',   compSched: '---',    compReal:'---',
    layoutStart: '---', layoutFinish: '---',
    mechStart: '---', mechFinish: '---',
    wiringStart: '---', wiringFinish: '---',
    tested: '---', delivered: '---', 
  })
  const monitorId = props.route.params.monitoringId
  const projectName= props.route.params.projectName
  const panelName = props.route.params.panelName
  // console.log('onPstatus',monitorId, projectName, panelName)

  const fetchData = async () => {
    setIsMounted(true);
    try {
    const id = monitorId ? monitorId.substring(12) : null
    const monitoring = firestore().collection('Monitoring').doc(id)
    const Submission = await monitoring.collection('Shopdrawing').doc('Submission').get();
    let submitted;
    if(Submission && Submission.data()) {
      submitted = Submission.data().DateSubmit
    }
    const Revision = await monitoring.collection('Shopdrawing').doc('Revision').get();
    let revision
    if(Revision && Revision.data()) {
      revision = Revision.data().DateRevisi
    }
    const Approved = await monitoring.collection('Shopdrawing').doc('Approval').get();
    let approve
    if(Approved && Approved.data()) {
      approve = Approved.data().DateApprove
    }

    const Box = await monitoring.collection('Procurement').doc('Construction').get();
    let constPO; let constSched; let constReal;
    if(Box && Box.data()) {
      constPO = Box.data().Order;
      constSched = Box.data().Schedule;
      constReal = Box.data().Realized;
    } 
    const Bubsar = await monitoring.collection('Procurement').doc('Busbar').get();
    let busbarPO; let busbarSched; let busbarReal;
    if(Bubsar && Bubsar.data()) {
      busbarPO = Bubsar.data().Order;
      busbarSched = Bubsar.data().Schedule;
      busbarReal = Bubsar.data().Realized;
    }
    const Comp = await monitoring.collection('Procurement').doc('Component').get();
    let compPO; let compSched; let compReal;
    if (Comp && Comp.data()) {
      compPO = Comp.data().Order;
      compSched = Comp.data().Schedule;
      compReal = Comp.data().Realized;
    }
    const Layout = await monitoring.collection('Fabrication').doc('Layouting').get();
    let layoutStart; let layoutFinish;
    if(Layout && Layout.data()) {
      layoutStart = Layout.data().Start;
      layoutFinish = Layout.data().Finish
    }
    const Mechanic = await monitoring.collection('Fabrication').doc('Mech').get();
    let mechStart; let mechFinish;
    if(Mechanic && Mechanic.data()) {
      mechStart = Mechanic.data().Start;
      mechFinish = Mechanic.data().Finish
    }
    const Wiring = await monitoring.collection('Fabrication').doc('Wiring').get();
    let wiringStart; let wiringFinish;
    if(Wiring && Wiring.data()) {
      wiringStart = Wiring.data().Start;
      wiringFinish = Wiring.data().Finish
    }
    const Tested = await monitoring.collection('End').doc('Tested').get();
    let tested;
    if (Tested && Tested.data()) {
      tested = Tested.data().Tested
    }
    const Sent = await monitoring.collection('End').doc('Sent').get();
    let delivered;
    if (Sent && Sent.data()) {
      delivered = Sent.data().Sent
    }

    setDate({
      submit: submitted ? FormatDate2(submitted.toDate()) : '---',
      revisi: revision ? FormatDate2(revision.toDate()) : '---',
      approve: approve ? FormatDate2(approve.toDate()) : '---',

      constPO: constPO ? FormatDate2(constPO.toDate()) : '---',
      constSched: constSched ? FormatDate2(constSched.toDate()) : '---',
      constReal: constReal ? FormatDate2(constReal.toDate()) : '---',

      busbarPO: busbarPO ? FormatDate2(busbarPO.toDate()) : '---',
      busbarSched: busbarSched ? FormatDate2(busbarSched.toDate()) : '---',
      busbarReal: busbarReal ? FormatDate2(busbarReal.toDate()) : '---',

      compPO: compPO ? FormatDate2(compPO.toDate()) : '---',
      compSched: compSched ? FormatDate2(compSched.toDate()) : '---',
      compReal: compReal ? FormatDate2(compReal.toDate()) : '---',

      layoutStart: layoutStart ? FormatDate2(layoutStart.toDate()) : '---',
      layoutFinish: layoutFinish ? FormatDate2(layoutFinish.toDate()) : '---',
      mechStart: mechStart ? FormatDate2(mechStart.toDate()) : '---',
      mechFinish: mechFinish ? FormatDate2(mechFinish.toDate()) : '---',
      wiringStart: wiringStart ? FormatDate2(wiringStart.toDate()) : '---',
      wiringFinish: wiringFinish ? FormatDate2(wiringFinish.toDate()) : '---',

      tested : tested ? FormatDate2(tested.toDate()) : '---',
      delivered : delivered ? FormatDate2(delivered.toDate()) : '---'
    })
    setIsLoading(false)
    } catch (error) {
      ToastAndroid.show('Error fetching data: ', error, ToastAndroid.SHORT)
      console.error('Error fetching data: ', error)
      setIsLoading(false)
    }  
  }
  useEffect(() => {
    setIsMounted(true);
    fetchData();
    return;
  },[]);

  return (
    <ScrollView style={{marginHorizontal:10, height: '80%'}}>
      <Header/><Title2 TxtTitle={panelName} SubTitle={'Project : '+projectName}/>
      {isLoading ? (<LoadingComponent/>) : (<>
        <View style={{flexDirection:'row', width:'100%', marginVertical: 8, borderWidth: 2.5, borderColor: BiruKu}}>
        <Text style={[{width: '34%', textAlignVertical: 'center'},styles.title]}>Shopdrawing</Text>
        <View style={{flexDirection: 'column', borderLeftWidth: 1.6, borderRightWidth: 1, borderColor: BiruKu}}>
          <View style={{flexDirection: 'row',height: 35, borderBottomWidth:1, borderColor: BiruKu}}>
            <Text style={[styles.title, styles.border, {width: '27.6%'}]}>Submit</Text>
            <Text style={[styles.title, styles.border, {width: '27.6%'}]}>Revision</Text>
            <Text style={[styles.title, styles.border, {width: '27.6%'}]}>Approve</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.update, styles.border, {width: '27.6%', borderBottomWidth: 0}]}>{date.submit}</Text>
            <Text style={[styles.update, styles.border, {width: '27.6%', borderBottomWidth: 0}]}>{date.revisi}</Text>
            <Text style={[styles.update, styles.border, {width: '27.6%', borderBottomWidth: 0}]}>{date.approve}</Text>
          </View>  
        </View>
      </View>
      <View style={{flexDirection: 'row', width: '100%', marginVertical: 8, borderWidth: 2.5, borderColor: BiruKu}}>
        <View style={{width:'34%', alignSelf: 'center', borderColor: BiruKu}}>
          <Text style={[styles.title, {borderBottomWidth:2, borderColor: BiruKu, height: 35}]}>Procurement</Text>
          <Text style={styles.stage}>Construction</Text>
          <Text style={styles.stage}>Busbar Cu</Text>
          <Text style={styles.stage}>Component</Text>
        </View>
        <View style={{flexDirection: 'column', borderLeftWidth: 1.6, borderRightWidth: 1, borderColor: BiruKu}}>
          <View style={{flexDirection: 'row',height: 35, borderBottomWidth: 1, borderColor: BiruKu}}>
            <Text style={[styles.title, styles.border, {width: '27.6%'}]}>Order</Text>
            <Text style={[styles.title, styles.border, {width: '27.6%'}]}>Schedule</Text>
            <Text style={[styles.title, styles.border, {width: '27.6%'}]}>Realized</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.update, styles.border, {width: '27.6%'}]}>{date.constPO}</Text>
            <Text style={[styles.update, styles.border, {width: '27.6%'}]}>{date.constSched}</Text>
            <Text style={[styles.update, styles.border, {width: '27.6%'}]}>{date.constReal}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.update, styles.border, {width: '27.6%'}]}>{date.busbarPO}</Text>
            <Text style={[styles.update, styles.border, {width: '27.6%'}]}>{date.busbarSched}</Text>
            <Text style={[styles.update, styles.border, {width: '27.6%'}]}>{date.busbarReal}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.update, styles.border, {width: '27.6%', borderBottomWidth: 0}]}>{date.compPO}</Text>
            <Text style={[styles.update, styles.border, {width: '27.6%', borderBottomWidth: 0}]}>{date.compSched}</Text>
            <Text style={[styles.update, styles.border, {width: '27.6%', borderBottomWidth: 0}]}>{date.compReal}</Text>
          </View>  
        </View>
      </View>
      <View style={{flexDirection:'row', width:'100%', marginVertical: 8, borderWidth: 2.5, borderColor: BiruKu}}>
        <View style={{width:'34%', alignSelf: 'center'}}>
          <Text style={[styles.title, {borderColor: BiruKu, borderBottomWidth:2, height: 35}]}>Fabrication</Text>
          <Text style={styles.stage}>Layouting</Text>
          <Text style={styles.stage}>Mechanic</Text>
          <Text style={styles.stage}>Wiring</Text>
        </View>
        <View style={{flexDirection: 'column', borderLeftWidth: 1.6, borderRightWidth: 1, borderColor: BiruKu}}>
          <View style={{flexDirection: 'row',height: 35, borderBottomWidth: 1, borderColor: BiruKu}}>
            <Text style={[styles.title, styles.border, {width: '41%'}]}>Started</Text>
            <Text style={[styles.title, styles.border, {width: '41%'}]}>Finished</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.update, styles.border, {width: '41%'}]}>{date.layoutStart}</Text>
            <Text style={[styles.update, styles.border, {width: '41%'}]}>{date.layoutFinish}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.update, styles.border, {width: '41%'}]}>{date.mechStart}</Text>
            <Text style={[styles.update, styles.border, {width: '41%'}]}>{date.mechFinish}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.update, styles.border, {width: '41%', borderBottomWidth: 0}]}>{date.wiringStart}</Text>
            <Text style={[styles.update, styles.border, {width: '41%', borderBottomWidth: 0}]}>{date.wiringFinish}</Text>
          </View>  
        </View>
      </View>
      <View style={{flexDirection:'row', width:'100%', marginVertical: 8, borderWidth: 2.5, borderColor: BiruKu}}>
        <Text style={[{width: '34%', textAlignVertical: 'center'},styles.title]}>Finishing</Text>
        <View style={{flexDirection: 'column', borderLeftWidth: 1.6, borderRightWidth: 1, borderColor: BiruKu}}>
          <View style={{flexDirection: 'row',height: 35, borderBottomWidth: 1, borderColor: BiruKu}}>
            <Text style={[styles.title, styles.border, {width: '41%'}]}>Tested</Text>
            <Text style={[styles.title, styles.border, {width: '41%'}]}>Delivered</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.update, styles.border, {width: '41%', borderBottomWidth: 0}]}>{date.tested}</Text>
            <Text style={[styles.update, styles.border, {width: '41%', borderBottomWidth: 0}]}>{date.delivered}</Text>
          </View>  
        </View>
      </View>
      <EndOf/>
    </>)}
    </ScrollView>
  )
}

export default PanelStatus

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: BiruKu,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  stage: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: BiruKu,
    paddingLeft: 6,
    textAlignVertical:'center',
    borderTopWidth: 1,
    borderColor: BiruKu,
    height: 32
  },
  update: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: BiruKu,
    textAlign: 'center',
    textAlignVertical:'center',
    height: 32,
  },
  border: {
    textAlignVertical:'center',
    borderLeftWidth:1, 
    borderRightWidth:1, 
    borderBottomWidth:1, 
    borderColor: BiruKu,
    marginRight: -1
  },
})