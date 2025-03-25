import MatrixAdjacency from "../models/matrix";
import IVertex from "./vertex.i";

interface IGraph {
    arr: IVertex[],
    matrix: MatrixAdjacency,
    drawGraph: () => void;
}

export default IGraph;