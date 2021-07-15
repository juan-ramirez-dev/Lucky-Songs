import React from 'react'
import { useSelector } from 'react-redux';

const Audio = () => {

    let cancion = useSelector(store => store.playSong)

    return (
        <audio autoPlay controls className="w-100" src={cancion} type="audio/mpeg" >
        
        </audio>
    );
}
 
export default Audio;