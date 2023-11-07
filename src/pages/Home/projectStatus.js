import { Text, StyleSheet, View, ScrollView, Dimensions, } from 'react-native';
import React, {useEffect, useState} from 'react';
import {IconBack, LogoSmpHP} from '../../assets';
import {BiruKu} from '../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import FormatDate2 from '../../components/FormatDate2';
import LoadingComponent from '../../components/LoadingComponent';
import StagesSwitch from '../../components/StageSwitchView';
import StatusPre from './projStatusPre';
import StatusPro from './projStatusPro';
import StatusFull from './projStatusFull';
import EndOf from '../../components/Footer';
import Header from '../../components/Header';
import Title2 from '../../components/Title2'
import SearchBar from '../../components/SearchBarOnStatus'

const ProjectStatus = props => {
  const navigation = useNavigation();
  const [isMounted, setIsMounted] = useState(true);
  const [selectedStage, setSelectedStage] = useState('Full Stages');
  const [state, setState] = useState({
    Monitoring: {Monitoring: ''},
    Project: {ProjectName: ''},
    ListPanel: [],
    id: '',
    isLoading: true,
  });
  const [searchText, setSearchText] = useState('');
  const handleSearchText = text => {setSearchText(text)};
  
  useEffect(() => {
    setIsMounted(true);
    const subscriber = firestore().collection('Project')
      .doc(props.route.params.id).onSnapshot(async doc => {
        try {
          const panelName = await doc.ref.collection('PanelName').get();
          const PanelNames = panelName.docs.map(async item => {
            if (item && item.data() && item.data().MonitoringID) {
              const MonitoringID = item.data().MonitoringID.substring(1);
              const Monitoring = firestore().doc(MonitoringID);
              //Shopdrawing
              const Submission = await Monitoring.collection('Shopdrawing').doc('Submission').get();
              let SubmissionDate;
              if (Submission && Submission.data()) {
                SubmissionDate = Submission.data().DateSubmit;
              }
              const Revisi = await Monitoring.collection('Shopdrawing').doc('Revision').get();
              let RevisionDate;
              if (Revisi && Revisi.data()) {
                RevisionDate = Revisi.data().DateRevisi;
              }
              const Approval = await Monitoring.collection('Shopdrawing').doc('Approval').get();
              let ApprovalDate;
              if (Approval && Approval.data()) {
                ApprovalDate = Approval.data().DateApprove;
              }
              //Procurement
              const Construction = await Monitoring.collection('Procurement').doc('Construction').get();
              let ConstPO;
              let ConstSched;
              let ConstReali;
              if (Construction && Construction.data()) {
                ConstPO = Construction.data().Order;
                ConstSched = Construction.data().Schedule;
                ConstReali = Construction.data().Realized;
              }
              const Busbar = await Monitoring.collection('Procurement').doc('Busbar').get();
              let BusbarPO;
              let BusbarSched;
              let BusbarReali;
              if (Busbar && Busbar.data()) {
                BusbarPO = Busbar.data().Order;
                BusbarSched = Busbar.data().Schedule;
                BusbarReali = Busbar.data().Realized;
              }
              const Component = await Monitoring.collection('Procurement').doc('Component').get();
              let ComponentPO;
              let ComponentSched;
              let ComponentReali;
              if (Component && Component.data()) {
                ComponentPO = Component.data().Order;
                ComponentSched = Component.data().Schedule;
                ComponentReali = Component.data().Realized;
              }
              //Fabrication
              const Layouting = await Monitoring.collection('Fabrication').doc('Layouting').get();
              let LayoutStart;
              let LayoutFinish;
              if (Layouting && Layouting.data()) {
                LayoutStart = Layouting.data().Start;
                LayoutFinish = Layouting.data().Finish;
              }
              const Mechanic = await Monitoring.collection('Fabrication').doc('Mech').get();
              let MechStart;
              let MechFinish;
              if (Mechanic && Mechanic.data()) {
                MechStart = Mechanic.data().Start;
                MechFinish = Mechanic.data().Finish;
              }
              const Wiring = await Monitoring.collection('Fabrication').doc('Wiring').get();
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

              const Result = {
                SubmissionDate: SubmissionDate ? FormatDate2(SubmissionDate.toDate()) : '---',
                RevisionDate: RevisionDate
                  ? FormatDate2(RevisionDate.toDate()) : '---',
                ApprovalDate: ApprovalDate
                  ? FormatDate2(ApprovalDate.toDate()) : '---',
                ConstPO: ConstPO 
                  ? FormatDate2(ConstPO.toDate()) : '---',
                ConstSched: ConstSched
                  ? FormatDate2(ConstSched.toDate()) : '---',
                ConstReali: ConstReali
                  ? FormatDate2(ConstReali.toDate()) : '---',
                BusbarPO: BusbarPO 
                  ? FormatDate2(BusbarPO.toDate()) : '---',
                BusbarSched: BusbarSched
                  ? FormatDate2(BusbarSched.toDate()) : '---',
                BusbarReali: BusbarReali
                  ? FormatDate2(BusbarReali.toDate()) : '---',
                ComponentPO: ComponentPO
                  ? FormatDate2(ComponentPO.toDate()) : '---',
                ComponentSched: ComponentSched
                  ? FormatDate2(ComponentSched.toDate()) : '---',
                ComponentReali: ComponentReali
                  ? FormatDate2(ComponentReali.toDate()) : '---',
                LayoutingStart: LayoutStart
                  ? FormatDate2(LayoutStart.toDate()) : '---',
                LayoutingFinish: LayoutFinish
                  ? FormatDate2(LayoutFinish.toDate()) : '---',
                MechanicStart: MechStart
                  ? FormatDate2(MechStart.toDate()) : '---',
                MechanicFinish: MechFinish
                  ? FormatDate2(MechFinish.toDate()) : '---',
                WiringStart: WiringStart
                  ? FormatDate2(WiringStart.toDate()) : '---',
                WiringFinish: WiringFinish
                  ? FormatDate2(WiringFinish.toDate()) : '---',
                TestedPanel: TestedPanel
                  ? FormatDate2(TestedPanel.toDate()) : '---',
                SentPanel: SentPanel 
                  ? FormatDate2(SentPanel.toDate()) : '---',
              };
              return {id: item.id, ...item.data(), monitoring: Result};
            }
            return {id: item.id, ...item.data(), monitoring: null};
          });
          if (isMounted) {
            setState({
              Project: {ProjectName: doc.data().projectName},
              ListPanel: await Promise.all(PanelNames),
              isLoading: false,
            });
          }
        } catch (error) {
          console.error('Error in useEffect', error);
        }
      });
    // console.log('Panels',PanelNames)
    // this.setState({id: props.route.params.id});

    return () => {
      subscriber();
      setIsMounted(false);
    };
  }, []);

  const headerStatus = () => {
    if (selectedStage === 'Shopdrawing') {
      return (
        <View style={{flexDirection: 'row', marginHorizontal: 9}}>
          <Text style={styles.SDHeaderNo}>No.</Text>
          <Text style={styles.SDHeaderPanelName}>Panel Name</Text>
          <Text style={styles.SDHeaderStatus}>Submit</Text>
          <Text style={styles.SDHeaderStatus}>Revision</Text>
          <Text style={styles.SDHeaderStatus}>Approve</Text>
        </View>
      );
    }
    if (
      selectedStage === 'Construction' ||
      selectedStage === 'Busbar Cu' ||
      selectedStage === 'Component'
    ) {
      return (
        <View style={{flexDirection: 'row', marginHorizontal: 9}}>
          <Text style={styles.SDHeaderNo}>No.</Text>
          <Text style={styles.SDHeaderPanelName}>Panel Name</Text>
          <Text style={styles.SDHeaderStatus}>Order</Text>
          <Text style={styles.SDHeaderStatus}>Schedule</Text>
          <Text style={styles.SDHeaderStatus}>Realized</Text>
        </View>
      );
    }
    if (
      selectedStage === 'FAB Layouting' ||
      selectedStage === 'FAB Mechanic' ||
      selectedStage === 'FAB Wiring'
    ) {
      return (
        <View style={{flexDirection: 'row', marginHorizontal: 9}}>
          <Text style={styles.SDHeaderNo}>No.</Text>
          <Text style={styles.FABHeaderPanelName}>Panel Name</Text>
          <Text style={styles.FABHeaderStatus}>Start</Text>
          <Text style={styles.FABHeaderStatus}>Finish</Text>
        </View>
      );
    }
    if (selectedStage === 'Finishing') {
      return (
        <View style={{flexDirection: 'row', marginHorizontal: 9}}>
          <Text style={styles.SDHeaderNo}>No.</Text>
          <Text style={styles.FABHeaderPanelName}>Panel Name</Text>
          <Text style={styles.FABHeaderStatus}>Tested</Text>
          <Text style={styles.FABHeaderStatus}>Delivered</Text>
        </View>
      );
    } 
    else {
      return (
        <View style={{flexDirection: 'row', marginHorizontal: 8, width: '95.5%'}}>
        {/* <View style={{flexDirection: 'row', marginLeft: 8, marginRight: 27}}> */}
          <Text style={styles.headTableNo}>No.</Text>
          <Text style={styles.headTablePanelName}>Panel Name</Text>
          <Text style={styles.headTableStatus}>Status</Text>
        </View>
      );
    }
  };

  return (
    <View>
      {/* <View style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
        <IconBack onPress={() => navigation.navigate('Home')} />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View> */}
      <Header/>
      {state.isLoading ? (
        <LoadingComponent />
      ) : (
        // <View>
        <View style={{marginTop: -18, marginBottom: 20}}>
          <Title2 TxtTitle={state.Project.ProjectName} SubTitle={'Project Status'}/>
          {/* <Text style={styles.title}>{state.Project.ProjectName}</Text>
          <Text style={styles.subtitle}>Project Status</Text> */}
          <StagesSwitch onSelect={selected => setSelectedStage(selected)} />
          {selectedStage === 'Shopdrawing' ? (
            <View>
              {headerStatus()}
              <ScrollView style={{height: '80%'}}>
                {state.ListPanel.map((item, index) => (
                  <StatusPre
                    key={item.id}
                    nomorPanel={index + 1}
                    panelName={item.pnameInput}
                    first={item.monitoring?.SubmissionDate || '---'}
                    second={item.monitoring?.RevisionDate || '---'}
                    third={item.monitoring?.ApprovalDate || '---'}
                  />
                ))}
              </ScrollView>
              <EndOf />
            </View>
          ) : selectedStage === 'Construction' ? (
            <View>
              {headerStatus()}
              <ScrollView>
                {state.ListPanel.map((item, index) => (
                  <StatusPre
                    key={item.id}
                    nomorPanel={index + 1}
                    panelName={item.pnameInput}
                    first={item.monitoring?.ConstPO || '---'}
                    second={item.monitoring?.ConstSched || '---'}
                    third={item.monitoring?.ConstReali || '---'}
                  />
                ))}
              </ScrollView>
              <EndOf />
            </View>
          ) : selectedStage === 'Busbar Cu' ? (
            <View>
              {headerStatus()}
              <ScrollView>
                {state.ListPanel.map((item, index) => (
                  <StatusPre
                    key={item.id}
                    nomorPanel={index + 1}
                    panelName={item.pnameInput}
                    first={item.monitoring?.BusbarPO || '---'}
                    second={item.monitoring?.BusbarSched || '---'}
                    third={item.monitoring?.BusbarReali || '---'}
                  />
                ))}
              </ScrollView>
              <EndOf />
            </View>
          ) : selectedStage === 'Component' ? (
            <View>
              {headerStatus()}
              <ScrollView>
                {state.ListPanel.map((item, index) => (
                  <StatusPre
                    key={item.id}
                    nomorPanel={index + 1}
                    panelName={item.pnameInput}
                    first={item.monitoring?.ComponentPO || '---'}
                    second={item.monitoring?.ComponentSched || '---'}
                    third={item.monitoring?.ComponentReali || '---'}
                  />
                ))}
              </ScrollView>
              <EndOf />
            </View>
          ) : selectedStage === 'FAB Layouting' ? (
            <View>
              {headerStatus()}
              <ScrollView>
                {state.ListPanel.map((item, index) => (
                  <StatusPro
                    key={item.id}
                    nomorPanel={index + 1}
                    panelName={item.pnameInput}
                    proSt={item.monitoring?.LayoutingStart || '---'}
                    proNd={item.monitoring?.LayoutingFinish || '---'}
                  />
                ))}
              </ScrollView>
              <EndOf />
            </View>
          ) : selectedStage === 'FAB Mechanic' ? (
            <View>
              {headerStatus()}
              <ScrollView>
                {state.ListPanel.map((item, index) => (
                  <StatusPro
                    key={item.id}
                    nomorPanel={index + 1}
                    panelName={item.pnameInput}
                    proSt={item.monitoring?.MechanicStart || '---'}
                    proNd={item.monitoring?.MechanicFinish || '---'}
                  />
                ))}
              </ScrollView>
              <EndOf />
            </View>
          ) : selectedStage === 'FAB Wiring' ? (
            <View>
              {headerStatus()}
              <ScrollView>
                {state.ListPanel.map((item, index) => (
                  <StatusPro
                    key={item.id}
                    nomorPanel={index + 1}
                    panelName={item.pnameInput}
                    proSt={item.monitoring?.WiringStart || '---'}
                    proNd={item.monitoring?.WiringFinish || '---'}
                  />
                ))}
              </ScrollView>
              <EndOf />
            </View>
          ) : selectedStage === 'Finishing' ? (
            <View>
              {headerStatus()}
              <ScrollView style={{height: '75%'}}>
                {state.ListPanel.map((item, index) => (
                  <StatusPro
                    key={item.id}
                    nomorPanel={index + 1}
                    panelName={item.pnameInput}
                    proSt={item.monitoring?.TestedPanel || '---'}
                    proNd={item.monitoring?.SentPanel || '---'}
                  />
                ))}
              <EndOf />

              </ScrollView>
              {/* <EndOf /> */}
            </View>
          ) : (
            <View>
              <SearchBar value={searchText} onChangeText={handleSearchText}/>
              {headerStatus()}
              <ScrollView style={{height: '75%'}}>
                {state.ListPanel
                .filter(item => {
                  const panelNameLower = item.pnameInput.toLowerCase();
                  const searchKeywordLower = searchText.toLowerCase()
                  return panelNameLower.includes(searchKeywordLower)
                })
                .map((item, index) => {
                  return (
                    <StatusFull
                      key={item.id}
                      nomorPanel={index + 1}
                      panelName={item.pnameInput}
                      dateSD_Submit={item.monitoring?.SubmissionDate || '---'}
                      dateSD_Rev={item.monitoring?.RevisionDate || '---'}
                      dateSD_Approv={item.monitoring?.ApprovalDate || '---'}
                      datePO_Const={item.monitoring?.ConstPO || '---'}
                      datePO_Busbar={item.monitoring?.BusbarPO || '---'}
                      datePO_Comp={item.monitoring?.ComponentPO || '---'}
                      sched_Busbar={item.monitoring?.BusbarSched || '---'}
                      sched_Comp={item.monitoring?.ComponentSched || '---'}
                      sched_Const={item.monitoring?.ConstSched || '---'}
                      realztn_Busbar={item.monitoring?.BusbarReali || '---'}
                      realztn_Comp={item.monitoring?.ComponentReali || '---'}
                      realztn_Const={item.monitoring?.ConstReali || '---'}
                      start_layout={item.monitoring?.LayoutingStart || '---'}
                      start_mech={item.monitoring?.MechanicStart || '---'}
                      start_wiring={item.monitoring?.WiringStart || '---'}
                      finish_layout={item.monitoring?.LayoutingFinish || '---'}
                      finish_mech={item.monitoring?.MechanicFinish || '---'}
                      finish_wiring={item.monitoring?.WiringFinish || '---'}
                      tested={item.monitoring?.TestedPanel || '---'}
                      sentPanel={item.monitoring?.SentPanel || '---'}
                    />
                  );
                })}
              </ScrollView>
              <EndOf />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

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
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    marginVertical: 2,
    paddingVertical: 5,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: '8.5%',
    // width: 25,
    height: 30,
    textAlign: 'center',
  },
  headTablePanelName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginVertical: 2,
    marginLeft: -1,
    // paddingLeft: 10,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: '56%',
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  headTableStatus: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginVertical: 2,
    marginLeft: -1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: '36.5%',
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  SDHeaderNo: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    marginVertical: 2,
    paddingVertical: 5,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    // width: 25,
    width: 25,
    height: 30,
    textAlign: 'center',
  },
  SDHeaderPanelName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginVertical: 2,
    paddingLeft: 10,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    // width: 145,
    width: '40%',
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  SDHeaderStatus: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    marginVertical: 2,
    marginLeft: -1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: '18%',
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  FABHeaderPanelName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginVertical: 2,
    marginLeft: -1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: '53%',
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  FABHeaderStatus: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    marginVertical: 2,
    marginLeft: -1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: '20%',
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});