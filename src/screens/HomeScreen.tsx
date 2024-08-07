import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useMutation, useQuery} from 'urql';
import Button from '../components/button/Button';
import Spacing from '../components/spacing/Spacing';
import {ADD_PRODUCT, GET_PRODUCTS} from '../graphql/queries';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 20px;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 24px;
  font-weight: bold;
  margin: 10px;
`;

const ProductInputContainer = styled.View`
  margin-bottom: 20px;
`;

const StyledTextInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.placeholderTextColor,
}))`
  background-color: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.text};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-horizontal: 10px;
`;

const ProductListContainer = styled.View`
  flex: 1;
`;

const ProductCard = styled.View`
  background-color: ${props => props.theme.colors.cardBackground};
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  margin-horizontal: 10px;
`;

const ProductText = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
`;

const ProductList = () => {
  const [{data, fetching, error}] = useQuery({
    query: GET_PRODUCTS,
  });

  if (fetching) {
    return <ProductText>Loading...</ProductText>;
  }
  if (error) {
    console.log(error.networkError);
    return <ProductText>Error: {error.message}</ProductText>;
  }

  return (
    <FlatList
      data={data.products}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ProductCard>
          <ProductText>Name: {item.name}</ProductText>
          <ProductText>Price: {item.price}</ProductText>
        </ProductCard>
      )}
    />
  );
};

const AddProduct = () => {
  const [, addProduct] = useMutation(ADD_PRODUCT);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');

  const handleSubmit = () => {
    addProduct({name, price: parseInt(price)});
    setName('');
    setPrice('');
  };

  return (
    <ProductInputContainer>
      <StyledTextInput value={name} onChangeText={setName} placeholder="Name" />

      <StyledTextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Spacing height={10} />
      <Button title="Add Product" onPress={handleSubmit} />
    </ProductInputContainer>
  );
};

const HomeScreen = () => {
  return (
    <Container>
      <Header>
        <Title>Product Management</Title>
      </Header>
      <AddProduct />
      <ProductListContainer>
        <ProductList />
      </ProductListContainer>
    </Container>
  );
};

export default HomeScreen;
