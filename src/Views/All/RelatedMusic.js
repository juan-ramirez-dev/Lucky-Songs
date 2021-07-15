import React from 'react'
import { connect } from "react-redux";
import { subirVistas } from '../../config/SubirVistas';


const RelatedMusic = ({agregarSong, Relacionados , music}) => {

    const agregarSongFirebase = (data, music) => {
        agregarSong(data, music)
        subirVistas(data)
    }

    return (
        <div>
            {Relacionados.map(data => 
                <div className="w-100 p-3 m-2 pointer bg-white row hover" onClick={()=> agregarSongFirebase(data , music) }  key={data.name} >
                    <div className="col-md-3" >
                        <img className="w-100" src={data.imagen} alt={data.name} />
                    </div>
                    <div className="col-md-4" >
                        <h5> <strong>  {data.name} </strong></h5>
                        <p> {data.author} </p>
                        <p> {data.gender} </p>
                    </div>
                </div>    
            )}
        </div>
    );
}

//Recuperando el state del store
const mapStateToProps = state => ({
    music : state.music,
    data :state.song,
    Relacionados : state.relacionados
})
  
  
const mapDispatchToProps = dispatch => ({
  agregarSong(song, music) {
      dispatch({
        type: "@reproducirMusic",
        song : song,
        music : music
      })
  }
})
  

export default connect(mapStateToProps, mapDispatchToProps)(RelatedMusic)