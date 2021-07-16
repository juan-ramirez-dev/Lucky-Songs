import React from 'react'
import { connect } from "react-redux";
import Swal from 'sweetalert2';
import db from '../../config/db.js';
import firebase from 'firebase';

const Music = ({userData , eliminarCancionRedux , music }) => {

    const eliminarCancion = (cancion) => {
        Swal.fire({
            title: '¿Estas seguro que quieres eliminar esta canción?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          }).then( async (result) => {
            if (result.isConfirmed) {
                const consulta = await db.firestore.collection("Usuarios").where("id" , "==" , userData.id).get()
                const id = consulta.docs[0].id
                const nuevasCanciones = userData.songs.filter(song => song.name !== cancion.name)
                const datos = { 
                    id : userData.id,
                    name : userData.name,
                    playList : userData.playList,
                    songs : nuevasCanciones
                }
                let storage = firebase.storage();
                let storageRef = storage.ref();
                let imagen = storageRef.child(cancion.imagenNombre);
                let url = storageRef.child(cancion.musicNombre);
                imagen.delete()
                url.delete()

                db.firestore.collection("Usuarios").doc(id)
                .update(datos)
                .then(res => {
                    eliminarCancionRedux(cancion, datos , music)
                    Swal.fire({
                        icon : "success",
                        title : "Canción eliminada correctamente"
                    })
                })
            }
          })
    }

    return (
        <div className="mx-5" >
            <h2 className="p-4" > Welcome {userData.name} </h2>
            <div>
                { userData.songs.length === 0 ? 
                    <div className="alert alert-warning m-4" >
                        No tienes canciones subidas.
                    </div>
                :
                <div>
                    {userData.songs.map(data => 
                        <div key={data.name} className="w-100 shadow p-2 m-2 row" >
                            <div className="col-md-2" >
                                <div className="d-flex justify-content-center my-2" >
                                    <img src={data.imagen} className="w-50" alt={data.imagenNombre} />
                                </div>
                            </div>
                            <div className="col-md-2" >
                                <div className="my-2" >
                                    <h6> <strong> {data.name} </strong> </h6>
                                    <p > {data.description} </p>
                                </div>
                            </div>
                            <div className="col-md-2" >
                                <div className="my-2" >
                                    <h6> <strong> {data.author} </strong> </h6>
                                    <p > {data.gender} </p>
                                </div>
                            </div>

                            <div className="col-md-2" >
                                <div className="my-2" >
                                    <audio controls className="w-100" >
                                        <source src={data.music} type="audio/mpeg" /> 
                                    </audio>
                                </div>
                            </div>

                            <div className="col-md-4" >
                                <div className="d-flex justify-content-center my-2" >
                                    <div className="shadow pointer rounded-circle bg-danger p-3 m-2" onClick={()=> eliminarCancion(data) } >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
                }
            </div>

        </div>
    );
}
 
//Recuperando el state del store
const mapStateToProps = state => ({
    userData : state.user,
    music : state.music
})
  
  
const mapDispatchToProps = dispatch => ({
    eliminarCancionRedux(song , user, music) {
        dispatch({
          type: "@eliminarCancion",
          song : song,
          user : user,
          music : music
        })
    }
})
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Music)