import React,{useEffect, useState} from 'react'
import db from '../../../config/db.js'

const User = () => {

    const [Usuarios, setUsuarios] = useState([])

    const cargarUsuarios = async () => {
        let arregloUsuarios = []
        const consulta = await db.firestore.collection("Usuarios").get()
        consulta.docs.forEach(element => {
            arregloUsuarios.push(element.data())
        })
        setUsuarios(arregloUsuarios)
    }

    useEffect(() => {
        cargarUsuarios()
    }, [])

    return (
        <div>
            {Usuarios.map(data => 
                <div key={data.name} className="w-100 shadow p-2 m-2 row" >
                    <div className="col-md-4" >
                        <div className=" my-2" >
                            <h6> <strong> Name </strong> </h6>
                            <h6> {data.name} </h6>
                        </div>
                    </div>

                    <div className="col-md-2" >
                        <div className="my-2" >
                            <h6> <strong> PlayList </strong> </h6>
                            <p > {data.playList.length} </p>
                        </div>
                    </div>

                    <div className="col-md-2" >
                        <div className="my-2" >
                            <h6> <strong> Songs </strong> </h6>
                            <p > {data.songs.length} </p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
 
export default User;