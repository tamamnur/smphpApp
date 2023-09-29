import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import { BiruKu } from '../utils/constant';

const SearchBar = ({searchKeyword, setSearchKeyword, setFilteredPanelData, panelNameData}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    const filteredData = panelNameData.filter((item) => {
      const projectNameLower = item.projectName.toLowerCase()
      const panelNameLower = item.panelName.toLowerCase()
      const searchKeywordLower = searchKeyword.toLowerCase()
      return (projectNameLower.includes(searchKeywordLower) || panelNameLower.includes(searchKeywordLower))
    })
    setFilteredPanelData(filteredData)
  }
  return (
    <TextInput
      style={styles.input}
      placeholder="Search by project or panel name..."
      value={searchKeyword}
      onChangeText={handleSearch}
      // onChangeText={(keyword) => handleSearch(keyword)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: BiruKu,
    borderRadius: 6,
    backgroundColor: 'white',
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 5,
    height: 35,
    color: BiruKu
  },
});

export default SearchBar;
