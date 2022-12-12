import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../../utils/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {setItems} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Modal} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default function Item({navigation}) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [exists, setExists] = useState(false);
  const [showBellModal, setShowBellModal] = useState(false);
  const [color, setColor] = useState('white');
  const [bellTime, setBellTime] = useState('1');

  const {items, itemID} = useSelector(state => state.itemReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    const Item = items.find(item => item.id === itemID);
    if (Item) {
      setName(Item.name);
      setDesc(Item.desc);
      setExists(Item.exists);
      setColor(Item.color);
    }
  };

  const setItem = () => {
    if (name.length == 0) {
      Alert.alert('Uwaga!', 'Wpisz nazwę przedmiotu.');
    } else {
      try {
        let Item = {
          id: itemID,
          name: name,
          desc: desc,
          exists: exists,
          color: color,
        };

        const index = items.find(item => item.id === itemID);
        let newItems = [];

        if (index) {
          newItems = [...items];
          const newNewItems = newItems.map(el => {
            if (el.id === itemID) {
              return Item;
            } else {
              return el;
            }
          });
          newItems = newNewItems;
        } else {
          newItems = [...items, Item];
        }

        AsyncStorage.setItem('Items', JSON.stringify(newItems))
          .then(() => {
            dispatch(setItems(newItems));
            Alert.alert('Sukces!', 'Przedmiot został dodany.');
            navigation.goBack();
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setTaskAlarm = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: name,
      message: desc,
      date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
      allowWhileIdle: true,
    });
  };

  return (
    <View style={styles.body}>
      <Modal
        visible={showBellModal}
        transparent
        onRequestClose={() => setShowBellModal(false)}
        animationType="slide"
        hardwareAccelerated
        style={styles.modal_style}>
        <View style={styles.centered_view}>
          <View style={styles.bell_modal}>
            <View style={styles.bell_body}>
              <Text style={styles.text}>Przypomnij się po:</Text>
              <TextInput
                style={styles.bell_input}
                keyboardType="numeric"
                value={bellTime}
                onChangeText={value => setBellTime(value)}
              />
              <Text style={styles.text}>minutach</Text>
            </View>
            <View style={styles.bell_buttons}>
              <TouchableOpacity
                style={styles.bell_cancel_button}
                onPress={() => setShowBellModal(false)}>
                <Text style={styles.text}>Odrzuć</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bell_ok_button}
                onPress={() => {
                  setShowBellModal(false);
                  setTaskAlarm();
                }}>
                <Text style={styles.text}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TextInput
        value={name}
        style={styles.input}
        placeholder="Nazwa"
        onChangeText={value => setName(value)}
      />
      <TextInput
        value={desc}
        style={styles.input}
        placeholder="Opis"
        multiline
        onChangeText={value => setDesc(value)}
      />
      <View style={styles.color_bar}>
        <TouchableOpacity
          style={styles.color_white}
          onPress={() => setColor('white')}>
          {color === 'white' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_red}
          onPress={() => setColor('red')}>
          {color === 'red' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_blue}
          onPress={() => setColor('blue')}>
          {color === 'blue' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_green}
          onPress={() => setColor('green')}>
          {color === 'green' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.extra_row}>
        <TouchableOpacity
          style={styles.extra_button}
          onPress={() => {
            setShowBellModal(true);
          }}>
          <FontAwesome5 name={'bell'} size={25} color={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.extra_button}
          onPress={() => {
            navigation.navigate('Camera', {id: itemID});
          }}>
          <FontAwesome5 name={'camera'} size={25} color={'#ffffff'} />
        </TouchableOpacity>
      </View>
      <View style={styles.checkbox}>
        <CheckBox
          value={exists}
          onValueChange={newValue => setExists(newValue)}
        />
        <Text style={styles.text}>W koszyku?</Text>
      </View>
      <CustomButton
        title="Zapisz przedmiot"
        style={{width: '100%'}}
        color="#00E5B4"
        onPressFunction={setItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
  color_bar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555555',
    marginVertical: 10,
  },
  color_red: {
    flex: 1,
    backgroundColor: '#f28',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_blue: {
    flex: 1,
    backgroundColor: '#aecbfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_green: {
    flex: 1,
    backgroundColor: '#ccff90',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  color_white: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  extra_row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  extra_button: {
    flex: 1,
    height: 50,
    backgroundColor: '#0080ff',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  bell_modal: {
    width: 300,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  bell_body: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_buttons: {
    flexDirection: 'row',
    height: 50,
  },
  bell_input: {
    width: 50,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontSize: 20,
    margin: 10,
  },
  bell_cancel_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_ok_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
