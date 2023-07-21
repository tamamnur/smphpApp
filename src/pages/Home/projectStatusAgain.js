import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import { IconBack, LogoSmpHP } from '../../assets';

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
            </TouchableOpacity>
          </View>
          <Text style={styles.TableStatus}>{props.status}</Text>
        </View>
      </View>
      {togglePanel && (
        <View
          style={{
            backgroundColor: '#D8D8D8',
            marginLeft: 20,
            marginRight: 25,
            paddingBottom: 10,
          }}>
          <View style={{width: 220, marginLeft: 20, marginBottom: 3}}>
            <TouchableOpacity onPress={() => setToggleSD(!toggleSD)}>
              <Text style={styles.headerStatus}>{'\u2B15'} Shopdrawing</Text>
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
              <Text style={styles.headerStatus}>{'\u2B15'} Procurement</Text>
            </TouchableOpacity>
            {togglePO && (
              <View>
                <TouchableOpacity onPress={() => setTogglePOBox(!togglePOBox)}>
                  <Text style={styles.status}>{'\u2B16'} Construction</Text>
                </TouchableOpacity>
                {togglePOBox && (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 220,
                      marginBottom: 5,
                    }}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Date Order</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Schedule</Text>
                      <Text style={styles.statusPO}>
                        {'\u2B25'} Realization
                      </Text>
                    </View>
                    <View style={{marginLeft: -10}}>
                      <Text style={styles.update}>{props.datePO_Const}</Text>
                      <Text style={styles.update}>{props.sched_Const}</Text>
                      <Text style={styles.update}>{props.realztn_Const}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity onPress={() => setTogglePOCu(!togglePOCu)}>
                  <Text style={styles.status}>{'\u2B16'} Busbar Cu</Text>
                </TouchableOpacity>
                {togglePOCu && (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 220,
                      marginBottom: 5,
                    }}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Date Order</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Schedule</Text>
                      <Text style={styles.statusPO}>
                        {'\u2B25'} Realization
                      </Text>
                    </View>
                    <View style={{marginLeft: -10}}>
                      <Text style={styles.update}>{props.datePO_Busbar}</Text>
                      <Text style={styles.update}>{props.sched_Busbar}</Text>
                      <Text style={styles.update}>{props.realztn_Busbar}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setTogglePOComp(!togglePOComp)}>
                  <Text style={styles.status}>{'\u2B16'} Component</Text>
                </TouchableOpacity>
                {togglePOComp && (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 220,
                      marginBottom: 3,
                    }}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Date Order</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Schedule</Text>
                      <Text style={styles.statusPO}>
                        {'\u2B25'} Realization
                      </Text>
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
              <Text style={styles.headerStatus}>{'\u2B15'} Fabrication</Text>
            </TouchableOpacity>
            {toggleFAB && (
              <View>
                <TouchableOpacity
                  onPress={() => setToggleFABLay(!toggleFABLay)}>
                  <Text style={styles.status}>{'\u2B16'} Layouting</Text>
                </TouchableOpacity>
                {toggleFABLay && (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: 220,
                      marginBottom: 3,
                    }}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Start</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Finish</Text>
                    </View>
                    <View style={{marginLeft: 18}}>
                      <Text style={styles.update}>{props.start_layout}</Text>
                      <Text style={styles.update}>{props.finish_layout}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setToggleFABMec(!toggleFABMec)}>
                  <Text style={styles.status}>{'\u2B16'} Mechanical</Text>
                </TouchableOpacity>
                {toggleFABMec && (
                  <View
                    style={{flexDirection: 'row', widt: 220, marginBottom: 3}}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Start</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Finish</Text>
                    </View>
                    <View style={{marginLeft: 18}}>
                      <Text style={styles.update}>{props.start_mech}</Text>
                      <Text style={styles.update}>{props.finish_mech}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setToggleFABWir(!toggleFABWir)}>
                  <Text style={styles.status}>{'\u2B16'} Wiring</Text>
                </TouchableOpacity>
                {toggleFABWir && (
                  <View
                    style={{flexDirection: 'row', widt: 220, marginBottom: 3}}>
                    <View>
                      <Text style={styles.statusPO}>{'\u2B25'} Start</Text>
                      <Text style={styles.statusPO}>{'\u2B25'} Finish</Text>
                    </View>
                    <View style={{marginLeft: 18}}>
                      <Text style={styles.update}>{props.start_wiring}</Text>
                      <Text style={styles.update}>{props.finish_wiring}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
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

const FormatDate = date => {
  return (
    date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
  );
};
const ProjectStatusAgain = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  useEffect(() => {
    const ContentFirebase = [];
    const subscriber = firestore()
      .collection('Project')
    //   .doc(this.props.route.params.id)
      .doc('project00')
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
            //Sent
            const Sent = await Monitoring.collection('Sent').doc('Sent').get();
            let SentPanel;
            if (Sent && Sent.data()) {
              SentPanel = Sent.data().sent;
            }

            const Result = {
              SubmissionDate: SubmissionDate
                ? FormatDate(SubmissionDate.toDate())
                : '   ------',
              RevisionDate: RevisionDate
                ? FormatDate(RevisionDate.toDate())
                : '   ------',
              ApprovalDate: ApprovalDate
                ? FormatDate(ApprovalDate.toDate())
                : '   ------',
              ConstPO: ConstPO ? FormatDate(ConstPO.toDate()) : '   ------',
              ConstSched: ConstSched
                ? FormatDate(ConstSched.toDate())
                : '   ------',
              ConstReali: ConstReali
                ? FormatDate(ConstReali.toDate())
                : '   ------',
              BusbarPO: BusbarPO ? FormatDate(BusbarPO.toDate()) : '   ------',
              BusbarSched: BusbarSched
                ? FormatDate(BusbarSched.toDate())
                : '   ------',
              BusbarReali: BusbarReali
                ? FormatDate(BusbarReali.toDate())
                : '   ------',
              ComponentPO: ComponentPO
                ? FormatDate(ComponentPO.toDate())
                : '   ------',
              ComponentSched: ComponentSched
                ? FormatDate(ComponentSched.toDate())
                : '   ------',
              ComponentReali: ComponentReali
                ? FormatDate(ComponentReali.toDate())
                : '   ------',
              LayoutingStart: LayoutStart
                ? FormatDate(LayoutStart.toDate())
                : '   ------',
              LayoutingFinish: LayoutFinish
                ? FormatDate(LayoutFinish.toDate())
                : '   ------',
              MechanicStart: MechStart
                ? FormatDate(MechStart.toDate())
                : '   ------',
              MechanicFinish: MechFinish
                ? FormatDate(MechFinish.toDate())
                : '   ------',
              WiringStart: WiringStart
                ? FormatDate(WiringStart.toDate())
                : '   ------',
              WiringFinish: WiringFinish
                ? FormatDate(WiringFinish.toDate())
                : '   ------',
              SentPanel: SentPanel
                ? FormatDate(SentPanel.toDate())
                : '   ------',
            };
            // console.log(Result);
            return {id: item.id, ...item.data(), monitoring: Result};
          }
          // console.log(item);
          console.log(panelName)
          return {id: item.id, ...item.data(), monitoring: null};
        });
        this.setState({
          Project: {ProjectName: doc.data().projectName},
          ListPanel: await Promise.all(PanelNames),
        });
        // console.log('Panels',PanelNames)
    });
    // console.log('Panels',PanelNames)
    //   console.log('why',subscriber)
    // this.setState({id: props.route.params.id});
  });
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', marginTop: 30, marginHorizontal: 30}}>
        <IconBack onPress={() => navigation.navigate('Home')} />
        <LogoSmpHP style={{marginLeft: 180}} />
      </View>
      <ActivityIndicator />
      <Text>projectStatusAgain</Text>
    </View>
  );
};

export default ProjectStatusAgain;

const styles = StyleSheet.create({});
