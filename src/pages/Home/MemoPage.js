import {View, Dimensions, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Title from '../../components/Title1';
import MemoIndex from './MemoIndex';
import AddButton from '../../components/AddButton8';
import Header from '../../components/HeaderToHome';
import SearchBar from '../../components/SearchBar2';
import firestore from '@react-native-firebase/firestore';
import FormatDateTime from '../../components/FormatDateTime';
import LoadingComponent from '../../components/LoadingComponent';
import DataNotFound from '../../components/dataNotFound';
const height = Dimensions.get('window').height;

const MemoPage = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [memos, setMemos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const handleSearchText = text => {
    setSearchText(text);
  };
  const filtered = memos.filter(item => {
    const subjectLower = item.Subject.toLowerCase();
    const fromLower = item.From.toLowerCase();
    const toDivLower = item.ToDivision.toLowerCase();
    const searchKeywordLower = searchText.toLowerCase();
    return (
      subjectLower.includes(searchKeywordLower) ||
      toDivLower.includes(searchKeywordLower) ||
      fromLower.includes(searchKeywordLower)
    );
  });

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = firestore().collection('Memo')
      .orderBy('Created', 'desc').onSnapshot(snapshot => {
        const memoData = snapshot.docs.map(doc => {
          const data = doc.data();
          const Created = data.Created ? data.Created.toDate() : null;
          return {
            id: doc.id,
            ...data,
            Created: Created ? FormatDateTime(Created) : null,
          };
        });
        setMemos(memoData);
        setIsLoading(false);
      });
    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, []);
  return (
    <View style={{marginTop: 20}}>
      <Header />
      <Title TxtTitle={'INTERNAL MEMO'} />
      <SearchBar value={searchText} onChangeText={handleSearchText} />
      {isLoading ? (<LoadingComponent />) 
      : (<View>
          {filtered.length > 0 ? (
            <FlatList
              style={{marginBottom: 20, height: height * 0.6}}
              data={filtered}
              numColumns={2}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <MemoIndex
                  proj={item.From}
                  for={item.ToDivision}
                  subject={item.Subject}
                  due={item.Created}
                  key={item.id}
                  id={item.id}
                />
              )}
            />
          ) : (
            <View style={{marginHorizontal:10}}><DataNotFound/></View>
          )}
        </View>
      )}
      {!isLoading && <AddButton text={'Create Memo'}
        onPress={() => navigation.navigate('MemoCreate')}/>}
    </View>
  );
};
export default MemoPage;