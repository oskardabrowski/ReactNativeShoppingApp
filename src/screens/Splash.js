import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import PushNotification from 'react-native-push-notification';
import LinearGradient from 'react-native-linear-gradient';

const Splash = ({navigation}) => {
  useEffect(() => {
    createChannels();
    setTimeout(() => {
      navigation.replace('Zakupy');
    }, 2000);
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'task-channel',
      channelName: 'Task-Channel',
    });
  };

  return (
    <LinearGradient
      colors={['#00A6E8', '#00E7B0']}
      style={styles.linearGradient}>
      <Image
        style={styles.logo}
        source={require('../../assets/shopping-bags.png')}
      />
      <Text style={styles.text}>ShoppingApp</Text>
      <View style={styles.attribution}>
        <Text style={styles.attrtext}>
          Icon made by Dighital from www.flaticon.com
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attribution: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attrtext: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00E5B4',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Splash;
