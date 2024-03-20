/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';

type formType = {
  tipoFruta: boolean;
};
let url: string;

export default function Form(props: formType): JSX.Element {
  useEffect(() => {
    const obtenerLink = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyxbqQq58evRO8Hp5FE88TJPatYPc03coveFaBc9cFYYIii-j5I1tvxsUOQH7xfJ8KB/exec',
        );
        const links = await response.json();
        url = links.preciosDev;
        console.log(url);
      } catch (e: unknown) {
        return Alert.alert(`Error:${e}`);
      }
    };
    obtenerLink();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyxbqQq58evRO8Hp5FE88TJPatYPc03coveFaBc9cFYYIii-j5I1tvxsUOQH7xfJ8KB/exec',
        );
        const links = await response.json();
        console.log(links.preciosDev);
      } catch (e: unknown) {
        return Alert.alert(`Error:${e}`);
      }
    }, 500000);
    return () => clearInterval(intervalId);
  }, []);

  const semanas: number[] = [...Array(52).keys()];
  const [exportacionN1, setexportacionN1] = useState<string>('');
  const [exportacionN15, setexportacionN15] = useState<string>('');
  const [parejaN, setparejaN] = useState<string>('');
  const [descarteN, setdescarteN] = useState<string>('');
  const [nacionalN, setnacionalN] = useState<string>('');

  const [exportacionL1, setexportacionL1] = useState<string>('');
  const [exportacionL15, setexportacionL15] = useState<string>('');
  const [descarteL, setdescarteL] = useState<string>('');
  const [nacionalL, setnacionalL] = useState<string>('');

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [semana, setSemana] = useState<string>('semana');
  const [loader, setLoader] = useState<boolean>(false);

  const guardarDatos = async () => {
    let tipoFruta: string;
    let exportacion1: string;
    let exportacion15: string;
    let pareja: string;
    let descarte: string;
    let nacional: string;
    try {
      if (semana === 'semana') return Alert.alert('Seleccione una semana');
      setLoader(true);
      setModalVisible(true);

      if (props.tipoFruta) {
        tipoFruta = 'Naranja';
        exportacion1 = exportacionN1;
        exportacion15 = exportacionN15;
        pareja = parejaN;
        descarte = descarteN;
        nacional = nacionalN;
      } else {
        tipoFruta = 'Limon';
        exportacion1 = exportacionL1;
        exportacion15 = exportacionL15;
        pareja = parejaN;
        descarte = descarteL;
        nacional = nacionalL;
    }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          action: 'precios',
          tipoFruta: tipoFruta,
          exportacion1: exportacion1,
          exportacion15: exportacion15,
          descarte: descarte,
          pareja: pareja,
          nacional: nacional,
          semana: semana,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const responseFetch = await response.json();
      setLoader(false);
      setModalVisible(false);
      resetearInputs();
      Alert.alert("Guardado con exito");
      console.log(responseFetch);
    } catch (e: any) {
      setLoader(false);
      setModalVisible(false);
      // console.log(e)
      Alert.alert(`${e.name}: ${e.message}`);
    }
  };

  const resetearInputs = () => {
    setexportacionL1('');
    setexportacionN1('');
    setexportacionL15('');
    setexportacionN15('');
    setdescarteL('');
    setdescarteN('');
    setnacionalL('');
    setnacionalN('');
    setparejaN('');
  };

  const pressModal = (e: number): void => {
    setSemana('Semana ' + e);
    setModalVisible(false);
  };
  return (
    <ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {loader == true ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <ScrollView style={styles.scrollviewSemanas}>
                {semanas.map((numero: number) => (
                  <TouchableOpacity
                    style={styles.semanasTouchable}
                    key={numero + 'touchable'}
                    onPress={() => pressModal(numero + 1)}>
                    <Text key={numero + 'texto'} style={{fontSize: 15}}>
                      Semana {numero + 1}{' '}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {props.tipoFruta ? (
        <View style={styles.conatainer}>
          <Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 25}}>
            Precio Naranja
          </Text>

          <TouchableOpacity
            style={styles.semanasButton}
            onPress={() => setModalVisible(true)}>
            <Text>{semana}</Text>
          </TouchableOpacity>

          <Text style={styles.text}>Exportación tipo 1</Text>
          <TextInput
            style={styles.inputs}
            placeholder="0.0"
            inputMode="numeric"
            value={exportacionN1}
            onChangeText={setexportacionN1}
          />

          <Text style={styles.text}>Exportación tipo 1.5</Text>
          <TextInput
            style={styles.inputs}
            placeholder="0.0"
            inputMode="numeric"
            value={exportacionN15}
            onChangeText={setexportacionN15}
          />
          <Text style={styles.text}>pareja</Text>
          <TextInput
            style={styles.inputs}
            placeholder="0.0"
            inputMode="numeric"
            value={parejaN}
            onChangeText={setparejaN}
          />
          <Text style={styles.text}>Descarte</Text>
          <TextInput
            style={styles.inputs}
            placeholder="0.0"
            inputMode="numeric"
            value={descarteN}
            onChangeText={setdescarteN}
          />
          <Text style={styles.text}>Nacional</Text>
          <TextInput
            style={styles.inputs}
            placeholder="0.0"
            inputMode="numeric"
            value={nacionalN}
            onChangeText={setnacionalN}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white', fontSize: 25}} onPress={guardarDatos}>
              Guardar
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.conatainer}>
          <Text style={{marginTop: 15, fontWeight: 'bold', fontSize: 25}}>
            Precio Limon
          </Text>
          <TouchableOpacity
            style={styles.semanasButton}
            onPress={() => setModalVisible(true)}>
            <Text>{semana}</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Exportación tipo 1</Text>
          <TextInput
            style={styles.inputs}
            placeholder="0.0"
            inputMode="numeric"
            value={exportacionL1}
            onChangeText={setexportacionL1}
          />
          <Text style={styles.text}>Exportación tipo 1.5</Text>
          <TextInput
            style={styles.inputs}
            placeholder="0.0"
            inputMode="numeric"
            value={exportacionL15}
            onChangeText={setexportacionL15}
          />
          <Text style={styles.text}>Descarte</Text>
          <TextInput
            style={styles.inputs}
            placeholder="0.0"
            inputMode="numeric"
            value={descarteL}
            onChangeText={setdescarteL}
          />
          <Text style={styles.text}>Nacional</Text>
          <TextInput
            style={styles.inputs}
            placeholder="0.0"
            inputMode="numeric"
            value={nacionalL}
            onChangeText={setnacionalL}
          />

          <TouchableOpacity style={styles.button} onPress={guardarDatos}>
            <Text style={{color: 'white', fontSize: 25}}>Guardar</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
  },
  inputs: {
    borderWidth: 2,
    borderColor: 'skyblue',
    width: 250,
    paddingTop: 5,
    margin: 10,
    borderRadius: 10,
    paddingLeft: 8,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#9E3C29',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 155,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  semanasButton: {
    borderWidth: 2,
    borderColor: 'skyblue',
    width: 250,
    height: 40,
    paddingTop: 5,
    margin: 10,
    borderRadius: 10,
    paddingLeft: 8,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  semanasTouchable: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  scrollviewSemanas: {
    width: 150,
  },
});
