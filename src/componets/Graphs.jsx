import React from "react";

import Graph from "./Graph";


const Graphs = () =>{

    return(
        <div className="graphView">
            <h1>Graphs page:</h1>
            <Graph event ="Disc"/>
            <Graph event ="Glide"/>
            <Graph event ="Rotational"/>
            <Graph event ="Hammer"/>
        </div>
    );
}

export default Graphs;