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

    const[loading1,setLoading1] = useState(true);

    const[loading2,setLoading2] = useState(true);

    const[workouts,setWorkouts] = useState([]);

    const[lifts,setLifts]=useState([]);
    
    function getWorkouts(){
        const workoutCollenctionRef =collection(db,"workouts")
        const siftedW = query(workoutCollenctionRef
            ,where("uid","==",currentUser.uid)
            ,where("event" ,"==",props.event));
        getDocs(siftedW)
        .then(response =>{
            
            const work =  response.docs.map(doc =>({
                data: doc.data(),
                id: doc.id,
            }))
            setWorkouts(work)
            setLoading1(false);
        }
        )
        .catch(error => console.error(error.message))


        const siftedL = query(workoutCollenctionRef
            ,where("uid","==",currentUser.uid)
            ,where("event" ,"==","Lift"));
        getDocs(siftedL).then(response =>{
            
            const Lift =  response.docs.map(doc =>({
                data: doc.data(),
                id: doc.id,
            }))
            setLifts(Lift)
            setLoading2(false);
        }
        
        )
        .catch(error => console.error(error.message))
    }
    

    function Display(){
        //console.log(workouts[0].data[props.important])

        let gatheredInfoOne   = [];
        let gatheredInfoTwo   = [];
        let gatheredInfoThree = [];
        let gatheredDates = [];
        let gatheredLiftsOne = [];
        let gatheredLiftsTwo = [];
        var combinedDay = 0;

        
        for(var i = 0;i<workouts.length;i++){
            gatheredInfoOne[workouts.length-1-i] = workouts[i].data[props.throwOne];
            gatheredInfoTwo[workouts.length-1-i] = workouts[i].data[props.throwTwo];
            gatheredInfoThree[workouts.length-1-i] = workouts[i].data[props.throwThree];
            gatheredDates[workouts.length-1-i] = workouts[i].data.day;
        }

        for(var x = 0;x<lifts.length;x++){
            gatheredLiftsOne[x] = lifts[x].data.WeightOne;
            gatheredLiftsTwo[x] = lifts[x].data.WeightTwo;
        }

        const data = {
            labels: gatheredDates,
            datasets: [{
                    label: props.throwOne,
                    data: gatheredInfoOne,
                    backgroundColor: 'aqua',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Distance',
                },{
                    label: props.throwTwo,
                    data: gatheredInfoTwo,
                    backgroundColor: 'red',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Distance',
                },{
                    label: props.throwThree,
                    data: gatheredInfoThree,
                    backgroundColor: 'yellow',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Distance',
                },{
                    label: "primary Lift",
                    data: gatheredLiftsOne,
                    backgroundColor: 'green',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Weight',
                    showLine: false
                },{
                    label: "Secondary Lift",
                    data: gatheredLiftsTwo,
                    backgroundColor: 'brown ',
                    borderColor: 'black',
                    pointBorder: 'green',
                    yAxisID : 'Weight',
                    showLine: false
                }
            ]
        }

        
        const options ={
            responsive: true,
            

            scales:{
                Distance:{
                    
                    position: 'left',
                },
                Weight:{
                    
                    position: 'right',
                }
            }
        }
        console.log("test4");
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
        getWorkouts();
    },[])

    if(loading1 || loading2){
        return <h1>loading data</h1>;
    }

    return(
        <div>
            
            <Display workouts/>
        </div>
    );
}

export default Graph;