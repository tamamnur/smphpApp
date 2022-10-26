import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { IconSearch } from "../assets";
import { BiruKu } from "../utils/constant";

const width = Dimensions.get('window').width

const Search = ({ handleSearchInput, handleSort, sortTitle, placeholder}) =>{
    return (
        <View style={styles.container}>
            <TextInput 
                placeholder={placeholder}
                style={styles.search}
                onChangeText={text => handleSearchInput(text)}
            />
            <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', paddingHorizontal: 12}}
                onPress={handleSort}
            >
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>

                </View>
            </TouchableOpacity>
            <IconSearch style={{marginRight: 40, marginTop:3 }}/>
        </View>
    );
}

export default Search;

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        borderWidth: 2,
        borderColor: BiruKu,
        borderStyle:"dashed",
        borderRadius: 10,
        height: 35,
        // width: '80%',
        marginHorizontal:10,
        paddingLeft: 20,
        backgroundColor: '#F0F0F0'
    },
    search:{
        fontFamily: 'Poppins-Italic',
        fontSize: 13,
        marginBottom: -10,
        alignItems: 'center'
    }
})