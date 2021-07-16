import React from 'react'

const Audio = ({song}) => {
    return (
        <audio autoPlay controls className="w-100" src={song.music} type="audio/mpeg" >
        
        </audio>
    );
}
 
export default Audio;