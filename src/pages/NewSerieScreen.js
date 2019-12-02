import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Picker,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';

import FormRow from '../components/FormRow';
import { connect } from 'react-redux';
import { setField, saveSerie, setAllFields, resetForm} from '../actions';
import Slider from '@react-native-community/slider';

class NewSerieScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {

    const {navigation, setAllFields, resetForm} = this.props;
    const { params } = navigation.state;

    if(params && params.serieToEdit) {
      setAllFields(params.serieToEdit)
    } else {
      resetForm();
    }
  }

  render() {
    const { serieForm, setField, saveSerie, navigation } = this.props;

    return (
      <ScrollView>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="Título"
            value={serieForm.title}
            onChangeText={value => setField('title', value)}
          />
        </FormRow>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="URL da imagem"
            value={serieForm.img}
            onChangeText={value => setField('img', value)}
          />
        </FormRow>
        <FormRow>
          <Picker
            selectedValue={serieForm.gender}
            onValueChange={itemValue => {
              setField('gender', itemValue);
            }
            }>
            <Picker.Item label="Ação" value="Ação" />
            <Picker.Item label="Comédia" value="Comédia" />
            <Picker.Item label="Drama" value="Drama" />
            <Picker.Item label="Ficção Científica" value="Ficção Científica" />
            <Picker.Item label="Infatil" value="Infantil" />
            <Picker.Item label="Terror" value="Terror" />
          </Picker>
        </FormRow>
        <FormRow>
          <View style={styles.rate}>
            <Text>Nota: </Text>
            <Text>{serieForm.rate}</Text>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={100}
            step={5}
            value={serieForm.rate}
            onValueChange={value => {
              setField('rate', value);
            }}
          />
        </FormRow>
        <FormRow>
          <TextInput
            style={styles.textinput}
            placeholder="Descrição"
            value={serieForm.description}
            onChangeText={value => setField('description', value)}
            numberOfLines={5}
            multiline={true}
          />
        </FormRow>

        {
          this.state.isLoading ?
            <ActivityIndicator />
            :
            <Button
              title="Salvar"
              onPress={async () => {
                this.setState({ isLoading: true })

                try {
                  await saveSerie(serieForm);
                  navigation.goBack();
                } catch (error) {
                  Alert.alert('Erro', error.message);
                } finally {
                  this.setState({ isLoading: false })
                }

              }} />
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  rate: {
    flexDirection: 'row',
    paddingBottom: 15,
  }
});

const mapStateToProps = (state) => {
  return ({
    serieForm: state.serieForm
  })
}

const mapDispatchToProps = {
  setField,
  saveSerie,
  setAllFields,
  resetForm
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSerieScreen);