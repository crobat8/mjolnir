import React, { useState } from "react";
import LogDisc from "./LogDisc";
import LogGlide from "./LogGlide";
import LogRotational from "./LogRotational";
import LogHammer from "./LogHammer";


const Log = () =>{

    const [count,setCount] = useState(1);
    
    function HandleSwap(){
        
        if(count === 1){
            return <LogDisc/>;
        }else if(count === 2){
            return <LogGlide/>
        }else if(count === 3){
            return <LogRotational/>
        }else if(count === 4){
            return <LogHammer/>
        }else {
            return null;
        }

    }
    
    return (
        
            <div className="RightSide" >
                <div className="eventselect">
                    <button onClick={()=>setCount(1)}>
                        Disc
                    </button>
                    <button onClick={()=>setCount(2)}>
                        Glide
                    </button>
                    <button onClick={()=>setCount(3)}>
                        Rotational
                    </button>
                    <button onClick={()=>setCount(4)}>
                        Hammer
                    </button>
                </div>
                

                    <HandleSwap/>

                

            </div>
        
    )
}

export default Log;