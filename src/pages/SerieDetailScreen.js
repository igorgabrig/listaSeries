import React from 'react';
import { 
  ScrollView,
  Image, 
  StyleSheet,
  Button,
  View
} from 'react-native';
import Line from '../components/Line';
import LongText from '../components/LongText';

import {connect} from 'react-redux';
import {deleteSerie} from '../actions';

class SerieDetailScreen extends React.Component {
  render() {
    const { serie } = this.props.navigation.state.params;
    return(
      <ScrollView>
        <Image 
          source={{
            uri: serie.img
          }}
          style={styles.image} 
        />
        <Line label="Título" content={serie.title} />
        <Line label="Gênero" content={serie.gender} />
        <Line label="Nota" content={serie.rate}/>
        <LongText label="Descrição" content={serie.description} />
        <View style={styles.button}>
          <Button 
            title="Editar"
            onPress={() => {
              this.props.navigation.replace('NewSerieScreen', {serieToEdit: serie});
            }}
            />
        </View>

        <View style={styles.button}>
          <Button 
            title="Excluir"
            color="#FF0004"
            onPress={ async () => {
              const hasDeleted = await this.props.deleteSerie(serie)

              if(hasDeleted) {
                this.props.navigation.goBack();
              }
            }}
            />
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2,
  },
  button: {
    margin: 10
  }
});

export default connect(null, {deleteSerie} )(SerieDetailScreen);