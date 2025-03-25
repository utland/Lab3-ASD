import IMatrix from "../interfaces/matrix.i";

type typeFunction = (value: number) => number;

const getRandomFloat = () => {
    return Math.random() * 2.0;
}

const multiply = (value: number): number => {
    const k = 1.0 - 2 * 0.02 -7 * 0.005 - 0.25;
    return k * value;
}

const round = (value: number): number => {
    return value < 1 ? 0 : 1;
}

class MatrixAdjacency implements IMatrix {
    matrix: number[][];
    size: number;

    constructor(size: number, matrix?: number[][]) {
        this.size = size;
        this.matrix = matrix ?? this.createMatrix();
    }
 
    public printMatrix = () => {
        let line: string = "";
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                line += `${this.matrix[i][j]} `;
            }
            console.log(line);
            line = "";
        }
    }

    public createUndirMatrix = (): IMatrix => {
        const undirMatrix: number[][] = [...this.matrix];

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.matrix[i][j] === 1) {
                    undirMatrix[i][j] = 1;
                    undirMatrix[j][i] = 1;
                } else {
                    undirMatrix[i][j] = 0;
                }
            }
        }

        return new MatrixAdjacency(this.size, undirMatrix);
    }

    private createMatrix = (): number[][] => {
        const matrix: number[][] = [];
        this.iterateMatrix(matrix, multiply, round);
        
        return matrix;
    }
    
    private iterateMatrix = (matrix: number[][], ...rest: typeFunction[]): number[][] => {
        for (let i = 0; i < this.size; i++) {
            matrix.push([]);
            for (let j = 0; j < this.size; j++) {
                matrix[i][j] = getRandomFloat();
                rest.forEach(fn => matrix[i][j] = fn(matrix[i][j]));
            }
            console.log("\n");
        }
        return matrix;
    }    
}

export default MatrixAdjacency;



