import {StyleSheet, Text, View, ScrollView, ToastAndroid} from 'react-native';
import React, {Component} from 'react';
import {BiruKu} from '../../utils/constant';
import InputDataUser from '../../components/InputDataUser';
import Button6 from '../../components/Button6';
import Division from '../../components/Division';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Header from '../../components/Header';
import Title1 from '../../components/Title1';

export default class ProfileEdit extends Component {
  reauthenticate = currentPassword => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        currentPassword,
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
    this.setState({division: value});
  };

  changeEmail = () => {
    const {email, currentPassword} = this.state;
    const currentUser = auth().currentUser;
    if (currentUser) {
      this.reauthenticate(currentPassword)
        .then(() => {
          return currentUser.updateEmail(email);
        })
        .then(() => {
          ToastAndroid.show(
            'Email address has been changed successfully',
            ToastAndroid.LONG,
          );
          // console.log('Email address has been changed successfully');
        })
        .catch(error => {
          console.log('Failed to change email address', error);
          ToastAndroid.show(
            'Failed to change email address',
            ToastAndroid.LONG,
          );
        });
    }
  };

  handleProfileEdit = () => {
    const {displayName, email, division, currentPassword} = this.state;
    if (!displayName.trim() || !email.trim()) {
      this.setState({
        error: 'Please complete the form before you press the save button',
      });
      setTimeout(() => {
        this.setState({error: ''});
      }, 3000);
      return;
    }
    const currentUser = auth().currentUser;
    if (!currentPassword && this.state.isEmailChanged) {
      this.setState({error: 'Please enter your current password'});
      setTimeout(() => {
        this.setState({error: ''});
      }, 2000);
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
              ToastAndroid.LONG,
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

  handleEmailChange = text => {
    const {email} = this.state;
    if (text !== email) {
      this.setState({
        email: text,
        isEmailChanged: true,
        currentPassword: '',
      });
    } else {
      this.setState({
        email: text,
        isEmailChanged: false,
      });
    }
  };

  render() {
    const {
      displayName,
      email,
      division,
      currentPassword,
      error,
      isEmailChanged,
    } = this.state;
    return (
      <ScrollView style={{marginVertical: 30, width: '100%'}}>
        <Header />
        <Title1 TxtTitle={'E D I T   P R O F I L E'} />
        <View
          style={{
            // marginHorizontal: 20,
            // justifyContent: 'center',
            // width: '100%',
            alignItems: 'center',
          }}>
          <View style={{width: '100%'}}>
            <Text style={styles.label}>
              {'('}Choose to change Division{')'}
            </Text>
          </View>
          <Division
            value={this.state.division}
            onValueChange={this.handleDivisionChange}
          />
          <InputDataUser label="Division" value={division} />
          <InputDataUser
            label="Fullname"
            value={displayName}
            onChangeText={text => this.setState({displayName: text})}
          />
          <InputDataUser
            label="Email"
            value={email}
            onChangeText={text => this.handleEmailChange(text)}
          />
          {isEmailChanged && (
            <>
              <InputDataUser
                label="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={text => this.setState({currentPassword: text})}
              />
            </>
          )}
        </View>
        {error ? (
          <Text style={{color: 'red', fontSize: 14, textAlign: 'center', marginBottom: -15}}>
            {error} </Text> ) : null}
        <Button6
          text="Save Changes"
          fontColor={'white'}
          bgColor={BiruKu}
          onPress={this.handleProfileEdit}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    marginLeft: 15,
    color: BiruKu,
  },
});