import IRib from "../interfaces/rib.i";
import IVertex from "../interfaces/vertex.i";

class Vertex implements IVertex {
    private static globalId = 1;
    id: number;
    x: number;
    y: number;
    ribs: IRib[];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.ribs = [];
        
        if (Vertex.globalId > 12) Vertex.globalId = 1;
        this.id = Vertex.globalId++;
    }

    public addRib = (...ribs: IRib[]) => {
        this.ribs.push(...ribs);
    }
}

export default Vertex;