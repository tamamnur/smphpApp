import {Text, View, ScrollView, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import Title2 from '../../components/Title2';
import {IconBack, LogoSmpHP} from '../../assets';
import {Table,TableWrapper,Row,Cell,Col,Rows,} from 'react-native-table-component';
import {BiruKu} from '../../utils/constant';

const CONTENT = {
    tableHead: ['Project', 'Panel Name', 'Update'],
    tableData: [
      ['Lippo Uptown Cikarang', 'LVMDP', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'CAPACITOR BANK 300kVAR', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MDP-01', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MDP-02', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-04', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-05', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-06', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MDP-02', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Lippo Uptown Cikarang', 'MPD-03', '28-09-2022'],
      ['Orchard Park Batam', 'MDP', '28-09-2022'],
      ['Power House, Sanbe Farma', 'P-SUMPIT', '28-09-2022'],  ],
};

export default class SD_Revision extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const state = this.state;
    return (
      <ScrollView>
        <View
          style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 30}}>
          <IconBack
            onPress={() => this.props.navigation.navigate('Discover')}
          />
          <LogoSmpHP style={{marginLeft: 200}} />
        </View>
        <Title2 TxtTitle="SHOPDRAWING" SubTitle="REVISI" />
        <View style={styles.container1}>
          <Table
            borderStyle={{
              borderWidth: 1,
              borderWidth: 1,
              borderColor: BiruKu,
            }}>
            <Row
              data={CONTENT.tableHead}
              flexArr={[5, 6, 3]}
              style={styles.head1}
              textStyle={styles.text1}
            />
            <TableWrapper style={styles.wrapper1}>
              <Rows
                data={CONTENT.tableData}
                flexArr={[5, 6, 3]}
                style={styles.row1}
                textStyle={styles.text2}
              />
            </TableWrapper>
          </Table>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container1: {flex: 2, marginTop: 8, marginHorizontal: 8},
    head1: {height: 35, borderColor: BiruKu, borderWidth: 1},
    //   wrapper1: { borderWidth: 1, backgroundColor: '#902' },
    row1: {height: 25, borderWidth: 0.8, borderColor: BiruKu},
    text1: {
      textAlign: 'center',
      color: BiruKu,
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
    },
    text2: {
      color: BiruKu,
      fontFamily: 'Poppins-Medium',
      paddingLeft: 8,
      fontSize: 10,
    },
});
