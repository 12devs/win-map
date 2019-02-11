import { Alert, BackHandler } from 'react-native';

const exitAppPressed = () => {
  Alert.alert(
    'Exit App',
    'Do you want to exit?',
    [
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
    ],
    { cancelable: false });
  return true;
};

export {
  exitAppPressed
}
