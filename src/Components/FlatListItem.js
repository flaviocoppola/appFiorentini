import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Item = ({name, id}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.textCard}><Text style={styles.textTitle}>ID Macchina: </Text>{id}</Text>
      <Text style={styles.textCard}><Text style={styles.textTitle}>Nome Macchina: </Text>{name}</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate({name: 'Details', params: {id: id}})}>
          <Text style={styles.btnText}>Gestisci Macchina</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 20,
  },
  textCard: {
    padding: 20,
    fontSize: 17,
  },
  btnContainer: {
    alignItems: 'center',
    padding: 20,
  },
  btn: {
    backgroundColor: 'grey',
    padding: 6,
    borderRadius: 20,
  },
  btnText: {
    fontWeight: '800',
    color: 'white',
  },
  textTitle: {
    fontWeight: '800',
  },
});

export default Item;
