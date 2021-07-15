import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import db from '../../config/db.js';

const OptionsMusic = ({data}) => {

    const [Validacion, setValidacion] = useState(false)
    const state = useSelector(state => state.user)

    const addInterfazPlayList = () => {
        if(state){
            if(Validacion){
                setValidacion(false)
            }else{
                setValidacion(true)
            }
        }else{
            window.location.replace("/Lucky-Songs/#/Login")
        }
    }

    const agregarCancion = (lista) => {
        Swal.fire({
            title: '¿Quieres agregar esta cancíon a esta lista de reproducción?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          }).then(async (result) => {
            if (result.isConfirmed) {
                lista.songs.push(data)
                const consulta = await db.firestore.collection("Usuarios").where("id" , "==", state.id).get()
                const id = consulta.docs[0].id
                await db.firestore.collection("Usuarios").doc(id)
                .update(state)
                .then(res => {
                    Swal.fire({
                        icon : "success",
                        title : "Canción agregada correctamente."
                    })
                    window.location.reload()
                })
            } 
          })
    }

    return (
        <div>
            <div className="d-flex justify-content-between" >
                <div className="mt-2" >
                    <h6> <strong> {data.name} - {data.author} </strong> </h6>
                    <p> {data.views} </p>
                </div>

                <div className="p-3 m-2 rounded pointer shadow" onClick={() => addInterfazPlayList(data)} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-music-note-list" viewBox="0 0 16 16">
                        <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                        <path fillRule="evenodd" d="M12 3v10h-1V3h1z"/>
                        <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                        <path fillRule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </div>
            </div>
            <div>
                {Validacion ? 
                    <div>
                        {state.playList.map(dato => 
                            <div key={dato.id} className="shadow p-3 w-100 my-2 pointer" onClick={ ()=>  agregarCancion(dato)} >
                                <h6 className="mt-2" > <strong> {dato.name} </strong> </h6>
                            </div>
                        )}
                    </div>
                :null}
            </div>
        </div>
    );
}
 
export default OptionsMusic;