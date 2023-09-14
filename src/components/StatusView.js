import React, {useState} from "react";
import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import { Icon } from "react-native-vector-icons/AntDesign";
import { BiruKu } from "../utils/constant";
// import FormatDate from "./FormatDate";
// import ProjectStatus from "../pages/Home/projectStatus";

const FullStatusView = (props) => {
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
    
    const progress = () => {
      if (props.sentPanel && props.sentPanel !== '------') {
        return 'Sent'
      } if (props.tested && props.tested !== '------') {
        return 'Tested' 
      } if (props.finish_wiring && props.finish_wiring !== '------') {
        return 'Wiring is Finish' 
      } if (props.start_wiring && props.start_wiring !== '------') {
        return 'Wiring is Start' 
      } if (props.finish_mech && props.finish_mech !== '------') {
        return 'Mechanic is Finish' 
      } if (props.start_mech && props.start_mech !== '------') {
        return 'Mechanic is Start' 
      } if (props.finish_layout && props.finish_layout !== '------') {
        return 'Layouting is Finish' 
      } if (props.start_layout && props.start_layout !== '------') {
        return 'Layouting is Start' 
      } if (props.realztn_Comp && props.realztn_Comp !== '------') {
        return 'Component is Ready' 
      } if (props.datePO_Comp && props.datePO_Comp !== '------') {
        return 'Component Ordered' 
      } if (props.realztn_Busbar && props.realztn_Busbar !== '------') {
        return 'Busbar is Ready' 
      } if (props.datePO_Busbar && props.datePO_Busbar !== '------') {
        return 'Busbar Ordered' 
      } if (props.realztn_Const && props.realztn_Const !== '------') {
        return 'Construction is Ready' 
      } if (props.datePO_Const && props.datePO_Const !== '------') {
        return 'Construction Ordered' 
      } if (props.dateSD_Approv && props.dateSD_Approv !== '------') {
        return 'SD Approved' 
      } if (props.dateSD_Rev && props.dateSD_Rev !== '------') {
        return 'SD Revision' 
      } if (props.dateSD_Submit && props.dateSD_Submit !== '------') {
        return 'Wait for Approval'
      } 
        return 'Shopdrawing Process'
    }
  
    return (
      <View>
        <View style={{marginTop: 0.5}}>
          <View style={{flexDirection: 'row', marginHorizontal: 9}}>
            <Text style={styles.TableNo}>{props.nomorPanel}</Text>
            <View style={styles.TablePanelName}>
              <TouchableOpacity onPress={() => setTogglePanel(!togglePanel)}>
                <View> 
                  <Text style={styles.tPanelName}>{props.panelName}</Text>
                </View>
                <View style={{width: 30, marginLeft: 190, marginTop: -20}}>                
                  <Icon name={togglePanel ? 'shrink' : 'arrowsalt'} color={BiruKu} size={12}/>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.TableStatus}>{progress()}</Text>
          </View>
        </View>
        {togglePanel && (
          <View style={{ borderColor: BiruKu, borderWidth: 1, marginHorizontal: 10, paddingBottom: 10, }}>
            <View style={{width: 250, marginLeft: 5, marginVertical: 2}}>
              <TouchableOpacity onPress={() => setToggleSD(!toggleSD)}>
                <Text style={styles.headerStatus}><Icon name={toggleSD ? 'right' : 'down'} color={BiruKu}/>  Shopdrawing</Text>
              </TouchableOpacity>
              {toggleSD && (
                <View style={{flexDirection: 'row', width: 240}}>
                  <View>
                    <Text style={styles.status}>{'\u2B16'}   Submission</Text>
                    <Text style={styles.status}>{'\u2B16'}   Revisi</Text>
                    <Text style={styles.status}>{'\u2B16'}   Approval</Text>
                  </View>
                  <View>
                    <Text style={styles.update}>{props.dateSD_Submit}</Text>
                    <Text style={styles.update}>{props.dateSD_Rev}</Text>
                    <Text style={styles.update}>{props.dateSD_Approv}</Text>
                  </View>
                </View>
              )}
            </View>
  
            <View style={{width: 250, marginLeft: 5}}>
              <TouchableOpacity onPress={() => setTogglePO(!togglePO)}>
                <Text style={styles.headerStatus}><Icon name={togglePO ? 'right' : 'down'} color={BiruKu}/>  Procurement</Text>
              </TouchableOpacity>
              {togglePO && (
                <View>
                  <TouchableOpacity onPress={() => setTogglePOBox(!togglePOBox)}>
                    <Text style={styles.headerSubStatus}><Icon name={togglePOBox ? 'right' : 'down'} size={10} color={BiruKu}/> Construction</Text>
                  </TouchableOpacity>
                  {togglePOBox && (
                    <View style={{ flexDirection: 'row', width: 220, marginBottom: 5}}>
                      <View>
                        <Text style={styles.statusPO}>{'\u2B25'} Date Order</Text>
                        <Text style={styles.statusPO}>{'\u2B25'} Schedule</Text>
                        <Text style={styles.statusPO}>{'\u2B25'} Realization</Text>
                      </View>
                      <View style={{marginLeft: -5}}>
                        <Text style={styles.update}>{props.datePO_Const}</Text>
                        <Text style={styles.update}>{props.sched_Const}</Text>
                        <Text style={styles.update}>{props.realztn_Const}</Text>
                      </View>
                    </View>
                  )}
                  <TouchableOpacity onPress={() => setTogglePOCu(!togglePOCu)}>
                    <Text style={styles.headerSubStatus}><Icon name={togglePOCu ? 'right' : 'down'} color={BiruKu}/> Busbar Cu</Text>
                  </TouchableOpacity>
                  {togglePOCu && (
                    <View style={{ flexDirection: 'row', width: 220, marginBottom: 5}}>
                      <View>
                        <Text style={styles.statusPO}>{'\u2B25'} Date Order</Text>
                        <Text style={styles.statusPO}>{'\u2B25'} Schedule</Text>
                        <Text style={styles.statusPO}>{'\u2B25'} Realization</Text>
                      </View>
                      <View style={{marginLeft: -5}}>
                        <Text style={styles.update}>{props.datePO_Busbar}</Text>
                        <Text style={styles.update}>{props.sched_Busbar}</Text>
                        <Text style={styles.update}>{props.realztn_Busbar}</Text>
                      </View>
                    </View>
                  )}
                  <TouchableOpacity onPress={() => setTogglePOComp(!togglePOComp)}>
                    <Text style={styles.headerSubStatus}><Icon name={togglePOComp ? 'right' : 'down'} color={BiruKu}/> Component</Text>
                  </TouchableOpacity>
                  {togglePOComp && (
                    <View style={{ flexDirection: 'row', width: 220, marginBottom: 3, }}>
                      <View>
                        <Text style={styles.statusPO}>{'\u2B25'} Date Order</Text>
                        <Text style={styles.statusPO}>{'\u2B25'} Schedule</Text>
                        <Text style={styles.statusPO}>{'\u2B25'} Realization</Text>
                      </View>
                      <View style={{marginLeft: -5}}>
                        <Text style={styles.update}>{props.datePO_Comp}</Text>
                        <Text style={styles.update}>{props.sched_Comp}</Text>
                        <Text style={styles.update}>{props.realztn_Comp}</Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
  
            <View style={{width: 250, marginLeft: 5, marginBottom: 3}}>
              <TouchableOpacity onPress={() => setToggleFAB(!toggleFAB)}>
                <Text style={styles.headerStatus}><Icon name={toggleFAB ? 'right' : 'down'} color={BiruKu}/>  Fabrication</Text>
              </TouchableOpacity>
              {toggleFAB && (
                <View>
                  <TouchableOpacity onPress={() => setToggleFABLay(!toggleFABLay)}>
                    <Text style={styles.headerSubStatus}><Icon name={toggleFABLay ? 'right' : 'down'} color={BiruKu}/> Layouting</Text>
                  </TouchableOpacity>
                  {toggleFABLay && (
                    <View style={{ flexDirection: 'row', width: 250, marginBottom: 3, }}>
                      <View>
                        <Text style={styles.statusPO}>{'\u2B25'} Start</Text>
                        <Text style={styles.statusPO}>{'\u2B25'} Finish</Text>
                      </View>
                      <View style={{marginLeft: 25}}>
                        <Text style={styles.update}>{props.start_layout}</Text>
                        <Text style={styles.update}>{props.finish_layout}</Text>
                      </View>
                    </View>
                  )}
                  <TouchableOpacity onPress={() => setToggleFABMec(!toggleFABMec)}>
                    <Text style={styles.headerSubStatus}><Icon name={toggleFABMec ? 'right' : 'down'} color={BiruKu}/> Mechanical</Text>
                  </TouchableOpacity>
                  {toggleFABMec && (
                    <View style={{flexDirection: 'row', width: 250, marginBottom: 3}}>
                      <View>
                        <Text style={styles.statusPO}>{'\u2B25'} Start</Text>
                        <Text style={styles.statusPO}>{'\u2B25'} Finish</Text>
                      </View>
                      <View style={{marginLeft: 25}}>
                        <Text style={styles.update}>{props.start_mech}</Text>
                        <Text style={styles.update}>{props.finish_mech}</Text>
                      </View>
                    </View>
                  )}
                  <TouchableOpacity onPress={() => setToggleFABWir(!toggleFABWir)}>
                    <Text style={styles.headerSubStatus}><Icon name={toggleFABWir ? 'right' : 'down'} color={BiruKu}/> Wiring</Text>
                  </TouchableOpacity>
                  {toggleFABWir && (
                    <View
                      style={{flexDirection: 'row', width: 250, marginBottom: 3}}>
                      <View>
                        <Text style={styles.statusPO}>{'\u2B25'} Start</Text>
                        <Text style={styles.statusPO}>{'\u2B25'} Finish</Text>
                      </View>
                      <View style={{marginLeft: 25}}>
                        <Text style={styles.update}>{props.start_wiring}</Text>
                        <Text style={styles.update}>{props.finish_wiring}</Text>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
            <View style={{marginLeft: 10, width: 295}}>
              <Text style={styles.headerStatus}>Tested</Text>
              <View style={{marginTop: -21, marginLeft: 65}}>
                <Text style={styles.update}>{props.tested}</Text>
              </View>
            </View>
            <View style={{marginLeft: 10, width: 295}}>
              <Text style={styles.headerStatus}>Sent</Text>
              <View style={{marginTop: -21, marginLeft: 65}}>
                <Text style={styles.update}>{props.sentPanel}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

export default FullStatusView;

const styles = StyleSheet.create({
  headTableNo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    paddingVertical: 5,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 25,
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
    marginLeft: -1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 130,
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
    textAlign: 'center',
    width: 25,
    height: 30,
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
    textAlignVertical: 'center',
    textAlign: 'center',
    marginVertical: 2,
    marginLeft: -1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: 130,
    height: 30,
  },
  headerStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11.5,
    color: '#BA0A3F',
    borderBottomWidth: 1,
    borderBottomColor: BiruKu,
    marginLeft: 25,
    marginBottom: 5,
  },
  headerSubStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#BA0A3F',
    borderBottomColor: BiruKu,
    marginLeft: 35,
  },
  update: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10.5,
    textAlign: 'center',
    color: BiruKu,
    marginLeft: 150,
  },
  status: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11.5,
    color: BiruKu,
    marginLeft: 35,
  },
  statusPO: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11.5,
    color: BiruKu,
    marginLeft: 50,
  },
})