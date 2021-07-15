import React from 'react'
import hello from '../../../img/welcome.svg'

const Welcome = ({user}) => {
    return (
        <div>
            <h4> Welcome {user.name} </h4>
            <div className="d-flex justify-content-center" >
                <img src={hello} className="w-50" alt="" />
            </div>
        </div>
    );
}
 
export default Welcome;