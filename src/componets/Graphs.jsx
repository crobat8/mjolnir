import React from "react";

import Graph from "./Graph";


const Graphs = () =>{

    return(
        <div className="graphView">
            <h1>Graphs page:</h1>
            <Graph event ="Disc" important="FullDistance"/>
            <Graph event ="Glide" important="FullDistance"/>
            <Graph event ="Rotational" important="FullDistance"/>
            <Graph event ="Hammer" important="FourDistance"/>
        </div>
    );
}

export default Graphs;