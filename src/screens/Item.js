import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import CustomButton from '../../utils/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {setItems} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Item({navigation}) {
  const [name, setName] = useState('');
  const [exists, setExists] = useState(false);
  const [color, setColor] = useState('white');

  const {items, itemID} = useSelector(state => state.itemReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    const Item = items.find(item => item.id === itemID);
    if (Item) {
      setName(Item.name);
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

  return (
    <View style={styles.body}>
      <TextInput
        value={name}
        style={styles.input}
        placeholder="Nazwa"
        onChangeText={value => setName(value)}
      />
      <View style={styles.color_bar}>
        <View style={styles.color_row}>
          <TouchableOpacity
            style={styles.color_white}
            onPress={() => setColor('white')}>
            {color === 'white' && (
              <FontAwesome5 name={'check'} size={25} color={'#000000'} />
            )}
          </TouchableOpacity>
          <Text style={styles.color_row_text}>Bez kategorii</Text>
        </View>
        <View style={styles.color_row}>
          <TouchableOpacity
            style={styles.color_red}
            onPress={() => setColor('red')}>
            {color === 'red' && (
              <FontAwesome5 name={'check'} size={25} color={'#000000'} />
            )}
          </TouchableOpacity>
          <Text style={styles.color_row_text}>Bardzo potrzebne</Text>
        </View>
        <View style={styles.color_row}>
          <TouchableOpacity
            style={styles.color_blue}
            onPress={() => setColor('blue')}>
            {color === 'blue' && (
              <FontAwesome5 name={'check'} size={25} color={'#000000'} />
            )}
          </TouchableOpacity>
          <Text style={styles.color_row_text}>Potrzebne</Text>
        </View>
        <View style={styles.color_row}>
          <TouchableOpacity
            style={styles.color_green}
            onPress={() => setColor('green')}>
            {color === 'green' && (
              <FontAwesome5 name={'check'} size={25} color={'#000000'} />
            )}
          </TouchableOpacity>
          <Text style={styles.color_row_text}>Kup jeśli będzie</Text>
        </View>
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
  color_row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  color_row_text: {
    fontSize: 25,
    color: 'black',
    marginLeft: 15,
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
    width: '100%',
    height: 255,
    marginVertical: 10,
  },
  color_red: {
    width: 60,
    height: 60,
    maxWidth: 60,
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'black',
  },
  color_blue: {
    width: 60,
    height: 60,
    maxWidth: 60,
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'black',
  },
  color_green: {
    width: 60,
    height: 60,
    maxWidth: 60,
    backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'black',
  },
  color_white: {
    width: 60,
    height: 60,
    maxWidth: 60,
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: 'black',
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
