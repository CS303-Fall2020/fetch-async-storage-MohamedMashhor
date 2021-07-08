import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, AsyncStorage, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import Record from './components/record';
import AddNewRecord from './components/addRecord';

import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

import { State } from 'react-native-gesture-handler';

export default function Home() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConected, setIsConected] = useState(true);
  const [isAppReady, setIsAppReady] = useState(true);

  const [tmp, setTmp] = useState(0);
  const showMainScreen = () => {
    setTimeout(() => {
      setIsAppReady(false);
    }, 10000);


  }
  useEffect(() => {
    if (tmp == 0) {
      getRecordsFromAPI();
      setTmp(1);
      showMainScreen();
    }
  });

  const deleteRecordOnPress = (key) => {
    setRecords((prevRecords) => {
      return prevRecords.filter(record => record.id != key)
    });
  }
  const addNewRecordToList = (text) => {
    if (text != '') {
      setRecords((prevRecords) => {
        let rec = { userId: 1, id: Math.random().toString(36).substr(2, 9), title: text, completed: false }
        return [rec, ...prevRecords]
      });
    }
    else {
      Alert.alert('Error', 'Cannot Add New Empty Record!', [{ text: 'Ok' }]);
    }
  }
  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }
  const saveData = (rec) => {
    AsyncStorage.setItem('Todos', JSON.stringify(rec));
  }
  const saveChanges = () => {
    AsyncStorage.setItem('Todos', JSON.stringify(records));
  }
  useEffect(() => {
    saveChanges();
  });

  const getRecordsFromAsyncStorge = async () => {
    setIsLoading(true);
    try {
      let items = await AsyncStorage.getItem('Todos');
      let tmpArr = JSON.parse(items);
      tmpArr.forEach(o => { o.id = o.id.toString(); });
      setRecords(tmpArr);
    }
    catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }
  const getRecordsFromAPI = async () => {
    setIsLoading(true);
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then(response => response.json()).then(json => {
        let tmpArr = JSON.parse(JSON.stringify(json));
        tmpArr.forEach(o => { o.id = o.id.toString(); });
        setRecords([]);
        setRecords(tmpArr);
        setIsConected(true);
      }).catch((error) => {
        setIsConected(false);
        getRecordsFromAsyncStorge();
      });
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Modal visible={isAppReady} animated='slide' >
        <Foundation style={{ marginLeft: 150, marginTop: 200 }}
          name="clipboard-notes" size={200} color={'#0099ff'} />
      </Modal>
      <View style={styles.header} >
        <Text style={styles.title}>ToDo List</Text>
        <TouchableOpacity onPress={() => {
          getRecordsFromAPI();
        }}>
          <FontAwesome style={{ alignSelf: 'flex-end', marginRight: 20 }} name="refresh" size={35} />
        </TouchableOpacity>
        <AddNewRecord style={{ alignSelf: 'flex-end' }} addNewHandler={addNewRecordToList} />
      </View>
      {isConected ? (<View></View>) :
        (<Text style={{ backgroundColor: '#ffff00', textAlign: 'center', fontWeight: 'bold', fontSize: 30 }}>offline!</Text>)}
      <View style={styles.content}>
        <View style={styles.list}>
          <FlatList
            data={records}
            renderItem={({ item }) => (
              <Record item={item} pressHandler={deleteRecordOnPress} />
            )} />
        </View>
        {isLoading ? (<ActivityIndicator size="large" color="#0000ff" />)
          : (<View></View>)
        }
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: '12%',
    paddingTop: 30,
    paddingHorizontal: 10,
    backgroundColor: '#0099ff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  title: {
    flex: 1,
    textAlign: 'left',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 10,
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
