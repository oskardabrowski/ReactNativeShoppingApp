import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from '@babel/core';
import {setItemID, setItems} from '../redux/actions';
import {FlatList} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';

export default function Checked({navigation}) {
  const {items} = useSelector(state => state.itemReducer);
  const dispatch = useDispatch();

  const deleteItem = ID => {
    const filteredItems = items.filter(item => item.id !== ID);
    AsyncStorage.setItem('Items', JSON.stringify(filteredItems))
      .then(() => {
        dispatch(setItems(filteredItems));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAllItems = () => {
    const filteredItems = items.filter(item => item.exists !== true);
    AsyncStorage.setItem('Items', JSON.stringify(filteredItems))
      .then(() => {
        dispatch(setItems(filteredItems));
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={items.filter(item => item.exists === true)}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setItemID(item.id));
              navigation.navigate('Dodaj przedmiot');
            }}>
            <View style={styles.item_row}>
              <View
                style={[
                  styles.color,
                  {
                    backgroundColor: item.color,
                  },
                ]}></View>
              <View style={styles.item_body}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
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
      <LinearGradient
        colors={['#7D0085', '#430085']}
        style={styles.buttonGradient}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            deleteAllItems();
          }}>
          <MaterialCommunityIcons
            name={'reload'}
            size={32.5}
            color={'#ffffff'}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  buttonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 10,
  },
});
