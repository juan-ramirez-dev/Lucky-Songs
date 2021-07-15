import React,{useState} from 'react'
import Swal from 'sweetalert2'
import db from '../../config/db.js'
import { connect } from 'react-redux';


const AddPlayList = ({user}) => {

    const [Campos, setCampos] = useState({
        name : "",
        descri : ""
    })

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    const subirPlaylist = async (e) => {
        e.preventDefault()
        const {name, descri} = Campos
        if(name !== "" && descri !== ""){
            const consulta = await db.firestore.collection("Usuarios").where("id", "==" ,user.id ).get()
            const id = consulta.docs[0].id
            const oldPlayList = consulta.docs[0].data().playList
            const newPlayList = {
                name : name,
                descri : descri,
                songs : [],
                id : oldPlayList.length +1
            }
            oldPlayList.push(newPlayList)
            const datos = {
                id : user.id,
                name : user.name,
                playList : oldPlayList,
                songs : user.songs
            }

            db.firestore.collection("Usuarios").doc(id)
            .update(datos)
            .then(res => {
                window.location.reload()
            })

        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos",
                text : "Recuerda llenar todos los campos"
            })
        }
    }

    return (
        <div className="d-flex justify-content-center" >
            <div className="bg-dark p-3 rounded shadow w-50 p-5" >
                <h6 className="text-white" > Create playlist </h6>
                <form onSubmit={subirPlaylist} >
                    <input onChange={onChange} placeholder="Name" type="text" name="name" className="form-control " />
                    <input onChange={onChange} placeholder="Description" type="text" name="descri" className="form-control my-2" />
                    <button type="submit" className="btn btn-outline-light w-100 " > Add PlayList </button>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user : state.user
 })
   
   
 const mapDispatchToProps = dispatch => ({
 })
   

 export default connect(mapStateToProps, mapDispatchToProps)(AddPlayList)