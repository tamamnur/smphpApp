import { StyleSheet, Text, View, ScrollView, ToastAndroid, Alert } from 'react-native';
import React, { Component } from 'react';
import { LogoSmpHP, IconBack } from '../../assets';
import { BiruKu } from '../../utils/constant';
import InputData from '../../components/InputData';
import Button from '../../components/Button';
import Division from '../../components/Division';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
// import RNRestart from '@react-native-restart';

export default class ProfileEdit extends Component {
  reauthenticate = (currentPassword) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      return currentUser.reauthenticateWithCredential(credential);
    } else {
      return Promise.reject('User is not logged in.');
    }
  };

  constructor(props) {
    super(props);
    const currentUser = auth().currentUser;
    this.state = {
      displayName: '',
      email: '',
      division: '',
      currentPassword: '',
      error: '',
      isEmailChanged: false,
    };
  }

  componentDidMount() {
    const currentUser = auth().currentUser;
    firestore()
      .collection('User')
      .doc(currentUser.uid)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          const user = docSnapshot.data();
          this.setState({
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            division: user.division || '',
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleDivisionChange = value => {
    this.setState({ division: value });
  };

  changeEmail = () => {
    const { email, currentPassword } = this.state;
    const currentUser = auth().currentUser;
    if (currentUser) {
      this.reauthenticate(currentPassword)
        .then(() => {
          return currentUser.updateEmail(email);
        })
        .then(() => {
          console.log('Email address has been changed successfully');
        })
        .catch((error) => {
          console.log('Failed to change email address', error);
          ToastAndroid.show('Failed to change email address', ToastAndroid.LONG)
          // this.setState({ error: 'Failed to change email address'})
          // setTimeout(()=>{
          //   this.setState({error: ''})
          // }, 3000)
        });
    }
  };

  handleProfileEdit = () => {
    const { displayName, email, division, currentPassword } = this.state;
    const currentUser = auth().currentUser;
    if (!currentPassword && this.state.isEmailChanged) {
      this.setState({error: 'Please enter your current password'})
      setTimeout(()=>{
        this.setState({error: ''})
      }, 3000)
      return;
    }
    if (email !== currentUser.email) {
      this.changeEmail();
    }
    currentUser
      .updateProfile({
        displayName: displayName,
      })
      .then(() => {
        firestore()
          .collection('User')
          .doc(currentUser.uid)
          .update({
            division: division,
          })
          .then(() => {
            ToastAndroid.show(
              'Press the Refresh Button to see the changes',
              ToastAndroid.LONG
            );
            this.props.navigation.navigate('Akun');
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleEmailChange = (text) => {
    const {email} = this.state;
    if (text !== email) {
      this.setState({
        email: text,
        isEmailChanged: true,
        currentPassword: '',
      })
    } else {
      this.setState({
        email: text,
        isEmailChanged: false,
      })
    }
  }

  render() {
    const { displayName, email, division, currentPassword, error, isEmailChanged } = this.state;
    return (
      <ScrollView>
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 30, }}>
          <IconBack onPress={() => this.props.navigation.navigate('Akun')} />
          <LogoSmpHP style={{ marginLeft: 200 }} />
        </View>
        {/* {error ? (
          <Text style={{color: 'red', fontSize: 14, textAlign: 'center'}}>{error}</Text>
        ) : null} */}
        <Text style={styles.title}>E D I T   P R O F I L E</Text>
        <View style={styles.container}>
          <Text style={styles.label}>{'('}Change Division{')'}</Text>
        </View>
        <Division
          value={this.state.division}
          onValueChange={this.handleDivisionChange}
        />
        <View style={styles.container}>
          <Text style={styles.label}>Division</Text>
          <Text style={styles.txtInput}>{division}</Text>
        </View>
        <InputData
          label="Fullname"
          value={displayName}
          onChangeText={text => this.setState({ displayName: text })}
        />
        <InputData
          label="Email"
          value={email}
          onChangeText={text => this.handleEmailChange(text)}
        />
            {/* label="Current Password (Re-enter the registered password)" */}
        {isEmailChanged && (
          <>
          <InputData
            label="Current Password"
            secureTextEntry
            value={currentPassword}
            onChangeText={text => this.setState({ currentPassword: text })}
          />
          {error ? (
            <Text style={{color: 'red', fontSize: 14, textAlign: 'center'}}>{error}</Text>
          ) : null}
          </>
        )}
        <Button
          text="Save Changes"
          color={BiruKu}
          onPress={this.handleProfileEdit}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: BiruKu,
    marginLeft: 35,
    marginVertical: 20,
  },
  container: {
    marginHorizontal: 50,
    width: 296,
    flex: 1,
    alignContent: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    color: BiruKu,
  },
  txtInput: {
    borderWidth: 1,
    borderColor: BiruKu,
    color: '#000',
    padding: 8,
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
    borderRadius: 5,
    height: 40,
  },
});
