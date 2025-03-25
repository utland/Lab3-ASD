import IGraph from "../interfaces/graph.i";
import IRib from "../interfaces/rib.i";
import IVertex from "../interfaces/vertex.i";
import MatrixAdjacency from "./matrix.js";
import Vertex from "./vertex.js";

interface ICoordinates {
    x: number,
    y: number
}

const getRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
}

class Graph implements IGraph {
    matrix: MatrixAdjacency;
    arr: IVertex[];
    canvas: HTMLCanvasElement;
    isDir: boolean;

    constructor(matrix: MatrixAdjacency, canvas: HTMLCanvasElement, isDir?: boolean) {
        this.matrix = matrix;
        this.canvas = canvas;
        this.arr = this.createGraph();
        this.isDir = isDir ?? false;
    }

    private createGraph(): IVertex[] {
        const arr: IVertex[] = [];
        for (let i = 0; i < this.matrix.size; i++) {
            const {x, y} = this.generateCoordinates(i + 1);
            const vertex: IVertex = new Vertex(x, y);
            arr.push(vertex);
        }

        for (let i = 0; i < this.matrix.size; i++) {
            const vertex: IVertex = arr[i];
            const ribs: IRib[] = this.getRibs(i, arr);
            vertex.addRib(...ribs);   
        }
        
        return arr;
    }

    private generateCoordinates = (order: number): ICoordinates => {
        const { width, height} = this.canvas;
        const size = this.matrix.size;
        const radius = width / 2 - width * 0.1;

        if (order === size) return {x: 250, y: 250}
        const angle = (order / (size - 1)) * 2 * Math.PI; 
        const x = width / 2 + radius * Math.cos(angle);
        const y = height / 2 + radius * Math.sin(angle);

        return {x, y};
  }

    private getRibs = (row: number, arr: IVertex[]): IRib[] => {
        const ribs: IRib[] = [];
        for (let j = 0; j <= this.matrix.size; j++) {
            if (this.matrix.matrix[row][j]) {
                const {x, y, id} = arr[j];
                ribs.push({x, y, id});
            }
        }

        return ribs;
    }


    public drawGraph = (): void | null => {
        const ctx = this.canvas.getContext("2d");
        if (!ctx) return ctx;
        
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        //Малуємо вершини
        for (const vertex of this.arr) {
            const {x, y, id} = vertex;
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = "white";
            ctx.font = "15px Verdana";
            const textWidth = ctx.measureText(`${id}`).width;
            const textHeight = 15; 
            ctx.fillText(`${id}`, x - textWidth / 2, y + textHeight / 3);
        }
        
        //Малуємо ребра 
        ctx.strokeStyle = "black";
        for (const vertex of this.arr) {
            for (const neighbor of vertex.ribs) {
                if (vertex.id === neighbor.id) {
                    this.drawCircle(ctx, vertex.x, vertex.y);
                } else {
                    this.drawLine(ctx, vertex.x, vertex.y, neighbor.x, neighbor.y);
                }
            }
        }
    };

    private drawLine = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number): void => {
        ctx.strokeStyle = "black";

        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        const offset = 20;
        const startX = fromX + Math.cos(angle) * offset;
        const startY = fromY + Math.sin(angle) * offset;
        const endX = toX - Math.cos(angle) * offset;
        const endY = toY - Math.sin(angle) * offset;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        if (this.isDir) this.drawArrow(ctx, endX, endY, angle)
        
    }
    
    private drawArrow = (ctx: CanvasRenderingContext2D, x: number, y: number, angle: number): void => {
        const arrowSize = 10; 

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
            x - arrowSize * Math.cos(angle - Math.PI / 6),
            y - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            x - arrowSize * Math.cos(angle + Math.PI / 6),
            y - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.lineTo(x, y);
        ctx.fillStyle = "black";
        ctx.fill(); 
    }

    private drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
        let angle;
    
        if (x === 250 && y === 250) {
            angle = -Math.PI / 2; 
        } else {
            angle = Math.atan2(y - 250, x - 250); 
        }
    
        const radius = 25;
        const offsetX = Math.cos(angle) * radius / 2;
        const offsetY = Math.sin(angle) * radius / 2;
        
        const centerX = x + offsetX;
        const centerY = y + offsetY;

        const startAngle = angle - getRadians(125);
        const endAngle = startAngle + getRadians(255);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = "blue";
        ctx.stroke();


        if (this.isDir) this.drawArrowCircle(ctx, endAngle, centerX, centerY, radius);
    }

    private drawArrowCircle = (ctx: CanvasRenderingContext2D, arrowAngle: number, centerX: number, centerY: number, radius: number): void => {
        const arrowX = centerX + radius * Math.cos(arrowAngle);
        const arrowY = centerY + radius * Math.sin(arrowAngle);
    
        const angle = arrowAngle + Math.PI / 2;
        const arrowSize = 10;
    
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(
            arrowX - arrowSize * Math.cos(angle - Math.PI / 6),
            arrowY - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            arrowX - arrowSize * Math.cos(angle + Math.PI / 6),
            arrowY - arrowSize * Math.sin(angle + Math.PI / 6)
        );       
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
    };
}

export default Graph;