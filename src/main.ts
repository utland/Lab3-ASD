import Graph from "./models/graph.js";
import MatrixAdjacency from "./models/matrix.js";

const appInit = () => {
    const canvas1 = document.getElementById("graphCanvas1") as HTMLCanvasElement;
    const canvas2 = document.getElementById("graphCanvas2") as HTMLCanvasElement;

    const dirMatrix = new MatrixAdjacency(12);
    console.log("Dir Matrix:")
    dirMatrix.printMatrix();
    const graphOfDir = new Graph(dirMatrix, canvas1, true);
    graphOfDir.drawGraph();
    
    const undirMatrix = dirMatrix.createUndirMatrix();
    console.log("Undir Matrix:")
    undirMatrix.printMatrix();
    const graphOfUndir = new Graph(dirMatrix, canvas2);
    graphOfUndir.drawGraph();
}

appInit();