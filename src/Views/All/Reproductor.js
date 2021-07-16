import React from 'react'
import { useSelector } from 'react-redux';
import Audio from './Audio';

const Reproductor = () => {

    const song = useSelector(state => state.song)

    return (
        <div className="d-flex justify-content-end" >
            <div className="reproductor shadow p-2 rounded" >
                <div>
                    <img className="img-reproductor" src={song.imagen} alt={song.name} />
                </div>
                <div className="mt-2" >
                    <Audio />
                </div>
            </div>
        </div>
    );
}
 
export default Reproductor;