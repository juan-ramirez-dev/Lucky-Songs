import React,{useState} from 'react'
import img from '../../../img/addMusic.svg'
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import firebase from 'firebase';
import db from '../../../config/db.js'

const AddMusic = ({user}) => {

    const [Campos, setCampos] = useState({
        name : "",
        author :"",
        gender : "",
        description : ""
    })

    const onChange = (e) => {
        setCampos({
            ...Campos, 
            [e.target.name] : e.target.value
        })
    }


    const addMusicFirebase = (e) => {
        e.preventDefault()
        const File = document.getElementById("FILE").files
        const IMG = document.getElementById("IMG").files
        const {name, gender, author, description} = Campos
        if(File.length > 0 && File[0].type === "audio/mpeg" && IMG.length > 0 && IMG[0].type === "image/jpeg" ){
            if(name !== "" && gender !== "" && author !=="" && description !== ""){
                const storage = firebase.storage().ref(`/Music/${File[0].name}`)
                const task = storage.put(
                    File[0] , 
                    {contentType: 'audio/mpeg'}
                )
                task.on('state_changed' , ()=> {
                }, error =>{
                    console.log(error);
                }, () => {
                    task.snapshot.ref.getDownloadURL().then((dato) => {
                        const storage = firebase.storage().ref(`/Img-Music/${IMG[0].name}`)
                        const task = storage.put(
                            IMG[0] , 
                            { contentType: 'image/jpeg'}
                        )
                        task.on('state_changed' , ()=> {
                        }, error =>{
                            console.log(error);
                        }, () => {
                            task.snapshot.ref.getDownloadURL().then(async (img) => {

                                const musicData = {
                                    music : dato,
                                    musicNombre : `/Music/${File[0].name}`,
                                    name : name,
                                    gender : gender,
                                    author : author,
                                    description: description,
                                    idUsuario : user.id,
                                    imagen : img,
                                    imagenNombre : `/Img-Music/${IMG[0].name}`
                                }  

                                user.songs.push(musicData)
                                
                                const userData = {
                                    id : user.id,
                                    name : user.name,
                                    playList : user.playList,
                                    songs : user.songs
                                }
        
                                subirArchivos(userData)
                            })
                        })
                    })
                })
            }else{
                Swal.fire({
                    icon  : "warning",
                    title : "Campos Vacíos",
                    text : "Recuerda llenar correctamente todos los campos."
                })
            }
        }else{
            Swal.fire({
                icon  : "warning",
                title : "No has agregado un audio valido.",
                text : "Recuerda agregar un archivo mp3"
            })
        }
    }


    const subirArchivos = async (userData) => {
        const consulta = await db.firestore.collection("Usuarios").where("id", "==", user.id).get()
        const id = consulta.docs[0].id
        db.firestore.collection("Usuarios").doc(id)
        .update(userData)
        .then(res => {
            Swal.fire({
                icon : "success",
                title : "Canción subida correctamente."
            })
            window.location.reload()
        })
    }

    return (
        <div>
            <h4> Here you can add all the songs you want! </h4>
            <div className="row" >
                <div className="col-md-5">
                    <div className="p-3 m-2" >
                        <img className="w-100" src={img} alt="add Music" />
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="p-3 m-2" >
                        <form onSubmit={addMusicFirebase} >
                            <TextField onChange={onChange} type="text" name="name" className="w-100 m-2" label="Name of the song" />
                            <TextField onChange={onChange} type="text" name="gender" className="w-100 m-2" label="Musical genre" />
                            <TextField onChange={onChange} type="text" name="author" className="w-100 m-2" label="Author" />
                            <TextField onChange={onChange} type="text" name="description" className="w-100 m-2" label="Description" />
                            <h6 className="m-2" > Song file </h6>
                            <input type="file"     id="FILE" className="form-control w-100 m-2" />
                            <h6 className="m-2" > Song cover  </h6>
                            <input type="file"     id="IMG" className="form-control w-100 m-2" />
                            <button type="submit" className="w-100 btn btn-outline-dark m-2" > Add Music </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default AddMusic;