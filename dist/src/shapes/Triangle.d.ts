import { FabricObject } from './Object/FabricObject';
export declare const triangleDefaultValues: {
    width: number;
    height: number;
};
export declare class Triangle extends FabricObject {
    static ownDefaults: Record<string, any>;
    static getDefaults(): {
        [x: string]: any;
    };
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render(ctx: CanvasRenderingContext2D): void;
    /**
     * Returns svg representation of an instance
     * @return {Array} an array of strings with the specific svg representation
     * of the instance
     */
    _toSVG(): string[];
}
//# sourceMappingURL=Triangle.d.ts.map