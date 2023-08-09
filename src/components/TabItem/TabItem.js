import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {  BiruKu, WarnaPutih } from '../../utils/constant'
import { IconHomeActive, IconHome, IconDiscover, IconDiscoverActive, IconUser, IconUserActive } from '../../assets'


const TabItem = ({label, isFocused, onLongPress, onPress}) => {

    const Icon = () => {
        if(label === "Home") {
            return isFocused ? <IconHomeActive/> : <IconHome />;
        }

        if(label === "Discover") {
            return isFocused ? <IconDiscoverActive/> : <IconDiscover />;
        }

        if(label === "Akun") {
            return isFocused ? <IconUserActive/> : <IconUser />;
        }


        return <IconHomeActive/> ;
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={isFocused ? styles.containerFocus : styles.container}
          >
            <Icon />
            {isFocused && <Text style={styles.text}>
              {label.toUpperCase()}
            </Text>}
          </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        padding: 5
    },
    containerFocus : {
        alignContent: 'center',
        padding: 5,
        backgroundColor: BiruKu,
        flexDirection: 'row',
        borderRadius: 10
    },
    text : {
        color: WarnaPutih,
        fontSize: 14,
        marginLeft: 5,
        fontFamily: "Poppins-Bold",
    }
})