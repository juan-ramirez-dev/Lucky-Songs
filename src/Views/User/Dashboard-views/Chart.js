import React, {useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
import db from '../../../config/db';


const Chart = ({user}) => {

    const [Canciones, setCanciones] = useState([])
    const [Vistas, setVistas] = useState([])

    const cargardatos = async() => {
        let vistasArreglo = []
        let cancionesArreglo = []
        const consulta = await db.firestore.collection("Usuarios").where("id", "==" , user.id).get()
        consulta.docs.forEach(element => {
            element.data().songs.forEach(songs => {
                vistasArreglo.push(songs.views)
                cancionesArreglo.push(songs.name)
            })
        })
        setCanciones(cancionesArreglo)
        setVistas(vistasArreglo)
    }

    useEffect(() => {
        cargardatos()
        // eslint-disable-next-line  
    }, [])



    const datos = {
    labels: Canciones,
    datasets: [
        {
        label: 'Vistas',
        data: Vistas,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        },
    ],
    };

    const options = {
    scales: {
        yAxes: [
        {
            ticks: {
            beginAtZero: true,
            },
        },
        ],
    },
    };
    return (
        <div>
            {Canciones.length >0 ?
                <div  className="p-5" >
                    <Bar data={datos} options={options} />
                </div>
            :
                <div className="alert alert-warning" >
                    No tienes canciones.
                </div>
            }
        </div>
    );
}
 
export default Chart;