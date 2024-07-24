// App.tsx
import React from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Provider, useMutation, useQuery} from 'urql';
import client from './src/graphql/client';
import {ADD_USER, GET_USERS} from './src/graphql/queries';
const UsersList = () => {
  const [{data, fetching, error}] = useQuery({
    query: GET_USERS,
  });

  if (fetching) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    console.log(error.networkError);
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data.users}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View>
          <Text>Name: {item.name}</Text>
          <Text>Age: {item.age}</Text>
          <Text>Birthdate: {item.birthdate}</Text>
        </View>
      )}
    />
  );
};

const AddUser = () => {
  const [, addUser] = useMutation(ADD_USER);
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');

  const handleSubmit = () => {
    addUser({name, age: parseInt(age), birthdate});
    setName('');
    setAge('');
    setBirthdate('');
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Birthdate"
        value={birthdate}
        onChangeText={setBirthdate}
      />
      <Button title="Add User" onPress={handleSubmit} />
    </View>
  );
};

const App = () => {
  return (
    <Provider value={client}>
      <SafeAreaView>
        <AddUser />
        <UsersList />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
