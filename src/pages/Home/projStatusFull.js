import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {BiruKu} from '../../utils/constant';
import Icon from 'react-native-vector-icons/AntDesign';

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
        <View style={{flexDirection: 'row', marginHorizontal: 9}}>
          <Text style={styles.rowNo}>{props.nomorPanel}</Text>
          <View style={styles.rowPanelName}>
            <TouchableOpacity onPress={() => setTogglePanel(!togglePanel)}>
              <View>
                <Text style={styles.tPanelName}>{props.panelName}</Text>
              </View>
              <View style={{width: 30, marginLeft: 190, marginTop: -15}}>
                <Icon
                  name={togglePanel ? 'shrink' : 'arrowsalt'}
                  color={BiruKu}
                  size={12}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.tStatus}>{progress()}</Text>
        </View>
      </View>
      {togglePanel && (
        <View style={styles.dropdown}>
          <View style={{width: 250, marginLeft: 5, marginVertical: 2}}>
            <TouchableOpacity onPress={() => setToggleSD(!toggleSD)}>
              <Text style={styles.headStatus}>
                <IconV toggle={toggleSD} /> Shopdrawing
              </Text>
            </TouchableOpacity>
            {toggleSD && (
              <View style={{flexDirection: 'row'}}>
                <View style={{width: 250}}>
                  <Text style={styles.status}>{'\u2B16'} Submission</Text>
                  <Text style={styles.status}>{'\u2B16'} Revisi</Text>
                  <Text style={styles.status}>{'\u2B16'} Approval</Text>
                </View>
                <View style>
                  <Text style={styles.update}>{props.dateSD_Submit}</Text>
                  <Text style={styles.update}>{props.dateSD_Rev}</Text>
                  <Text style={styles.update}>{props.dateSD_Approv}</Text>
                </View>
              </View>
            )}
          </View>
          <View style={{width: 250, marginLeft: 5}}>
            <TouchableOpacity onPress={() => setTogglePO(!togglePO)}>
              <Text style={styles.headStatus}>
                <IconV togglePO={togglePO} /> Procurement
              </Text>
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
                      <Text style={styles.status}>{'\u2B25'} Date Order</Text>
                      <Text style={styles.status}>{'\u2B25'} Schedule</Text>
                      <Text style={styles.status}>{'\u2B25'} Realization</Text>
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
                      <Text style={styles.status}>{'\u2B25'} Date Order</Text>
                      <Text style={styles.status}>{'\u2B25'} Schedule</Text>
                      <Text style={styles.status}>{'\u2B25'} Realization</Text>
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
                      <Text style={styles.status}>{'\u2B25'} Date Order</Text>
                      <Text style={styles.status}>{'\u2B25'} Schedule</Text>
                      <Text style={styles.status}>{'\u2B25'} Realization</Text>
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

          <View style={{width: 250, marginLeft: 5, marginBottom: 3}}>
            <TouchableOpacity onPress={() => setToggleFAB(!toggleFAB)}>
              <Text style={styles.headStatus}>
                <IconV toggle={toggleFAB} /> Fabrication
              </Text>
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
                      <Text style={styles.status}>{'\u2B25'} Start</Text>
                      <Text style={styles.status}>{'\u2B25'} Finish</Text>
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
                      <Text style={styles.status}>{'\u2B25'} Start</Text>
                      <Text style={styles.status}>{'\u2B25'} Finish</Text>
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
                      <Text style={styles.status}>{'\u2B25'} Start</Text>
                      <Text style={styles.status}>{'\u2B25'} Finish</Text>
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
          <View style={{flexDirection: 'row', marginLeft:-10}}>
            <View style={styles.subDropdownStatus}>
              <Text style={styles.headStatus}>Tested</Text>
            </View>
            <View style={{marginLeft: -90}}>
              <Text style={styles.update}>{props.tested}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginLeft:-10}}>
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
    width: 25,
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
    width: 220,
    height: 30,
    textAlignVertical: 'center',
  },
  tPanelName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    paddingVertical: 3,
    color: BiruKu,
  },
  tStatus: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
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
  dropdown: {
    borderColor: BiruKu,
    borderWidth: 1,
    marginHorizontal: 10,
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
    width: 230,
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
    width: 110,
    paddingVertical: 1,
  },
});
