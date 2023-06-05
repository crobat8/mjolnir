import React,{ useState,useContext, useEffect } from "react";
import {  db  } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



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

        let gatheredInfoOne   = [];
        let gatheredInfoTwo   = [];
        let gatheredInfoThree = [];
        let gatheredDates = [];
        for(var i = 0;i<workouts.length;i++){
            gatheredInfoOne[i] = workouts[i].data[props.throwOne];
            gatheredInfoTwo[i] = workouts[i].data[props.throwTwo];
            gatheredInfoThree[i] = workouts[i].data[props.throwThree];
            gatheredDates[i] = workouts[i].data.day;
        }
        
        const data = {
            labels: gatheredDates,
            datasets: [{
                    label: props.throwOne,
                    data: gatheredInfoOne,
                    backgroundColor: 'aqua',
                    borderColor: 'black',
                    pointBorder: 'green',
                },{
                    label: props.throwTwo,
                    data: gatheredInfoTwo,
                    backgroundColor: 'red',
                    borderColor: 'black',
                    pointBorder: 'green',
                },{
                    label: props.throwThree,
                    data: gatheredInfoThree,
                    backgroundColor: 'yellow',
                    borderColor: 'black',
                    pointBorder: 'green',
                }
            ]
        }
        
        const options ={
            responsive: true,
            plugins:{
                legend:true
            },
            /*scales:{
                y:{
                    min: parseInt(props.domainMin) ,
                    max: parseInt(props.domainMax),
                }
            }*/
        }

        return(
            <div>
               <h2>
                    {props.event}:
                </h2>
                <Line 
                    data={data}
                    options={options}
                ></Line> 
            </div>
            
            
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
            
            <Display workouts/>
        </div>
    );
}

export default Graph;