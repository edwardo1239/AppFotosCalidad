/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Header from './src/components/Header';
import Form from './src/components/Form';
import Footer from './src/components/Footer';

function App(): JSX.Element {
  const [tipoFruta, setTipoFruta] = useState<boolean>(false);

  const toggleFruta = ():void => {
    setTipoFruta(!tipoFruta);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header toggleFruta={toggleFruta} />
      <Form tipoFruta={tipoFruta} />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
