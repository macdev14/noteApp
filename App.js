import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { buscaNotas } from "./src/servicos/Notas";
import { Nota } from "./src/componentes/Nota";
import NotaEditor, { estilos as style} from "./src/componentes/NotaEditor";
import { filtraPorCategoriaNotas } from "./src/servicos/Notas";
export default function App() {
  const [notas, setNotas] = useState([]);
  const [notaSelecionada, setNotaSelecionada] = useState();
  const [categoria, setCategoria] = useState();
  async function mostraNotas() {
    const todasNotas = await buscaNotas().catch((error) => console.log(error));
    setNotas(todasNotas);
  }
  useEffect(() => {
    async function carregaNotas() {
      const todasNotas = await buscaNotas().catch((error) => console.log(error));
      setNotas(todasNotas);
    }

    carregaNotas();
  }, []);

  async function filtrar(){
    const notas = await filtraPorCategoriaNotas(categoria).catch((error) => console.log(error));
    setNotas(notas);
  }

  return (
    <SafeAreaView style={estilos.container}>
       <View style={style.modalPicker}>
                <Picker
                  selectedValue={categoria}
                  onValueChange={setCategoria}
                >
                  <Picker.Item label="Pessoal" value="Pessoal" />
                  <Picker.Item label="Trabalho" value="Trabalho" />
                  <Picker.Item label="Outros" value="Outros" />
                </Picker>
              <TouchableOpacity style={style.modalBotaoCancelar} onPress={filtrar}>
                  <Text style={style.modalBotaoTexto}>Filtrar</Text>
          </TouchableOpacity>
         </View>
         
      <FlatList
        data={notas}
        renderItem={(nota) => <Nota {...nota} setNotaSelecionada={setNotaSelecionada}/>}
        keyExtractor={(item) => item.id}
      /> 
       <NotaEditor mostraNotas={mostraNotas} notaSelecionada={notaSelecionada} setNotaSelecionada={setNotaSelecionada} />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
