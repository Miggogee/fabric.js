import { TClassProperties } from '../typedefs';
import { FabricObject } from './Object/FabricObject';
export declare const rectDefaultValues: Partial<TClassProperties<Rect>>;
export declare class Rect extends FabricObject {
    /**
     * Horizontal border radius
     * @type Number
     * @default
     */
    rx: number;
    /**
     * Vertical border radius
     * @type Number
     * @default
     */
    ry: number;
    static cacheProperties: string[];
    static ownDefaults: Record<string, any>;
    static getDefaults(): Record<string, any>;
    /**
     * Constructor
     * @param {Object} [options] Options object
     * @return {Object} thisArg
     */
    constructor(options: Record<string, unknown>);
    /**
     * Initializes rx/ry attributes
     * @private
     */
    _initRxRy(): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render(ctx: CanvasRenderingContext2D): void;
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
    _toSVG(): string[];
    /**
     * List of attribute names to account for when parsing SVG element (used by `Rect.fromElement`)
     * @static
     * @memberOf Rect
     * @see: http://www.w3.org/TR/SVG/shapes.html#RectElement
     */
    static ATTRIBUTE_NAMES: string[];
    /**
     * Returns {@link Rect} instance from an SVG element
     * @static
     * @memberOf Rect
     * @param {SVGElement} element Element to parse
     * @param {Function} callback callback function invoked after parsing
     * @param {Object} [options] Options object
     */
    static fromElement(element: SVGElement, callback: (rect: Rect | null) => void, options?: {}): void;
}
//# sourceMappingURL=Rect.d.ts.map