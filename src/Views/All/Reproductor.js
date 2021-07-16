import React from 'react'
import { useSelector , useDispatch } from 'react-redux';
import Audio from './Audio';

const Reproductor = () => {

    const song = useSelector(state => state.song)
    const dispatch = useDispatch()

    return (
        <div>
            { song.name ? 
                <div className="d-flex justify-content-end" >
                    <div className="reproductor shadow p-2 rounded" >
                        <div className="d-flex justify-content-start" >
                            <div className="p-1" >
                                <h6 className="pointer" onClick={() => dispatch({type : "@quitarCancion"})} > <strong> X </strong> </h6>
                            </div>
                        </div>
                        <div>
                            <img className="img-reproductor" src={song.imagen} alt={song.name} />
                        </div>
                        <div className="mt-2" >
                            <Audio />
                        </div>
                    </div>
                </div>
            : null}
        </div>


    );
}
 
export default Reproductor;