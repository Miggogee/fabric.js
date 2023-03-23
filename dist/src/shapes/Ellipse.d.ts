import { TClassProperties } from '../typedefs';
import { FabricObject } from './Object/FabricObject';
export declare const ellipseDefaultValues: Partial<TClassProperties<Ellipse>>;
export declare class Ellipse extends FabricObject {
    /**
     * Horizontal radius
     * @type Number
     * @default
     */
    rx: number;
    /**
     * Vertical radius
     * @type Number
     * @default
     */
    ry: number;
    static cacheProperties: string[];
    static ownDefaults: Record<string, any>;
    static getDefaults(): {
        [x: string]: any;
    };
    /**
     * Constructor
     * @param {Object} [options] Options object
     * @return {Ellipse} thisArg
     */
    constructor(options: Record<string, unknown>);
    /**
     * @private
     * @param {String} key
     * @param {*} value
     * @return {Ellipse} thisArg
     */
    _set(key: string, value: any): this;
    /**
     * Returns horizontal radius of an object (according to how an object is scaled)
     * @return {Number}
     */
    getRx(): number;
    /**
     * Returns Vertical radius of an object (according to how an object is scaled)
     * @return {Number}
     */
    getRy(): number;
    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject(propertiesToInclude?: string[]): { [R in "cornerStyle" | "cornerSize" | "cornerColor" | "cornerStrokeColor" | "cornerDashArray" | "transparentCorners" | "noScaleCache" | "centeredScaling" | "snapAngle" | "snapThreshold" | "centeredRotation" | "lockMovementX" | "lockMovementY" | "lockRotation" | "lockScalingX" | "lockScalingY" | "lockSkewingX" | "lockSkewingY" | "lockScalingFlip" | "touchCornerSize" | "hasControls" | "borderColor" | "borderDashArray" | "borderOpacityWhenMoving" | "borderScaleFactor" | "hasBorders" | "selectionBackgroundColor" | "selectable" | "evented" | "perPixelTargetFind" | "activeOn" | "hoverCursor" | "moveCursor" | "minScaleLimit" | "includeDefaultValues" | "excludeFromExport" | "objectCaching" | "inverted" | "absolutePositioned" | "padding" | Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("./Object/types").SerializedObjectProps>]: Omit<Partial<import("./Object/types").FabricObjectProps> & TClassProperties<this>, keyof import("./Object/types").SerializedObjectProps>["cornerStyle" | "cornerSize" | "cornerColor" | "cornerStrokeColor" | "cornerDashArray" | "transparentCorners" | "noScaleCache" | "centeredScaling" | "snapAngle" | "snapThreshold" | "centeredRotation" | "lockMovementX" | "lockMovementY" | "lockRotation" | "lockScalingX" | "lockScalingY" | "lockSkewingX" | "lockSkewingY" | "lockScalingFlip" | "touchCornerSize" | "hasControls" | "borderColor" | "borderDashArray" | "borderOpacityWhenMoving" | "borderScaleFactor" | "hasBorders" | "selectionBackgroundColor" | "selectable" | "evented" | "perPixelTargetFind" | "activeOn" | "hoverCursor" | "moveCursor" | "minScaleLimit" | "includeDefaultValues" | "excludeFromExport" | "objectCaching" | "inverted" | "absolutePositioned" | "padding" | Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("./Object/types").SerializedObjectProps>]; } & import("./Object/types").SerializedObjectProps;
    /**
     * Returns svg representation of an instance
     * @return {Array} an array of strings with the specific svg representation
     * of the instance
     */
    _toSVG(): (string | number)[];
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx context to render on
     */
    _render(ctx: CanvasRenderingContext2D): void;
    /**
     * List of attribute names to account for when parsing SVG element (used by {@link Ellipse.fromElement})
     * @static
     * @memberOf Ellipse
     * @see http://www.w3.org/TR/SVG/shapes.html#EllipseElement
     */
    static ATTRIBUTE_NAMES: string[];
    /**
     * Returns {@link Ellipse} instance from an SVG element
     * @static
     * @memberOf Ellipse
     * @param {SVGElement} element Element to parse
     * @param {Function} [callback] Options callback invoked after parsing is finished
     * @return {Ellipse}
     */
    static fromElement(element: SVGElement, callback: (ellipse: Ellipse) => void): void;
}
//# sourceMappingURL=Ellipse.d.ts.map