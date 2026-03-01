export { };

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
    export const MeshLineGeometry: any;
    export const MeshLineMaterial: any;
}

import { Object3DNode, MaterialNode } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
        meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
}
