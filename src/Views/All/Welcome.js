import React,{useState} from 'react'
import { connect } from "react-redux";
import PlayMusic from './PlayMusic';
import { subirVistas } from '../../config/SubirVistas';

const Welcome = ({music, agregarSong}) => {

    const [Validacion, setValidacion] = useState(true)

    const cambiarInterfaz = (data, estado) => {
        if(data === 0){
            setValidacion(estado)
        }else{
            agregarSong(data , music)
            subirVistas(data)
            setValidacion(estado)
        }
    }

    return (
        <div className="mx-5" >
            <div>
                {Validacion ? 
                    <div className="row" >
                        {music.map(data => 
                            <div className="col-lg-3 col-md-6 col-sm-6" key={data.name} onClick={()=> cambiarInterfaz(data , false) } >
                                <div className="p-1 m-2  pointer hover" >
                                    <div>
                                        <img className="img-card-welcome shadow" src={data.imagen} alt={data.imagenNombre} />
                                    </div>
                                    <div className="mt-3" >
                                        <div>
                                            <h6> <strong> {data.author} - {data.name} </strong></h6>
                                            <h6> {data.gender} </h6>
                                            <p> {data.views} visualizaciones </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                :
                    <div>
                        <div className="d-flex justify-content-start" >
                            <div className="shadow p-3 m-2 rounded-circle pointer" onClick={()=> cambiarInterfaz(0 , true) } >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </div>
                        </div>
                        <PlayMusic/>
                    </div>
                }
            </div>
        </div>
    );
}

//Recuperando el state del store
const mapStateToProps = state => ({
    music : state.music
})
  
  
  //Creando un nuevo state con los datos del usuario
  const mapDispatchToProps = dispatch => ({
    agregarSong(song, music) {
        dispatch({
          type: "@reproducirMusic",
          song : song,
          music : music
        })
    }
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Welcome)