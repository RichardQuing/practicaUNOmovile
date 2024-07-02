import {Alert, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ref, set, onValue, update, remove } from "firebase/database";
import { db } from "../config/Config";
import Tarjeta from "../components/Tarjeta";

export default function UsuarioScreen() {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");

  const [usuarios, setUsuarios] = useState([]);
//---------------------------------GUARDAR-----------------------------------

  function guardarUsuario(
    cedula: string,
    nombre: string,
    correo: string,
    comentario: string
  ) {
    set(ref(db, "usuarios/" + cedula), {
      name: nombre,
      email: correo,
      coment: comentario,
    });
    Alert.alert("Mensaje", "Usuario guardado con éxito");
    limpiarCampos();
  }
//---------------------------------LIMPIAR-----------------------------------

  function limpiarCampos() {
    setCedula("");
    setNombre("");
    setCorreo("");
    setComentario("");
  }

  useEffect(() => {
    const starCountRef = ref(db, "usuarios/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const datatemp = data
        ? Object.keys(data).map((key) => ({
            key,
            ...data[key],
          }))
        : [];
    });
  }, []);
  //---------------------------------LEER-----------------------------------
function leer() {
 useEffect(() => {
   leer()
 },[])


  //---------------------------------EDITAR-----------------------------------
  function editar(id: string) {
    update(ref(db, "usuarios/" + id), {
      name: nombre,
      email: correo,
      coment: comentario,
    });
  }
function editar2(item:any){
setCedula(item.key)
setNombre(item.name)
setCorreo(item.email)
setComentario(item.coment)
}

  //---------------------------------ELIMINAR-----------------------------------
  function eliminar(id: string) {
    remove(ref(db, "usuarios/" + id));
  }

  type Usuario = {
    name: string,
    key: string
    
  };

  return (
    <View style={styles.container}>
      <Text>USUARIOS</Text>
      <TextInput
        placeholder="Ingrese Cedula"
        style={styles.txt}
        onChangeText={setCedula}
        value={cedula}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Ingrese Nombre"
        style={styles.txt}
        onChangeText={setNombre}
        value={nombre}
      />
      <TextInput
        placeholder="Ingrese Correo"
        style={styles.txt}
        onChangeText={setCorreo}
        value={correo}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Ingrese Comentario"
        style={styles.txt}
        onChangeText={setComentario}
        value={comentario}
      />
      <Button
        title="Guardar"
        onPress={() => guardarUsuario(cedula, nombre, correo, comentario)}
      />
      <FlatList
        data={usuarios}
        renderItem={({ item }: { item: Usuario }) => (
          <View>
            <Tarjeta usuario={item} />
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Editar"
                color="green"
                onPress={() => editar2(item.key)}
              />
              <Button
                title="Eliminar"
                color="red"
                onPress={() => eliminar(item.key)}
              />
            </View>
          </View>
        )}
      />

      <StatusBar />
    </View>
  );
}

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ab2121",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    backgroundColor: "#945151",
    height: 50,
    width: "80%",
    margin: 2,
    fontSize: 20,
    padding: 10,
  },
})
