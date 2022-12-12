import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import PushNotification from 'react-native-push-notification';

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
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/shopping-bags.png')}
      />
      <Text style={styles.text}>ShoppingApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
