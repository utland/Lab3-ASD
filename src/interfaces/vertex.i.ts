import IRib from "./rib.i";

interface IVertex {
    id: number,
    x: number,
    y: number,
    ribs: IRib[],
    addRib: (...ribs: IRib[]) => void;
}

export default IVertex