
import React, { useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'


type toggleButton = {
    toggleFruta: () => void
}
export default function Header(props:toggleButton): JSX.Element {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [tipoFruta, setTipoFruta] = useState<String>('Limon');
    const toggleSwitch = ():void => {
        setIsEnabled(previousState => !previousState);
        props.toggleFruta();
        if (tipoFruta == 'Limon') setTipoFruta('Naranja');
        else setTipoFruta('Limon');
      };
  return (
    <SafeAreaView style={styles.container}>
        <Image source={require('../assets/CELIFRUT.png')} style={styles.image}/>
        <View>
            <Switch
            trackColor={{false: '#7D9F3A', true: '#FF7B25'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#35AB38'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        <Text>{tipoFruta}</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        top: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
        paddingRight:10
      },
      image: {width: 60, height: 60}
})
