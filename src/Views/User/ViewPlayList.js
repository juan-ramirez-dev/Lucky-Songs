import React from 'react'
import Swal from 'sweetalert2'

const ViewPlayList = ({data}) => {


    const eliminarCancionPlayList = (song) => {
        Swal.fire({
            title: '¿Estas seguro que quieres eliminar esta canción de tu playlist?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          }).then( async (result) => {
            if (result.isConfirmed) {
                console.log(song);
            }
          })
    }

    return (
        <div>
            {data.songs.length >0 ? 
                <div className="container" >
                    {data.songs.map(data =>
                    <div key={data.name} className="w-100 shadow p-2 m-2 row" >
                        <div className="col-md-2" >
                            <div className="d-flex justify-content-center my-2" >
                                <img src={data.imagen} className="w-50" alt={data.imagenNombre} />
                            </div>
                        </div>
                        <div className="col-md-2" >
                            <div className="my-2" >
                                <h6> <strong> {data.name} </strong> </h6>
                                <p > {data.description} </p>
                            </div>
                        </div>
                        <div className="col-md-2" >
                            <div className="my-2" >
                                <h6> <strong> {data.author} </strong> </h6>
                                <p > {data.gender} </p>
                            </div>
                        </div>

                        <div className="col-md-2" >
                            <div className="my-2" >
                                <audio controls>
                                    <source src={data.music} type="audio/mpeg" /> 
                                </audio>
                            </div>
                        </div>

                        <div className="col-md-4" >
                            <div className="d-flex justify-content-center my-2" >
                                <div className="shadow pointer rounded-circle bg-danger p-3 m-2" onClick={()=> eliminarCancionPlayList(data) } >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>
                    )}
                </div>
            :
                <div className="alert alert-warning m-5" >
                    <p className="mt-2" > No tienes canciones en esta playList, dirigete a <strong className="pointer" onClick={()=> window.location.replace("/Lucky/#/") } > Home </strong> para agregar tus canciones favoritas. </p>
                </div>
            }
        </div>
    );
}
 
export default ViewPlayList;