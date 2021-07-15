import React from 'react'
import RelatedMusic from './RelatedMusic'
import { connect } from "react-redux";
import Audio from './Audio'
import OptionsMusic from '../User/OptionsMusic';

const PlayMusic = ({data}) => {
    
    return (
        <div className="container" >
            <div className="row p-3 bg-light rounded shadow" >
                <div className="col-md-6" >
                    <div>
                        <div className="d-flex justify-content-center" >
                            <img className="w-100" src={data.imagen} alt={data.imagenNombre} />
                        </div>
                        <div className="mt-2 d-flex justify-content-center" >
                            <Audio />
                        </div>
                        <div className="mt-2 w-100" >
                            <OptionsMusic data={data} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6" >
                    <div>
                        <RelatedMusic />
                    </div>
                </div>
            </div>
        </div>
    );
}



const mapStateToProps = state => ({
    data: state.song
})
  
const mapDispatchToProps = dispatch => ({
})
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(PlayMusic)