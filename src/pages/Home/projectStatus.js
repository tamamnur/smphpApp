import { Text, StyleSheet, View, TouchableOpacity, ScrollView, ActivityIndicator, } from 'react-native';
import React, {Component, useState} from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/AntDesign';
import FormatDate from '../../components/FormatDate';

const Status = props => {
  const navigation = useNavigation();
  const [togglePanel, setTogglePanel] = useState(false);
  const [toggleSD, setToggleSD] = useState(false);
  const [togglePO, setTogglePO] = useState(false);
  const [togglePOBox, setTogglePOBox] = useState(false);
  const [togglePOCu, setTogglePOCu] = useState(false);
  const [togglePOComp, setTogglePOComp] = useState(false);
  const [toggleFAB, setToggleFAB] = useState(false);
  const [toggleFABLay, setToggleFABLay] = useState(false);
  const [toggleFABMec, setToggleFABMec] = useState(false);
  const [toggleFABWir, setToggleFABWir] = useState(false);
  return (
    <View>
      <View style={{marginTop: 0.5}}>
        <View style={{flexDirection: 'row', marginHorizontal: 20}}>
          <Text style={styles.TableNo}>{props.nomorPanel}</Text>
          <View style={styles.TablePanelName}>
            <TouchableOpacity onPress={() => setTogglePanel(!togglePanel)}>
              <View> 
                <Text style={styles.tPanelName}>{props.panelName}</Text>
              </View>
              <View style={{width: 30, marginLeft: 185, marginTop: -22}}>                
                <Icon name={togglePanel ? 'shrink' : 'swap'} color={BiruKu} size={16}/>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.TableStatus}>{props.status}</Text>
        </View>
      </View>
      {togglePanel && (
        <View style={{ borderColor: BiruKu, borderWidth: 1, marginLeft: 20, marginRight: 25, paddingBottom: 10, }}>
          <View style={{width: 220, marginLeft: 20, marginBottom: 3, marginTop: 5}}>
            <TouchableOpacity onPress={() => setToggleSD(!toggleSD)}>
              <Text style={styles.headerStatus}><Icon name={toggleSD ? 'right' : 'down'} color={BiruKu}/>   Shopdrawing</Text>
            </TouchableOpacity>
            {toggleSD && (
              <View style={{flexDirection: 'row', width: 220}}>
                <View>
                  <Text style={styles.status}>{'\u2B16'} Submission</Text>
                  <Text style={styles.status}>{'\u2B16'} Revisi</Text>
                  <Text style={styles.status}>{'\u2B16'} Approval</Text>
                </View>
                <View>
                  <Text style={styles.update}>{props.dateSD_Submit}</Text>
                  <Text style={styles.update}>{props.dateSD_Rev}</Text>
                  <Text style={styles.update}>{props.dateSD_Approv}</Text>
                </View>
              </View>
            )}
          </View>

          <View style={{width: 220, marginLeft: 20, marginBottom: 2}}>
            <TouchableOpacity onPress={() => setTogglePO(!togglePO)}>
              <Text style={styles.headerStatus}><Icon name={togglePO ? 'right' : 'down'} color={BiruKu}/>   Procurement</Text>
            </TouchableOpacity>
            {togglePO && (
              <View>
                <TouchableOpacity onPress={() => setTogglePOBox(!togglePOBox)}>
                  <Text style={styles.status}><Icon name={togglePOBox ? 'right' : 'down'} color={BiruKu}/>   Construction</Text>
                </TouchableOpacity>
                {togglePOBox && (
                  <View style={{ flexDirection: 'row', width: 220, marginBottom: 5}}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Date Order</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Schedule</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Realization</Text>
                    </View>
                    <View style={{marginLeft: -10}}>
                      <Text style={styles.update}>{props.datePO_Const}</Text>
                      <Text style={styles.update}>{props.sched_Const}</Text>
                      <Text style={styles.update}>{props.realztn_Const}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity onPress={() => setTogglePOCu(!togglePOCu)}>
                  <Text style={styles.status}><Icon name={togglePOCu ? 'right' : 'down'} color={BiruKu}/>   Busbar Cu</Text>
                </TouchableOpacity>
                {togglePOCu && (
                  <View style={{ flexDirection: 'row', width: 220, marginBottom: 5}}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Date Order</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Schedule</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Realization</Text>
                    </View>
                    <View style={{marginLeft: -10}}>
                      <Text style={styles.update}>{props.datePO_Busbar}</Text>
                      <Text style={styles.update}>{props.sched_Busbar}</Text>
                      <Text style={styles.update}>{props.realztn_Busbar}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity onPress={() => setTogglePOComp(!togglePOComp)}>
                  <Text style={styles.status}><Icon name={togglePOComp ? 'right' : 'down'} color={BiruKu}/>   Component</Text>
                </TouchableOpacity>
                {togglePOComp && (
                  <View style={{ flexDirection: 'row', width: 220, marginBottom: 3, }}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Date Order</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Schedule</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Realization</Text>
                    </View>
                    <View style={{marginLeft: -10}}>
                      <Text style={styles.update}>{props.datePO_Comp}</Text>
                      <Text style={styles.update}>{props.sched_Comp}</Text>
                      <Text style={styles.update}>{props.realztn_Comp}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>

          <View style={{width: 220, marginLeft: 20, marginBottom: 3}}>
            <TouchableOpacity onPress={() => setToggleFAB(!toggleFAB)}>
              <Text style={styles.headerStatus}><Icon name={toggleFAB ? 'right' : 'down'} color={BiruKu}/>   Fabrication</Text>
            </TouchableOpacity>
            {toggleFAB && (
              <View>
                <TouchableOpacity onPress={() => setToggleFABLay(!toggleFABLay)}>
                  <Text style={styles.status}><Icon name={toggleFABLay ? 'right' : 'down'} color={BiruKu}/>   Layouting</Text>
                </TouchableOpacity>
                {toggleFABLay && (
                  <View style={{ flexDirection: 'row', width: 220, marginBottom: 3, }}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Start</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Finish</Text>
                    </View>
                    <View style={{marginLeft: 12}}>
                      <Text style={styles.update}>{props.start_layout}</Text>
                      <Text style={styles.update}>{props.finish_layout}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity onPress={() => setToggleFABMec(!toggleFABMec)}>
                  <Text style={styles.status}><Icon name={toggleFABMec ? 'right' : 'down'} color={BiruKu}/>   Mechanical</Text>
                </TouchableOpacity>
                {toggleFABMec && (
                  <View style={{flexDirection: 'row', width: 220, marginBottom: 3}}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Start</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Finish</Text>
                    </View>
                    <View style={{marginLeft: 12}}>
                      <Text style={styles.update}>{props.start_mech}</Text>
                      <Text style={styles.update}>{props.finish_mech}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity onPress={() => setToggleFABWir(!toggleFABWir)}>
                  <Text style={styles.status}><Icon name={toggleFABWir ? 'right' : 'down'} color={BiruKu}/>   Wiring</Text>
                </TouchableOpacity>
                {toggleFABWir && (
                  <View
                    style={{flexDirection: 'row', width: 220, marginBottom: 3}}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Start</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Finish</Text>
                    </View>
                    <View style={{marginLeft: 12}}>
                      <Text style={styles.update}>{props.start_wiring}</Text>
                      <Text style={styles.update}>{props.finish_wiring}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={styles.headerStatus}>Tested</Text>
            <View style={{marginRight: 50, marginTop: -21}}>
              <Text style={styles.update}>{props.tested}</Text>
            </View>
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={styles.headerStatus}>Sent</Text>
            <View style={{marginRight: 50, marginTop: -21}}>
              <Text style={styles.update}>{props.sentPanel}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

class ProjectStatus extends Component {
  componentWillUnmount() {
    this.subscriber();
  }

  state = {
    Monitoring: {Monitoring: ''},
    Project: {ProjectName: ''},
    ListPanel: [],
    id: '',
    isLoading: true,
  };
  constructor(props) {
    super(props);
    this.subscriber = firestore()
      .collection('Project')
      .doc(props.route.params.id)
      .onSnapshot(async doc => {
        const panelName = await doc.ref.collection('PanelName').get();
        const PanelNames = panelName.docs.map(async item => {
          if (item && item.data() && item.data().MonitoringID) {
            const MonitoringID = item.data().MonitoringID.substring(1);
            const Monitoring = firestore().doc(MonitoringID);
            //Shopdrawing
            const Submission = await Monitoring.collection('Shopdrawing')
              .doc('Submission')
              .get();
            let SubmissionDate;
            if (Submission && Submission.data()) {
              SubmissionDate = Submission.data().DateSubmit;
            }
            const Revisi = await Monitoring.collection('Shopdrawing')
              .doc('Revision')
              .get();
            let RevisionDate;
            if (Revisi && Revisi.data()) {
              RevisionDate = Revisi.data().DateRevisi;
            }
            const Approval = await Monitoring.collection('Shopdrawing')
              .doc('Approval')
              .get();
            let ApprovalDate;
            if (Approval && Approval.data()) {
              ApprovalDate = Approval.data().DateApprove;
            }
            //Procurement
            const Construction = await Monitoring.collection('Procurement')
              .doc('Construction')
              .get();
            let ConstPO;
            let ConstSched;
            let ConstReali;
            if (Construction && Construction.data()) {
              ConstPO = Construction.data().Order;
              ConstSched = Construction.data().Schedule;
              ConstReali = Construction.data().Realized;
            }
            const Busbar = await Monitoring.collection('Procurement')
              .doc('Busbar')
              .get();
            let BusbarPO;
            let BusbarSched;
            let BusbarReali;
            if (Busbar && Busbar.data()) {
              BusbarPO = Busbar.data().Order;
              BusbarSched = Busbar.data().Schedule;
              BusbarReali = Busbar.data().Realized;
            }
            const Component = await Monitoring.collection('Procurement')
              .doc('Component')
              .get();
            let ComponentPO;
            let ComponentSched;
            let ComponentReali;
            if (Component && Component.data()) {
              ComponentPO = Component.data().Order;
              ComponentSched = Component.data().Schedule;
              ComponentReali = Component.data().Realized;
            }
            //Fabrication
            const Layouting = await Monitoring.collection('Fabrication')
              .doc('Layouting')
              .get();
            let LayoutStart;
            let LayoutFinish;
            if (Layouting && Layouting.data()) {
              LayoutStart = Layouting.data().Start;
              LayoutFinish = Layouting.data().Finish;
            }
            const Mechanic = await Monitoring.collection('Fabrication')
              .doc('Mech')
              .get();
            let MechStart;
            let MechFinish;
            if (Mechanic && Mechanic.data()) {
              MechStart = Mechanic.data().Start;
              MechFinish = Mechanic.data().Finish;
            }
            const Wiring = await Monitoring.collection('Fabrication')
              .doc('Wiring')
              .get();
            let WiringStart;
            let WiringFinish;
            if (Wiring && Wiring.data()) {
              WiringStart = Wiring.data().Start;
              WiringFinish = Wiring.data().Finish;
            }
            //Tested
            const Tested = await Monitoring.collection('End').doc('Tested').get();
            let TestedPanel;
            if (Tested && Tested.data()) {
              TestedPanel = Tested.data().Tested;
            }
            //Sent
            const Sent = await Monitoring.collection('End').doc('Sent').get();
            let SentPanel;
            if (Sent && Sent.data()) {
              SentPanel = Sent.data().Sent;
            }
            // console.log(SentPanel.toDate())

            const Result = {
              SubmissionDate: SubmissionDate ? FormatDate(SubmissionDate.toDate()) : '   ------',
              RevisionDate: RevisionDate ? FormatDate(RevisionDate.toDate()) : '   ------',
              ApprovalDate: ApprovalDate ? FormatDate(ApprovalDate.toDate()) : '   ------',
              ConstPO: ConstPO ? FormatDate(ConstPO.toDate()) : '   ------',
              ConstSched: ConstSched ? FormatDate(ConstSched.toDate()) : '   ------',
              ConstReali: ConstReali ? FormatDate(ConstReali.toDate()) : '   ------',
              BusbarPO: BusbarPO ? FormatDate(BusbarPO.toDate()) : '   ------',
              BusbarSched: BusbarSched ? FormatDate(BusbarSched.toDate()) : '   ------',
              BusbarReali: BusbarReali ? FormatDate(BusbarReali.toDate()) : '   ------',
              ComponentPO: ComponentPO ? FormatDate(ComponentPO.toDate()) : '   ------',
              ComponentSched: ComponentSched ? FormatDate(ComponentSched.toDate()) : '   ------',
              ComponentReali: ComponentReali ? FormatDate(ComponentReali.toDate()) : '   ------',
              LayoutingStart: LayoutStart ? FormatDate(LayoutStart.toDate()) : '   ------',
              LayoutingFinish: LayoutFinish ? FormatDate(LayoutFinish.toDate()) : '   ------',
              MechanicStart: MechStart ? FormatDate(MechStart.toDate()) : '   ------',
              MechanicFinish: MechFinish ? FormatDate(MechFinish.toDate()) : '   ------',
              WiringStart: WiringStart ? FormatDate(WiringStart.toDate()) : '   ------',
              WiringFinish: WiringFinish ? FormatDate(WiringFinish.toDate()) : '   ------',
              TestedPanel: TestedPanel ? FormatDate(TestedPanel.toDate()) : '   ------',
              SentPanel: SentPanel ? FormatDate(SentPanel.toDate()) : '   ------',
            };
            return {id: item.id, ...item.data(), monitoring: Result};
          }
          return {id: item.id, ...item.data(), monitoring: null};
        });
        this.setState({
          Project: {ProjectName: doc.data().projectName},
          ListPanel: await Promise.all(PanelNames),
          isLoading: false,
        });
        // console.log('Panels',PanelNames)
      });
    // this.setState({id: props.route.params.id});
  }

  render() {
    return (
      <View>
        <View
          style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
          <IconBack onPress={() => this.props.navigation.navigate('Home')} />
          <LogoSmpHP style={{marginLeft: 180}} />
        </View>
        {this.state.isLoading ? (
          <View style={{marginTop: 20}}>
            <View style={{paddingBottom: 80}}>
              <ActivityIndicator />
            </View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View>
            <Text style={styles.title}>{this.state.Project.ProjectName}</Text>
            <Text style={styles.subtitle}>Project Status</Text>
            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
              <Text style={styles.headTableNo}>No.</Text>
              <Text style={styles.headTablePanelName}>Panel Name</Text>
              <Text style={styles.headTableStatus}>Status</Text>
            </View>
            <ScrollView style={{marginBottom: 50, height: 570}}>
              {this.state.ListPanel.map(item => {
                return (
                  <Status
                    key={item.id}
                    nomorPanel={item.id}
                    panelName={item.pnameInput}
                    status="Progres"
                    dateSD_Submit={item.monitoring?.SubmissionDate}
                    dateSD_Rev={item.monitoring?.RevisionDate}
                    dateSD_Approv={item.monitoring?.ApprovalDate}
                    datePO_Const={item.monitoring?.ConstPO}
                    datePO_Busbar={item.monitoring?.BusbarPO}
                    datePO_Comp={item.monitoring?.ComponentPO}
                    sched_Busbar={item.monitoring?.BusbarSched}
                    sched_Comp={item.monitoring?.ComponentSched}
                    sched_Const={item.monitoring?.ConstSched}
                    realztn_Busbar={item.monitoring?.BusbarReali}
                    realztn_Comp={item.monitoring?.ComponentReali}
                    realztn_Const={item.monitoring?.ConstReali}
                    start_layout={item.monitoring?.LayoutingStart}
                    start_mech={item.monitoring?.MechanicStart}
                    start_wiring={item.monitoring?.WiringStart}
                    finish_layout={item.monitoring?.LayoutingFinish}
                    finish_mech={item.monitoring?.MechanicFinish}
                    finish_wiring={item.monitoring?.WiringFinish}
                    tested={item.monitoring?.TestedPanel}
                    sentPanel={item.monitoring?.SentPanel}
                  />
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}

export default ProjectStatus;

const styles = StyleSheet.create({
  title: {
    marginTop: 8,
    marginBottom: -5,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: BiruKu,
  },
  subtitle: {
    marginBottom: 3,
    textAlign: 'center',
    fontFamily: 'Poppins-Italic',
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
    textAlign: 'center',
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
    textAlign: 'center',
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
    textAlign: 'center',
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
    textAlign: 'center',
  },
  TablePanelName: {
    flexDirection:'row',
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
    textAlign: 'center',
  },
  headerStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: BiruKu,
    borderBottomWidth: 1,
    borderBottomColor: BiruKu,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 5,
  },
  update: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    textAlign: 'right',
    color: BiruKu,
    paddingVertical: 1,
    marginLeft: 140,
  },
  status: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: BiruKu,
    marginLeft: 35,
  },
  statusPO: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: BiruKu,
    marginLeft: 50,
  },
});