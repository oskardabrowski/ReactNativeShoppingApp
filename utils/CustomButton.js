import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const CustomButton = props => {
  return (
    <Pressable
      onPress={props.onPressFunction}
      android_ripple={{color: 'red'}}
      style={({pressed}) => [
        {backgroundColor: pressed ? '#333333' : props.color, padding: 10},
      ]}>
      <Text style={styles.textWhite}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  body: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    width: 200,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
    fontSize: 15,
  },
  item: {
    backgroundColor: 'cyan',
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 30,
  },
  textWhite: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default CustomButton;
