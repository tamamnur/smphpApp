import { Text, View, StyleSheet } from 'react-native';
import React, {Component} from 'react';
import Title2 from '../../components/Title2';
import { IconBack, LogoSmpHP } from '../../assets';
import { Table, TableWrapper, Row, Cell, Col, Rows } from 'react-native-table-component';
import { BiruKu } from '../../utils/constant';

const CONTENT = {
    tableHead: [ 'NO. SPG', 'Project', 'Last Update'],
    tableData: [
      ['018','Lippo Uptown Cikarang', '28-09-2022'],
      ['020','Orchard Park Batam', '28-09-2022'],
      ['028','Power House, Sanbe Farma', '28-09-2022']
    ],
  };

export default class SD_Approval extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const state = this.state;
        return (
            <View>
                <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop:30 }}>
                    <IconBack onPress={() => this.props.navigation.navigate('Discover')} />
                    <LogoSmpHP style={{ marginLeft: 200 }} />
                </View>
                <Title2 TxtTitle="SHOPDRAWING" SubTitle="APPROVAL" />
                <View style={styles.container1}>
                    <Table borderStyle={{ borderWidth: 1, borderWidth: 1, borderColor: BiruKu }}>
                        <Row
                        data={CONTENT.tableHead}
                        flexArr={[2, 5, 3]}
                        style={styles.head1}
                        textStyle={styles.text1}
                        />
                        <TableWrapper style={styles.wrapper1}>
                        <Rows
                            data={CONTENT.tableData}
                            flexArr={[2, 5, 3]}
                            style={styles.row1}
                            textStyle={styles.text2}
                        />
                        </TableWrapper>
                    </Table>
                    </View>
            </View>
        );
    }
}

 const styles = StyleSheet.create({

  container1: { flex: 2, backgroundColor: '#fff', marginTop: 8, marginHorizontal: 15},
  head1: { height: 40, backgroundColor: BiruKu },
  wrapper1: { borderWidth: 1, borderColor: BiruKu },
  row1: { height: 30, borderWidth: 1, borderColor: BiruKu },
  text1: { textAlign: 'center', color: '#FFF', fontFamily: 'Poppins-SemiBold', fontSize: 12 },
  text2: { fontSize: 11, fontFamily: 'Poppins-Regular', paddingLeft: 10 }
 });