import { Text, StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {Component, useState} from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Status = props => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={{marginTop: .5}}>
            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
              <Text style={styles.TableNo}>{props.nomorPanel}</Text>
                <View style={styles.TablePanelName}>
                  <TouchableOpacity 
                  // onPress={this.props.navigation.navigate('ProjectList')}
                  >
                    <View>
                      <Text style={styles.tPanelName}>{props.panelName}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              <Text style={styles.TableStatus}>{props.status}</Text>
            </View>
          </View>
      <View style={styles.wrapper}>
        <View style={{width: 220}}>
          <TouchableOpacity>
            <Text style={styles.headerStatus}>Shopdrawing</Text>
          </TouchableOpacity>
              <Text style={styles.status}>{'\u2B15'}   Submission</Text>
              <Text style={styles.status}>{'\u2B15'}   Revisi</Text>
              <Text style={styles.status}>{'\u2B15'}   Approval</Text>
          <TouchableOpacity>
            <Text style={styles.headerStatus}>Procurement</Text>
          </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.status}>{'\u2B15'}   Construction</Text>              
            </TouchableOpacity>
                <Text style={styles.statusPO}>{'\u2B25'}  Date Order</Text>
                <Text style={styles.statusPO}>{'\u2B25'}  Schedule</Text>
                <Text style={styles.statusPO}>{'\u2B25'}  Realization</Text>
            <TouchableOpacity>
              <Text style={styles.status}>{'\u2B15'}   Busbar Cu</Text>
            </TouchableOpacity>
                <Text style={styles.statusPO}>{'\u2B25'}  Date Order</Text>
                <Text style={styles.statusPO}>{'\u2B25'}  Schedule</Text>
                <Text style={styles.statusPO}>{'\u2B25'}  Realization</Text>            
            <TouchableOpacity>
              <Text style={styles.status}>{'\u2B15'}   Component</Text>
            </TouchableOpacity>
                <Text style={styles.statusPO}>{'\u2B25'}  Date Order</Text>
                <Text style={styles.statusPO}>{'\u2B25'}  Schedule</Text>
                <Text style={styles.statusPO}>{'\u2B25'}  Realization</Text>              
          <TouchableOpacity>
            <Text style={styles.headerStatus}>Fabrication</Text>
          </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.status}>{'\u2B15'}   Layouting</Text>
              </TouchableOpacity>
                <Text style={styles.statusPO}>{'\u2B25'}  Start</Text>
                <Text style={styles.statusPO}>{'\u2B25'}  Finish</Text>
              <TouchableOpacity>
                <Text style={styles.status}>{'\u2B15'}   Mechanical</Text>
              </TouchableOpacity>
                <Text style={styles.statusPO}>{'\u2B25'}  Start</Text>
                <Text style={styles.statusPO}>{'\u2B25'}  Finish</Text>
              <TouchableOpacity>
                <Text style={styles.status}>{'\u2B15'}   Wiring</Text>
              </TouchableOpacity>
                <Text style={styles.statusPO}>{'\u2B25'}  Start</Text>
                <Text style={styles.statusPO}>{'\u2B25'}  Finish</Text>
          <Text style={styles.status}></Text>
          <Text style={styles.headerStatus}>Sent</Text>
        </View>
        <View style={{width: 60, marginLeft: 30}}>
          {/* Shopdrawing */}
          <Text style={{marginVertical: -6}}>  </Text>
          <Text style={styles.update}>{'\u2B21'}{'\u2B25'}{'\u2B21'}{'\u2B25'}{'\u2B21'}{'\u2B25'}{'\u2B21'}  </Text>
          <Text style={styles.update}>{props.dateSD_Submit}</Text>
          <Text style={styles.update}>{props.dateSD_Rev}</Text>
          <Text style={styles.update}>{props.dateSD_Approv}</Text>
          {/* Proc Construction */}
          <Text style={{marginVertical: -4}}>  </Text>
          <Text style={styles.update}>{'\u2B21'}{'\u2B25'}{'\u2B21'}{'\u2B25'}{'\u2B21'}{'\u2B25'}{'\u2B21'}  </Text>
          <Text style={{marginVertical: -3}}>  </Text>
          <Text style={styles.update}>{props.datePO_Const}</Text>
          <Text style={styles.update}>{props.sched_Const}</Text>
          <Text style={styles.update}>{props.realztn_Const}</Text>
          {/* Proc Busbar */}
          <Text style={{marginVertical: 3}}>  </Text>
          <Text style={styles.update}>{props.datePO_Busbar}</Text>
          <Text style={styles.update}>{props.sched_Busbar}</Text>
          <Text style={styles.update}>{props.realztn_Busbar}</Text>
          {/* Proc Component */}
          <Text style={{marginVertical: 3}}>  </Text>
          <Text style={styles.update}>{props.datePO_Comp}</Text>
          <Text style={styles.update}>{props.sched_Comp}</Text>
          <Text style={styles.update}>{props.realztn_Comp}</Text>

          {/* Fabc Layouting */}
          <Text style={{marginVertical: -5}}>  </Text>
          <Text style={styles.update}>{'\u2B21'}{'\u2B25'}{'\u2B21'}{'\u2B25'}{'\u2B21'}{'\u2B25'}{'\u2B21'}  </Text>
          <Text style={{marginVertical: 1}}>  </Text>
          <Text style={styles.update}>{props.start_layout}</Text>
          <Text style={styles.update}>{props.finish_layout}</Text>
          {/* Fabc Mechanic */}
          <Text style={{marginVertical: -1}}>  </Text>
          <Text style={styles.update}>{props.start_mech}</Text>
          <Text style={styles.update}>{props.finish_mech}</Text>
          {/* Fabc Wiring */}
          <Text style={{marginVertical: -1}}>  </Text>
          <Text style={styles.update}>{props.start_wiring}</Text>
          <Text style={styles.update}>{props.finish_wiring}</Text>
          {/* Sent */}
          <Text style={{marginVertical: 2}}>  </Text>
          <Text style={styles.update}>20-2-2023</Text>
        </View>
      </View>
    </View>
  );
};
class ProjectStatus extends Component {
  state = {
    Monitoring: {Monitoring: ''},
  };
    componentDidMount() {
      this.InitFirebase()
    };
    async InitFirebase () {
      const FormatDate = (date) => {
        return date.getDate() + '-' + (date.getMonth()+1)+ '-'+date.getFullYear()
      } 
      const Monitoring = firestore().collection('Monitoring').doc('qEZzckqrye9usXp7yVL9')
      //Shopdrawing
      const Submission = await Monitoring.collection('Shopdrawing').doc('Submission').get()
      const SubmissionDate = Submission.data().DateSubmit
      const Revisi = await Monitoring.collection('Shopdrawing').doc('Revision').get()
      const RevisionDate = Revisi.data().DateRevisi
      const Approval = await Monitoring.collection('Shopdrawing').doc('Approval').get()
      const ApprovalDate = Approval.data().DateApprove
      //Procurement
      const Construction = await Monitoring.collection('Procurement').doc('Construction').get()
      const ConstPO = Construction.data().DatePO
      const ConstSched = Construction.data().Schedule
      const ConstReali = Construction.data().Realization
      const Busbar = await Monitoring.collection('Procurement').doc('Busbar').get()
      const BusbarPO = Busbar.data().DatePO
      const BusbarSched = Busbar.data().Schedule
      const BusbarReali = Busbar.data().Realization
      const Component = await Monitoring.collection('Procurement').doc('Component').get()
      const ComponentPO = Component.data().DatePO
      const ComponentSched = Component.data().Schedule
      const ComponentReali = Component.data().Realization
      //Fabrication
      const Layouting = await Monitoring.collection('Fabrication').doc('Layouting').get()
      const LayoutStart = Layouting.data().Start
      const LayoutFinish = Layouting.data().Finish
      const Mechanic = await Monitoring.collection('Fabrication').doc('Mech').get()
      const MechStart = Mechanic.data().Start
      const MechFinish = Mechanic.data().Finish
      const Wiring = await Monitoring.collection('Fabrication').doc('Wiring').get()
      const WiringStart = Wiring.data().Start
      const WiringFinish = Wiring.data().Finish
      
      this.setState({
        Monitoring: {
          SubmissionDate: FormatDate(SubmissionDate.toDate()),
          RevisionDate: FormatDate(RevisionDate.toDate()),
          ApprovalDate: FormatDate(ApprovalDate.toDate()),
          ConstPO: FormatDate(ConstPO.toDate()),
          ConstSched: FormatDate(ConstSched.toDate()),
          ConstReali: FormatDate(ConstReali.toDate()),
          BusbarPO : FormatDate(BusbarPO.toDate()),
          BusbarSched : FormatDate(BusbarSched.toDate()),
          BusbarReali : FormatDate(BusbarReali.toDate()),
          ComponentPO: FormatDate(ComponentPO.toDate()),
          ComponentSched: FormatDate(ComponentSched.toDate()),
          ComponentReali: FormatDate(ComponentReali.toDate()),
          LayoutingStart: FormatDate(LayoutStart.toDate()),
          LayoutingFinish: FormatDate(LayoutFinish.toDate()),
          MechanicStart: FormatDate(MechStart.toDate()),
          MechanicFinish: FormatDate(MechFinish.toDate()),
          WiringStart: FormatDate(WiringStart.toDate()),
          WiringFinish: FormatDate(WiringFinish.toDate()),
        }
      })
    }
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
          <IconBack onPress={() => this.props.navigation.navigate('Home')} />
          <LogoSmpHP style={{marginLeft: 180}} />
        </View>
        <Text style={styles.title}>"Project Name"</Text>
        <Text style={styles.subtitle}>"**Project Status**"</Text>
        <View style={{flexDirection: 'row', marginHorizontal: 20}}>
          <Text style={styles.headTableNo}>No.</Text>
          <Text style={styles.headTablePanelName}>Panel Name</Text>
          <Text style={styles.headTableStatus}>Status</Text>
        </View>
        <ScrollView>
          <Status
            nomorPanel="1" panelName="LVMDP" status="Progres"

            dateSD_Submit={this.state.Monitoring.SubmissionDate}
            dateSD_Rev={this.state.Monitoring.RevisionDate}
            dateSD_Approv={this.state.Monitoring.ApprovalDate}

            datePO_Const={this.state.Monitoring.ConstPO}
            datePO_Busbar={this.state.Monitoring.BusbarPO}
            datePO_Comp={this.state.Monitoring.ComponentPO}
            
            sched_Busbar={this.state.Monitoring.BusbarSched}
            sched_Comp={this.state.Monitoring.ComponentSched}
            sched_Const={this.state.Monitoring.ConstSched}

            realztn_Busbar={this.state.Monitoring.BusbarReali}
            realztn_Comp={this.state.Monitoring.ComponentReali}
            realztn_Const={this.state.Monitoring.ConstReali}
            
            start_layout={this.state.Monitoring.LayoutingStart}
            start_mech={this.state.Monitoring.MechanicStart}
            start_wiring={this.state.Monitoring.WiringStart}

            finish_layout={this.state.Monitoring.LayoutingFinish}
            finish_mech={this.state.Monitoring.MechanicFinish}
            finish_wiring={this.state.Monitoring.WiringFinish}
          />
        </ScrollView>
      </View>
    );
  }
}

export default ProjectStatus;

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    marginBottom: 2,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: BiruKu,
  },
  subtitle: {
    marginBottom: 3,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: BiruKu,
  },
  headTableNo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    paddingVertical: 5,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 30,
    height: 30,
    textAlign: 'center'
  },
  headTablePanelName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    paddingLeft: 10,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 220,
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  headTableStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    marginRight: 3,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 98,
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  TableNo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    marginVertical: 2,
    paddingVertical: 5,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 30,
    height: 30,
    textAlign: 'center'
  },
  TablePanelName: {
    paddingLeft: 10,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 220,
    height: 30,
  },
  tPanelName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 5,
    color: BiruKu,
  },
  TableStatus: {
    fontFamily: 'Poppins-Italic',
    fontSize: 11,
    marginVertical: 2,
    marginRight: 3,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 98,
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderLeftWidth: 0.1,
    borderRadius: 5,
    marginHorizontal: 21,
    paddingBottom: 10,
  },
  headerStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: BiruKu,
    borderBottomWidth: 1,
    borderBottomColor: BiruKu,
    marginLeft: 50,
    marginBottom: 5,
  },
  update: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    textAlign: 'right',
    color: BiruKu,
    marginBottom: 1,
    marginRight: -20,
  },
  status: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: BiruKu,
    marginLeft: 60,
  },
  statusPO: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: BiruKu,
    marginLeft: 80,
  },
});