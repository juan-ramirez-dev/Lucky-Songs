import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';
import { useFirebaseApp} from 'reactfire';
import 'firebase/auth';

const Login = () => {

    const [Campos, setCampos] = useState({
        email : "",
        pass : ""
    })
    const firebase = useFirebaseApp();

    const onChange= (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    const validarUsuario =  (e) => {
        e.preventDefault()
        const {email, pass} = Campos
        if(email !== "" && pass !=="" && pass.length >= 6 ){
            firebase.auth().signInWithEmailAndPassword(email , pass)
            .then(res => {
                window.location.replace("/Lucky-Songs/#/Dashboard")
            }).catch(error => {
                Swal.fire({
                    icon : 'error',
                    title : "Ocurrió un error",
                    text : "Tus credenciales son incorrectas o no estas registrado."
                })
            })
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos",
                text : "Recuerda llenar todos los campos y colocar una contraseña de mas de 6 caracteres"
            })
        }
    }


    return (
        <div className="mt-5 container" >
            <div className="row shadow rounded" >
                <div className="col-md-6">
                    <div className="p-5" >
                        <h2> <strong> Welcome to Lucky Song's </strong> </h2>
                        <hr  className="bg-aguamarine line w-75" /> 
                        <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt tempore voluptatibus, tempora facere non perspiciatis. </p>
                        <div>
                            <form onSubmit={validarUsuario} >
                                <TextField name="email" type="email" onChange={onChange} className="w-100 mt-4" label="E-mail" variant="outlined"  />
                                <TextField name="pass" type="password" onChange={onChange} className="w-100 my-3" label="Password" variant="outlined"  />

                                <button className="btn btn-outline-dark w-100" type="submit" > Sign In </button>
                            </form>
                        </div>
                        <p className="text-center pointer mt-4" > You do not have an account? <span className="text-purple" onClick={()=> window.location.replace("/Lucky-Songs/#/Register") } > Sign Up </span>  </p>
                    </div>
                </div>
                <div className="col-md-6 bg-purple d-flex align-items-center">
                    <div className="p-5" >
                        <div className="d-flex justify-content-start" >
                            <div className="shadow p-3 rounded-circle bg-aguamarine" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-purple bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-white mt-4" > <strong> Make a Dream. </strong>  </h1>
                        <div className="d-flex justify-content-end" >
                            <p className="text-white text-end" > Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, quasi sequi eligendi aperiam iure repellendus quis dolore maiores eos mollitia. </p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
}
 
export default Login;