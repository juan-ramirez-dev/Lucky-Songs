import React,{useState} from 'react'
import { connect } from 'react-redux';
import AddPlayList from './AddPlayList';
import ViewPlayList from './ViewPlayList';

const Playlist = ({playList}) => {

    const [Validacion, setValidacion] = useState(true)
    const [numeroInterfaz, setnumeroInterfaz] = useState(0)
    const [datosPlayList, setdatosPlayList] = useState({})

    const cambiarInterfaz = (estado, numero ,data) => {
        setValidacion(estado)
        setnumeroInterfaz(numero)
        setdatosPlayList(data)
    }


    return (
        <div>
            {Validacion ?
                <div className="my-5 container" >
                    {playList.length  === 0 ?
                        <div className="row" >
                            <div className="col-lg-3 col-md-6 col-sm-6" >
                                <div className="pointer hover shadow m-2" onClick={()=> cambiarInterfaz(false, 1 , {}) }  >
                                    <div className="p-5 bg-light">
                                        <h1 className="text-center display-3" > + </h1>
                                    </div>
                                    <div className="mt-3" >
                                        <div className="p-4" >
                                            <h6> <strong> Add Playlist </strong></h6>
                                            <h6> Different Gender </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="row" >
                            <div className="col-lg-3 col-md-6 col-sm-6" >
                                <div className="pointer hover shadow m-2" onClick={()=> cambiarInterfaz(false, 1 , {}) } >
                                    <div className="p-5 bg-light">
                                        <h1 className="text-center display-3" > + </h1>
                                    </div>
                                    <div className="mt-3" >
                                        <div className="p-4" >
                                            <h6> <strong> Add Playlist </strong></h6>
                                            <h6> Different Gender </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {playList.map(data => 
                                <div className="col-lg-3 col-md-6 col-sm-6" key={data.id} >
                                    <div className="pointer hover shadow m-2" onClick={()=> cambiarInterfaz(false, 2 , data) } >
                                        <div className="p-5 bg-aguamarine">
                                            <h1 className="text-center  Fuggles display-3"> {data.name.substr(0,1)} </h1>
                                        </div>
                                        <div className="mt-3" >
                                            <div className="p-4" >
                                                <h6> <strong> {data.name} </strong></h6>
                                                <h6> {data.descri} </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                </div>
            :
                <div className="m-5" >
                    <div className="d-flex justify-content-start" >
                        <div className="shadow p-3 m-2 rounded-circle pointer" onClick={()=> cambiarInterfaz(true, 0 , {}) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    {numeroInterfaz === 1 ? <AddPlayList /> :null}
                    {numeroInterfaz === 2 ? <ViewPlayList data={datosPlayList} />  :null}
                </div>
            }
        </div>
    );
}
 
const mapStateToProps = state => ({
   playList : state.user.playList
})
  
  
const mapDispatchToProps = dispatch => ({
})
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Playlist)