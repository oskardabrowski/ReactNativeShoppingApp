import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from '@babel/core';
import {setItemID, setItems} from '../redux/actions';
import {FlatList} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

export default function List({navigation}) {
  const {items} = useSelector(state => state.itemReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    AsyncStorage.getItem('Items')
      .then(items => {
        const parsedItems = JSON.parse(items);
        if (parsedItems && typeof parsedItems === 'object') {
          dispatch(setItems(parsedItems));
        }
      })
      .catch(err => console.log(err));
  };

  const deleteItem = ID => {
    const filteredItems = items.filter(item => item.id !== ID);
    AsyncStorage.setItem('Items', JSON.stringify(filteredItems))
      .then(() => {
        dispatch(setItems(filteredItems));
        Alert.alert('Sukces!', 'Przedmiot skasowany pomyślnie.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const checkItem = (ID, newValue) => {
    const index = items.find(item => item.id === ID);
    if (index) {
      const newItems = [...items];
      const newNewItem = newItems.map(item => {
        if (item.id === index.id) item.exists = newValue;
        return item;
      });
      AsyncStorage.setItem('Items', JSON.stringify(newNewItem))
        .then(() => {
          dispatch(setItems(newNewItem));
          Alert.alert('Sukces!', 'Przedmiot zapisany pomyślnie.');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={items.filter(item => item.exists === false)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setItemID(item.id));
              navigation.navigate('Przedmiot');
            }}>
            <View style={styles.item_row}>
              <View
                style={[
                  styles.color,
                  {
                    backgroundColor: item.color,
                  },
                ]}></View>
              <CheckBox
                value={item.exists}
                onValueChange={newValue => {
                  checkItem(item.id, newValue);
                }}
              />
              <View style={styles.item_body}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.desc} numberOfLines={1}>
                  {item.desc}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  deleteItem(item.id);
                }}>
                <FontAwesome5 name={'trash'} size={25} color={'#ff3636'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => {
          index.toString();
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setItemID(items.length + 1));
          navigation.navigate('Przedmiot');
        }}>
        <FontAwesome5 name={'plus'} size={20} color={'#ffffff'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#B400D0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  name: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  desc: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
  color: {
    width: 20,
    height: 100,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
});
