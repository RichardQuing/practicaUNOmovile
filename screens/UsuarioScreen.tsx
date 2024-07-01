import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "../config/Config";

export default function UsuarioScreen() {
  const [cedula, setcedula] = useState("");
  const [nombre, setnombre] = useState("");
  const [correo, setcorreo] = useState("");
  const [comentario, setcomentario] = useState("");
  const [usuarios, setusuarios] = useState([]);

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
    Alert.alert("Mensaje", "dg");
  }

  setcedula("");
  setnombre("");
  setcorreo("");
  setcomentario("");

  useEffect(() => {
    const starCountRef = ref(db, "usuarios/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      //console.log(data);

      const datatemp: any = Object.keys(data).map((key) => ({
        key,
        ...data[key],
      }));
      console.log(datatemp);
      setusuarios(datatemp);
    });
  }, [])
type Usuarios={
  name: string
}



  return (
    <View style={styles.container}>
      <Text>USUARIOS</Text>
      <TextInput
        placeholder="Ingrese Cedula"
        style={styles.txt}
        onChangeText={(texto) => setcedula(texto)}
        value={cedula}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Ingrese Nombre"
        style={styles.txt}
        onChangeText={(texto) => setnombre(texto)}
        value={nombre}
      />
      <TextInput
        placeholder="Ingrese Correo"
        style={styles.txt}
        onChangeText={(texto) => setcorreo(texto)}
        value={correo}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Ingrese Comentario"
        style={styles.txt}
        onChangeText={(texto) => setcomentario(texto)}
        value={comentario}
      />
      <Button
        title="guardar"
        onPress={() => guardarUsuario(cedula, nombre, correo, comentario)}
      />
      <FlatList
        data={usuarios}
        renderItem={({ item }:{item:Usuarios}) => 
          <View>
            <Text> {item.name}</Text>
          </View>
        }
      />
    </View>
  );
}

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
  },
});
