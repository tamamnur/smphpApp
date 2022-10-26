import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const AxiosDataAkun = () => {
  const [dataUser, setDataUser] = useState({
    name:''
  })
  useEffect(()=>{
    // fetch('https://reqres.in/api/users?page=2')
    // .then((response) => response.json())
    // .then((json) => console.log(json))
    
    // const dataForAPI ={
    //   name: "noer",
    //   job: "leader"
    // }
    // console.log('data object : ', dataForAPI);
    // console.log('data stringify: ', JSON.stringify(dataForAPI));

    // fetch('https://reqres.in/api/users?page=2', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(dataForAPI)
    //     })
    //     .then(response => response.json())
    //     .then(json => {
    //       console.log('post response: ', json)
    //     });
    }, []);

    const getData = () => {
      fetch('https://reqres.in/api/users?page=2')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setDataUser(json.dataUser)
    })

  }
  return (
    <View style={styles.container}>
      <Text>{dataUser.name}
        from axiosDataAkun</Text>
    </View>
  )
}

export default AxiosDataAkun;

const styles = StyleSheet.create({
    // container:{padding: 10},
})