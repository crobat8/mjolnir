import React,{ useState,useContext, useEffect } from "react";
import {  app,db  } from "../firebase";

import { doc,collection, query, where, getDocs,getDoc } from "firebase/firestore";

import { AuthContext } from "../context/AuthContext";


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

    useEffect(() => {
        getWorkouts()
    },[])

    useEffect(() => {
        
    },[workouts])

    /*useEffect( ()=>{
        const workoutsRef =  collection(db, "workouts");

        const q = query(workoutsRef, where("uid", "==", currentUser.uid));

        console.log(q);
        const querySnapshot =  getDocs(q);

        setLoading(false);
    },[]);*/

    if(loading){
        return <h1>loading data</h1>;
    }

    return(
        <div>
            <h1>{props.event}</h1>
            <ul>
                {workouts.map(workout =><li key={workout.id}>{workout.data.event}</li>)}
            </ul>
        </div>
    );
}

export default Graph;