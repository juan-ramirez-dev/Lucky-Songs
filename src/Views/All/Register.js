import React,{useState} from 'react'
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import Swal from 'sweetalert2';
import db from '../../config/db.js';

const Register = () => {

    const fb = useFirebaseApp();

    const [Campos, setCampos] = useState({
        email : "",
        pass : "",
        name : ""
    })

    const onChange = (e) => {
        setCampos({
            ...Campos ,
            [e.target.name] : e.target.value
        })
    }


    const enviarUsuario = (e) => {
        e.preventDefault()
        const {name,pass, email} = Campos
        if(name !== "" && pass !== "" && email !== ""){
            if(pass.length > 6){
                fb.auth().createUserWithEmailAndPassword(email, pass).then((res)  => {
                    const Datos = {
                        id : res.user.uid,
                        name : name,
                        songs : [],
                        playList : []
                    }
                    db.firestore.collection("Usuarios").doc().set(Datos)
                    window.location.replace("/Lucky/#/Dashboard")
                })   
            }else{
                Swal.fire({
                    icon : "warning",
                    title : "Campos invalidos",
                    text : "Tu contraseña es demasiado corta"
                })
            }
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos",
                text : "Recuerda llenar correctamente todos los campos"
            })
        }
    }

    return (
        <div className="container mt-5" >
            <div className="row rounded shadow" >
                <div className="col-md-6 rounded bg-img-login ">

                    <div className="p-4 m-2" >    
                        <div className="bg-blur p-4" >
                            <div className="w-75" >
                                <h4 className="text-monospace text-white" > Lucky Song's </h4>
                            </div>
                            <hr  className="line w-25 bg-aguamarine" />
                            <div className="mt-5" >
                                <h3 className="text-white" > The best music in your browser </h3>
                                <p className="text-white" > Add music to your playlists without ads  </p>
                                <p className="text-white"> Lorem ipsum dolor sit. </p>
                            </div>

                            <div className="bottom-login" >
                                <h6 className="text-white" > Do you already have an account? </h6>
                                <p className="pointer text-white" > <strong onClick={()=> window.location.replace("/Lucky/#/Login") } > Sign In </strong> </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="p-5 mt-5" >
                        <h2 className="pl-3"> <strong> Sign Up </strong> </h2>
                        <hr className="line w-75 bg-aguamarine ml-3" />
                        <form onSubmit={enviarUsuario} >
                            <div className="p-2 m-2" >
                                <h6> Set Name </h6>
                                <input name="name" onChange={onChange} type="text" className="form-control" placeholder="Enter your name"  />
                            </div>
                            <div className="p-2 m-2" >
                                <h6> Email address </h6>
                                <input name="email"  onChange={onChange} type="email" placeholder="Enter your email"  className="form-control" />
                            </div>
                            <div className="p-2 m-2" >
                                <h6> Set Password </h6>
                                <input name="pass" onChange={onChange} type="password" className="form-control" placeholder="Enter your password"  />
                            </div>
                            <div className="m-2 p-2" >
                                <button type="submit" className="w-100 btn btn-outline-dark " > Sign Up </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Register;