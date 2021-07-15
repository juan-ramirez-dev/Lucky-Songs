import React,{useState} from 'react'
import {useFirebaseApp } from 'reactfire';

const Navbar = ({User}) => {

    const [ValidacionResponsive, setValidacionResponsive] = useState(false)

    const firebase = useFirebaseApp();
    const Exit  = async () => {
        await firebase.auth().signOut()
        window.location.replace("/Lucky-Songs/#/")
    }


    return (
        <div className="px-3" >
            {ValidacionResponsive ? 
                <div className="menu-float-responsive bg-aguamarine p-4" >
                    <div className="d-flex justify-content-between" >
                        <div>
                            <h3> Lucky Song's </h3>
                        </div>
                        <div onClick={()=> setValidacionResponsive(false) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="pointer bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    {!User ? 
                        <div className="d-flex justify-content-center" >
                            <button className="btn btn-outline-dark pointer m-2" onClick={()=> window.location.replace("/Lucky-Songs/#/Login") } > Sign In </button>
                            <button className="btn btn-outline-dark pointer m-2" onClick={()=> window.location.replace("/Lucky-Songs/#/Register") } > Sign Up </button>
                        </div>
                    :
                        <div>
                            <h6 className="pointer" onClick={()=> window.location.replace("/Lucky-Songs/#/Dashboard") }  > User </h6>
                            <h6 className="pointer"  onClick={Exit} > Exit </h6>
                        </div>
                    }
                </div>
            : null}


            <div className="row p-3 bg-light" >
                <div className="col-md-3">
                    <div className="p-2 d-flex justify-content-center" >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-aguamarine bi bi-play-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                            </svg>
                        </div>
                        <div className="ml-2" >
                            <h4> Lucky Song's </h4>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="p-2 d-flex justify-content-center">
                        <h6 className="m-2 pointer link-navbar" onClick={()=> window.location.replace("/Lucky-Songs/#/") }  > Home </h6>
                        <h6 className="m-2 pointer link-navbar" onClick={()=> window.location.replace("/Lucky-Songs/#/Music") }  > Music </h6>
                        <h6 className="m-2 pointer link-navbar" onClick={()=> window.location.replace("/Lucky-Songs/#/Playlist") }  > Playlist </h6>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="menu-navbar" >
                        {!User ? 
                            <div className="d-flex justify-content-center" >
                                <button className="btn btn-outline-dark pointer p-2 m-2" onClick={()=> window.location.replace("/Lucky-Songs/#/Login") } > Sign In </button>
                                <button className="btn btn-outline-dark pointer p-2 m-2" onClick={()=> window.location.replace("/Lucky-Songs/#/Register") } > Sign Up </button>
                            </div>
                        :
                            <div>
                                <div className="p-2 d-flex justify-content-center" >
                                    <div className=" pointer rounded-circle shadow p-2 bg-aguamarine"  onClick={()=> window.location.replace("/Lucky-Songs/#/Dashboard") }     >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="menu-responsive" >
                        <div className="d-flex justify-content-center" >
                            <svg onClick={()=> setValidacionResponsive(true) } xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list pointer" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;