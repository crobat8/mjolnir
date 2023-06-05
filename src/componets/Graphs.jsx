import React from "react";

import Graph from "./Graph";


const Graphs = () =>{

    /*const DiscProps = {
        event :"Disc",
        throwOne:"StandDisatance",
        throwTwo:"WheelDistance",
        throwThree:"FullDistance",
    }*/

    return(
        <div className="graphView">
            <h1>Graphs page:</h1>
            <Graph 
            event ="Disc"
            throwOne="StandDistance"
            throwTwo="WheelDistance"
            throwThree="FullDistance"
            domainMin = "10"
            domainMax = "70"
            />
            <Graph 
                event ="Glide" 
                throwOne="StandDistance" 
                throwTwo="StepbackDistance" 
                throwThree="FullDistance"
                domainMin = "10"
                domainMax = "20"
            />
            <Graph 
                event ="Rotational"
                throwOne="StandDistance" 
                throwTwo="WheelDistance" 
                throwThree="FullDistance"
                domainMin = "10"
                domainMax = "20"
            />
            <Graph 
                event ="Hammer"
                throwOne="TwoDistance" 
                throwTwo="ThreeDistance" 
                throwThree="FourDistance"
                domainMin = "10"
                domainMax = "70"
            />
        </div>
    );
}

export default Graphs;