import React from 'react'
import Menu from './Menu';
import { connect } from "react-redux";
import Welcome from './Dashboard-views/Welcome';
import AddMusic from './Dashboard-views/AddMusic';
import Chart from './Dashboard-views/Chart';
import User from './Dashboard-views/User';

const Dashboard = ({number , user}) => {
    return (
        <div className="mx-4" >
            <div className="row" >
                <div className="col-md-2" >
                    <div className="mt-5" >
                        <Menu />
                    </div>
                </div>
                <div  className="col-md-10" >
                    <div className="p-4" >
                        {number === 1 ? <Welcome user={user} /> : null}
                        {number === 2 ? <AddMusic user={user} /> : null}
                        {number === 4 ? <Chart user={user} />: null}
                        {number === 5 ? <User user={user} />: null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
const mapStateToProps = state => ({
    number : state.number,
    user : state.user
})
  
export default connect(mapStateToProps, {})(Dashboard)