import React,{useEffect, useState} from 'react';
import Navbar from './Views/All/Navbar';
import Footer from './Views/All/Footer';
import Rutas from './config/Router';
import firebase from 'firebase';
import { connect } from "react-redux";
import db from './config/db';
import Reproductor from './Views/All/Reproductor';

function App({ userData , agregarSesion , agregarMusic}) {

  const [Validacion, setValidacion] = useState(false)

  const CargarDatosUsuario = () => {
      firebase.auth().onAuthStateChanged( async (user) => {
        if(user){
          const id = user.uid
          const data = await db.firestore.collection("Usuarios").where("id", "==" , id ).get()
          const datos = {
              id : data.docs[0].data().id ,
              playList : data.docs[0].data().playList, 
              name : data.docs[0].data().name ,
              songs : data.docs[0].data().songs 
          }
          agregarSesion(datos)
          setValidacion(true)
        }else{
          agregarSesion(false)
          setValidacion(true)
        }
      });
  }

  const CargarTodaslasCanciones = async () => {
      let arregloSongs = []
      const consulta = await db.firestore.collection("Usuarios").get()
      if(consulta.docs.length > 0){
          consulta.docs.forEach(element => {
              const songs = element.data().songs
              songs.forEach(data => {
                arregloSongs.push(data)
              })
          })
          agregarMusic(arregloSongs)
      }else{
        agregarMusic([])
      }
  }


  useEffect(() => {
      CargarDatosUsuario()
      CargarTodaslasCanciones()
      // eslint-disable-next-line
  }, [])


  return (
    <div>
      {Validacion ? 
        <div>
          <Navbar User={userData} />
          <Rutas  User={userData} />
          <Reproductor />
          <Footer User={userData} />
        </div>
      :null}
    </div>
  );
}


//Recuperando el state del store
const mapStateToProps = state => ({
  userData : state.user
})


//Creando un nuevo state con los datos del usuario
const mapDispatchToProps = dispatch => ({
  agregarSesion(user) {
    dispatch({
      type: "@agregarSesion",
      user : user
    })
  },
  agregarMusic(music) {
    dispatch({
      type: "@agregarMusic",
      music : music
    })
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(App)