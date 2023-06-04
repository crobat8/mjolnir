import React,{ useState,useContext, useEffect } from "react";
import {  db  } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, //x-axis
    LinearScale, //y-axis
    PointElement
} from "chart.js"

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)



const Graph = (props) =>{


    
    const{currentUser} = useContext(AuthContext);

    const[loading,setLoading] = useState(true);



    const[workouts,setWorkouts] = useState([]);
    
    function getWorkouts(){
        const workoutCollenctionRef =collection(db,"workouts")
        const sifted = query(workoutCollenctionRef
            ,where("uid","==",currentUser.uid)
            ,where("event" ,"==",props.event));
        getDocs(sifted)
        .then(response =>{
            
            const work =  response.docs.map(doc =>({
                data: doc.data(),
                id: doc.id,
            }))
            setWorkouts(work)
            setLoading(false);
        })
        .catch(error => console.error(error.message))
    }

    function Display(){
        //console.log(workouts[0].data[props.important])

        let gatheredInfo = [];
        let gatheredDates = [];
        for(var i = 0;i<workouts.length;i++){
            gatheredInfo[i] = workouts[i].data[props.important];
            gatheredDates[i] = workouts[i].data.day;
        }
        
        const data = {
            labels: gatheredDates,
            datasets: [{
                labels: 'Sales of the Week',
                data: gatheredInfo,
                backgroundColor: 'aqua',
                borderColor: 'black',
                pointBorder: 'green',
                

            }]
        }
        
        const options ={
            plugins:{
                legend:true
            },
            scales:{
                y:{
                    min: 0,
                    max: 100,
                }
            }
        }

        return(
            <Line 
                data={data}
                options={options}
            ></Line>
            
        )

    }

    useEffect(() => {
        getWorkouts()
    },[])

    if(loading){
        return <h1>loading data</h1>;
    }

    return(
        <div>
            <h1>{props.event}</h1>
            <ul>
                {workouts.map(workout =><li key={workout.id}>{workout.data[props.important]}</li>)}
            </ul>
            <Display workouts/>
        </div>
    );
}

export default Graph;