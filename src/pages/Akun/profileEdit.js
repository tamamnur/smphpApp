import {Text, View, ScrollView, ToastAndroid} from 'react-native';
import React, {Component} from 'react';
import {BiruKu} from '../../utils/constant';
import InputDataUser from '../../components/InputDataUser';
import InfoDataUser from '../../components/InputDataUserInfo';
import Button6 from '../../components/Button6';
import Division from '../../components/Division';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Header from '../../components/Header';
import Title1 from '../../components/Title1';
import ErrorMessage from '../../components/errorMessage';
import LoadingS from '../../components/LoadingComponentS';

export default class ProfileEdit extends Component {
  reauthenticate = currentPassword => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email, currentPassword,
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
      isSaving: false
    };
  }

  componentDidMount() {
    const currentUser = auth().currentUser;
    firestore().collection('User').doc(currentUser.uid).get()
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
    .catch(error => {console.error(error)
    ToastAndroid.show('Error uccurred, please restart the application.',ToastAndroid.LONG)});
  }

  handleDivisionChange = value => {
    this.setState({division: value, isEmailChanged: true});
  };

  handleProfileEdit = () => {
    const {displayName, email, division, currentPassword, isEmailChanged, isSaving} = this.state;
    this.setState({isSaving: true})
    if (!displayName.trim() || !email.trim()) {
      this.setState({error: 'Please complete the form before you press the save button', isSaving: false});
      setTimeout(() => {this.setState({error: ''})}, 3000);
      return;
    }
    const currentUser = auth().currentUser;
    if(currentPassword) {
      this.reauthenticate(currentPassword)
      .then(()=> {
        if(isEmailChanged) {return currentUser.updateEmail(email)}
        return Promise.resolve();
      })
      .then(()=> {return currentUser.updateProfile({displayName: displayName})
      })
      .then(()=> {return firestore().collection('User').doc(currentUser.uid).update({division: division})
      })
      .then(()=> {this.props.navigation.navigate('Akun')
        ToastAndroid.show('Changes successful. \nPress Refresh to see updates.',ToastAndroid.LONG)
      })
      .catch(error => {
        this.props.navigation.navigate('Akun')
        ToastAndroid.show(`Failed to changes., \n`+error,ToastAndroid.LONG)
      })
    } else {
      this.setState({error: 'Enter your current password', isSaving: false})
      setTimeout(() => { this.setState({error: ''})}, 2000);
      return
    }
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
    const {displayName, email, division, currentPassword, error, isEmailChanged, isSaving} = this.state;
    return (
      <ScrollView style={{marginVertical: 30, width: '100%'}}>
        <Header/><Title1 TxtTitle={'E D I T   P R O F I L E'} />
        <View style={{alignItems: 'center'}}>
          <View style={{width: '100%', marginTop: 10, marginLeft: 40}}>
            <Text style={{color: BiruKu, fontFamily: 'Poppins-Italic', fontSize: 15}}>
              {'('}Choose to change Division{')'}</Text>
          </View>
          <Division value={this.state.division} 
            onValueChange={this.handleDivisionChange}/>
          <InfoDataUser label='Division' value={division}/>
          <InputDataUser label="Fullname" value={displayName}
            onChangeText={text => this.setState({displayName: text, isEmailChanged: true})}/>
          <InputDataUser label="Email" value={email}
            onChangeText={text => this.handleEmailChange(text)}/>
          {isEmailChanged && (
            <InputDataUser
              label="Current Password" secureTextEntry value={currentPassword}
              onChangeText={text => this.setState({currentPassword: text})}
            />
          )}
        </View>
        {error ? (<ErrorMessage txt={error}/>) : null}
        {isSaving? (<LoadingS/>) : (
          <Button6 text="Save Changes" fontColor={'white'} bgColor={BiruKu} 
            onPress={this.handleProfileEdit}/>
        )}
      </ScrollView>
    );
  }
}