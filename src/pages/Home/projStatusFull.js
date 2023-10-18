import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {BiruKu} from '../../utils/constant';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon_O from 'react-native-vector-icons/FontAwesome'

const StatusFull = props => {
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
  const IconO = () => { return <Icon_O name={'circle'} color={BiruKu} size={8}/>}
  const IconV = ({toggle}) => {
    return <Icon name={toggle ? 'right' : 'down'} color={'#BA0A3F'} />;
  };
  const progress = () => {
    if (props.sentPanel && props.sentPanel !== '---') {
      return 'Sent';
    }
    if (props.tested && props.tested !== '---') {
      return 'Tested';
    }
    if (props.finish_wiring && props.finish_wiring !== '---') {
      return 'Wiring is Finish';
    }
    if (props.start_wiring && props.start_wiring !== '---') {
      return 'Wiring is Start';
    }
    if (props.finish_mech && props.finish_mech !== '---') {
      return 'Mechanic is Finish';
    }
    if (props.start_mech && props.start_mech !== '---') {
      return 'Mechanic is Start';
    }
    if (props.finish_layout && props.finish_layout !== '---') {
      return 'Layouting is Finish';
    }
    if (props.start_layout && props.start_layout !== '---') {
      return 'Layouting is Start';
    }
    if (props.realztn_Comp && props.realztn_Comp !== '---') {
      return 'Component is Ready';
    }
    if (props.datePO_Comp && props.datePO_Comp !== '---') {
      return 'Component Ordered';
    }
    if (props.realztn_Busbar && props.realztn_Busbar !== '---') {
      return 'Busbar is Ready';
    }
    if (props.datePO_Busbar && props.datePO_Busbar !== '---') {
      return 'Busbar Ordered';
    }
    if (props.realztn_Const && props.realztn_Const !== '---') {
      return 'Construction is Ready';
    }
    if (props.datePO_Const && props.datePO_Const !== '---') {
      return 'Construction Ordered';
    }
    if (props.dateSD_Approv && props.dateSD_Approv !== '---') {
      return 'SD Approved';
    }
    if (props.dateSD_Rev && props.dateSD_Rev !== '---') {
      return 'SD Revision';
    }
    if (props.dateSD_Submit && props.dateSD_Submit !== '---') {
      return 'Wait for Approval';
    }
    return 'Shopdrawing Process';
  };

  return (
    <View>
      <View style={{marginTop: 0.5}}>
        <View style={{flexDirection: 'row', marginHorizontal: 8, width: '99%'}}>
          <Text style={styles.rowNo}>{props.nomorPanel}</Text>
          <View style={styles.rowPanelName}>
            <TouchableOpacity onPress={() => setTogglePanel(!togglePanel)}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.tPanelName}>{props.panelName}</Text>
                <View style={{marginTop: 8}}>
                <Icon
                  name={togglePanel ? 'shrink' : 'arrowsalt'}
                  color={BiruKu}
                  size={12}
                  />
                  </View>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.tStatus}>{progress()}</Text>
        </View>
      </View>
      {togglePanel && (
        <View style={styles.dropdown}>
          <View style={styles.stages}>
            <TouchableOpacity onPress={() => setToggleSD(!toggleSD)}>
              <Text style={styles.headStatus}>
                <IconV toggle={toggleSD} /> Shopdrawing
              </Text>
            </TouchableOpacity>
            {toggleSD && (
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '100%'}}>
                  <Text style={styles.status}><IconO/> Submission</Text>
                  <Text style={styles.status}><IconO/> Revisi</Text>
                  <Text style={styles.status}><IconO/> Approval</Text>
                </View>
                <View style>
                  <Text style={styles.update}>{props.dateSD_Submit}</Text>
                  <Text style={styles.update}>{props.dateSD_Rev}</Text>
                  <Text style={styles.update}>{props.dateSD_Approv}</Text>
                </View>
              </View>
            )}
          </View>
          <View style={{width: '95%', marginLeft: 5}}>
            <TouchableOpacity onPress={() => setTogglePO(!togglePO)}>
              <View style={{width: '67%'}}>
              <Text style={styles.headStatus}>
                <IconV togglePO={togglePO} /> Procurement
              </Text>
              </View>
            </TouchableOpacity>
            {togglePO && (
              <View>
                <TouchableOpacity onPress={() => setTogglePOBox(!togglePOBox)}>
                  <Text style={styles.subStatus}>
                    <IconV toggle={togglePOBox} /> Construction
                  </Text>
                </TouchableOpacity>
                {togglePOBox && (
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.subDropdownStatus}>
                      <Text style={styles.status}><IconO/> Date Order</Text>
                      <Text style={styles.status}><IconO/> Schedule</Text>
                      <Text style={styles.status}><IconO/> Realization</Text>
                    </View>
                    <View>
                      <Text style={styles.update}>{props.datePO_Const}</Text>
                      <Text style={styles.update}>{props.sched_Const}</Text>
                      <Text style={styles.update}>{props.realztn_Const}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity onPress={() => setTogglePOCu(!togglePOCu)}>
                  <Text style={styles.subStatus}>
                    <IconV toggle={togglePOCu} /> Busbar Cu
                  </Text>
                </TouchableOpacity>
                {togglePOCu && (
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.subDropdownStatus}>
                      <Text style={styles.status}><IconO/> Date Order</Text>
                      <Text style={styles.status}><IconO/> Schedule</Text>
                      <Text style={styles.status}><IconO/> Realization</Text>
                    </View>
                    <View>
                      <Text style={styles.update}>{props.datePO_Busbar}</Text>
                      <Text style={styles.update}>{props.sched_Busbar}</Text>
                      <Text style={styles.update}>{props.realztn_Busbar}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setTogglePOComp(!togglePOComp)}>
                  <Text style={styles.subStatus}>
                    <IconV toggle={togglePOComp} /> Component
                  </Text>
                </TouchableOpacity>
                {togglePOComp && (
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.subDropdownStatus}>
                      <Text style={styles.status}><IconO/> Date Order</Text>
                      <Text style={styles.status}><IconO/> Schedule</Text>
                      <Text style={styles.status}><IconO/> Realization</Text>
                    </View>
                    <View>
                      <Text style={styles.update}>{props.datePO_Comp}</Text>
                      <Text style={styles.update}>{props.sched_Comp}</Text>
                      <Text style={styles.update}>{props.realztn_Comp}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>

          <View style={{width: '95%', marginLeft: 5}}>
            <TouchableOpacity onPress={() => setToggleFAB(!toggleFAB)}>
              <View style={{width: '67%'}}>
              <Text style={styles.headStatus}>
                <IconV toggle={toggleFAB} /> Fabrication
              </Text>
              </View>
            </TouchableOpacity>
            {toggleFAB && (
              <View>
                <TouchableOpacity
                  onPress={() => setToggleFABLay(!toggleFABLay)}>
                  <Text style={styles.subStatus}>
                    <IconV toggle={toggleFABLay} /> Layouting
                  </Text>
                </TouchableOpacity>
                {toggleFABLay && (
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.subDropdownStatus}>
                      <Text style={styles.status}><IconO/> Start</Text>
                      <Text style={styles.status}><IconO/> Finish</Text>
                    </View>
                    <View>
                      <Text style={styles.update}>{props.start_layout}</Text>
                      <Text style={styles.update}>{props.finish_layout}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setToggleFABMec(!toggleFABMec)}>
                  <Text style={styles.subStatus}>
                    <IconV toggle={toggleFABMec} /> Mechanical
                  </Text>
                </TouchableOpacity>
                {toggleFABMec && (
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.subDropdownStatus}>
                      <Text style={styles.status}><IconO/> Start</Text>
                      <Text style={styles.status}><IconO/> Finish</Text>
                    </View>
                    <View>
                      <Text style={styles.update}>{props.start_mech}</Text>
                      <Text style={styles.update}>{props.finish_mech}</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setToggleFABWir(!toggleFABWir)}>
                  <Text style={styles.subStatus}>
                    <IconV toggle={toggleFABWir} /> Wiring
                  </Text>
                </TouchableOpacity>
                {toggleFABWir && (
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.subDropdownStatus}>
                      <Text style={styles.status}><IconO/> Start</Text>
                      <Text style={styles.status}><IconO/> Finish</Text>
                    </View>
                    <View>
                      <Text style={styles.update}>{props.start_wiring}</Text>
                      <Text style={styles.update}>{props.finish_wiring}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row', marginLeft:-10, width: '120%'}}>
            <View style={styles.subDropdownStatus}>
              <Text style={styles.headStatus}>Tested</Text>
            </View>
            <View style={{marginLeft: -90}}>
              <Text style={styles.update}>{props.tested}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginLeft:-10, width: '120%'}}>
            <View style={styles.subDropdownStatus}>
              <Text style={styles.headStatus}>Sent</Text>
            </View>
            <View style={{marginLeft: -90}}>
              <Text style={styles.update}>{props.sentPanel}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default StatusFull;

const styles = StyleSheet.create({
  rowNo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    paddingVertical: 5,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    // width: 25,
    width: '8%',
    height: 30,
    textAlign: 'center',
  },
  rowPanelName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginVertical: 2,
    paddingLeft: 10,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    // width: 220,
    width: '54%',
    height: 30,
    flexDirection: 'row',
    textAlignVertical: 'center',
  },
  tPanelName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingVertical: 3,
    color: BiruKu,
    width: '91%'
  },
  tStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    marginVertical: 2,
    marginLeft: -1,
    color: BiruKu,
    borderWidth: 1,
    borderColor: BiruKu,
    width: '35%',
    height: 30,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  dropdown: {
    width: '96%',
    borderColor: BiruKu,
    borderWidth: 1,
    marginHorizontal: 9,
    paddingBottom: 10,
  },
  headStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11.5,
    color: '#BA0A3F',
    borderBottomWidth: 1,
    borderBottomColor: BiruKu,
    marginLeft: 25,
    marginBottom: 5,
  },
  subStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    color: '#BA0A3F',
    borderBottomColor: BiruKu,
    marginLeft: 40,
  },
  subDropdownStatus: {
    marginLeft: 20,
    width: '60%',
    // borderWidth: 1
  },
  status: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11.5,
    color: BiruKu,
    marginLeft: 35,
  },
  update: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10.5,
    textAlign: 'center',
    color: BiruKu,
    // width: '500%',
    // borderWidth:1,
    width: 110,
    paddingVertical: 1,
  },
  stages: {
    width: '63%', marginLeft: 5, marginVertical: 2
  }
});
