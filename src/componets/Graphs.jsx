import React from "react";

import Graph from "./Graph";


const Graphs = () =>{

    return(
        <div className="graphView">
            <h1>Graphs page:</h1>
            <Graph event ="Disc" important="fullDistance"/>
            <Graph event ="Glide" important="fullDistance"/>
            <Graph event ="Rotational" important="fullDistance"/>
            <Graph event ="Hammer" important="FourDistance"/>
        </div>
    );
}

export default Graphs;