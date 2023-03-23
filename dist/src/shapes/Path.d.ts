import { Point } from '../Point';
import { PathData } from '../typedefs';
import { type TPathSegmentsInfo } from '../util/path';
import { FabricObject } from './Object/FabricObject';
export declare class Path extends FabricObject {
    /**
     * Array of path points
     * @type Array
     * @default
     */
    path: PathData;
    pathOffset: Point;
    fromSVG?: boolean;
    sourcePath?: string;
    segmentsInfo?: TPathSegmentsInfo[];
    static cacheProperties: string[];
    /**
     * Constructor
     * @param {Array|String} path Path data (sequence of coordinates and corresponding "command" tokens)
     * @param {Object} [options] Options object
     * @return {Path} thisArg
     */
    constructor(path: PathData | string, { path, left, top, ...options }?: any);
    /**
     * @private
     * @param {PathData | string} path Path data (sequence of coordinates and corresponding "command" tokens)
     * @param {boolean} [adjustPosition] pass true to reposition the object according to the bounding box
     * @returns {Point} top left position of the bounding box, useful for complementary positioning
     */
    _setPath(path: PathData | string, adjustPosition?: boolean): Point;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx context to render path on
     */
    _renderPathCommands(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx context to render path on
     */
    _render(ctx: CanvasRenderingContext2D): void;
    /**
     * Returns string representation of an instance
     * @return {String} string representation of an instance
     */
    toString(): string;
    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject(propertiesToInclude?: (keyof this)[]): { [R in "cornerStyle" | "cornerSize" | "cornerColor" | "cornerStrokeColor" | "cornerDashArray" | "transparentCorners" | "noScaleCache" | "centeredScaling" | "snapAngle" | "snapThreshold" | "centeredRotation" | "lockMovementX" | "lockMovementY" | "lockRotation" | "lockScalingX" | "lockScalingY" | "lockSkewingX" | "lockSkewingY" | "lockScalingFlip" | "touchCornerSize" | "hasControls" | "borderColor" | "borderDashArray" | "borderOpacityWhenMoving" | "borderScaleFactor" | "hasBorders" | "selectionBackgroundColor" | "selectable" | "evented" | "perPixelTargetFind" | "activeOn" | "hoverCursor" | "moveCursor" | "minScaleLimit" | "includeDefaultValues" | "excludeFromExport" | "objectCaching" | "inverted" | "absolutePositioned" | "padding" | Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("./Object/types").SerializedObjectProps>]: Omit<Partial<import("./Object/types").FabricObjectProps> & import("../typedefs").TClassProperties<this>, keyof import("./Object/types").SerializedObjectProps>["cornerStyle" | "cornerSize" | "cornerColor" | "cornerStrokeColor" | "cornerDashArray" | "transparentCorners" | "noScaleCache" | "centeredScaling" | "snapAngle" | "snapThreshold" | "centeredRotation" | "lockMovementX" | "lockMovementY" | "lockRotation" | "lockScalingX" | "lockScalingY" | "lockSkewingX" | "lockSkewingY" | "lockScalingFlip" | "touchCornerSize" | "hasControls" | "borderColor" | "borderDashArray" | "borderOpacityWhenMoving" | "borderScaleFactor" | "hasBorders" | "selectionBackgroundColor" | "selectable" | "evented" | "perPixelTargetFind" | "activeOn" | "hoverCursor" | "moveCursor" | "minScaleLimit" | "includeDefaultValues" | "excludeFromExport" | "objectCaching" | "inverted" | "absolutePositioned" | "padding" | Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("./Object/types").SerializedObjectProps>]; } & {
        path: (string | number)[][];
        opacity: number;
        globalCompositeOperation: GlobalCompositeOperation;
        backgroundColor: string;
        shadow: Partial<{
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
            affectStroke: boolean;
            nonScaling: boolean;
        }> | null;
        visible: boolean;
        clipPath?: (Partial<import("./Object/types").SerializedObjectProps> & import("./Object/types/SerializedObjectProps").ClipPathProps) | undefined;
        top: number;
        left: number;
        width: number;
        height: number;
        flipX: boolean;
        flipY: boolean;
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        originX: import("../typedefs").TOriginX;
        originY: import("../typedefs").TOriginY;
        angle: import("../typedefs").TDegree;
        paintFirst: "fill" | "stroke";
        fill: string | Record<string, any> | (Partial<import("../..").Gradient<"linear", "linear">> & {
            type: "linear";
            coords: import("../gradient/typedefs").LinearGradientCoords<number>;
            colorStops: import("../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | (Partial<import("../..").Gradient<"radial", "radial">> & {
            type: "radial";
            coords: import("../gradient/typedefs").RadialGradientCoords<number>;
            colorStops: import("../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | null;
        fillRule: CanvasFillRule;
        stroke: string | Record<string, any> | (Partial<import("../..").Gradient<"linear", "linear">> & {
            type: "linear";
            coords: import("../gradient/typedefs").LinearGradientCoords<number>;
            colorStops: import("../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | (Partial<import("../..").Gradient<"radial", "radial">> & {
            type: "radial";
            coords: import("../gradient/typedefs").RadialGradientCoords<number>;
            colorStops: import("../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | null;
        strokeWidth: number;
        strokeDashArray: number[] | null;
        strokeDashOffset: number;
        strokeLineCap: CanvasLineCap;
        strokeLineJoin: CanvasLineJoin;
        strokeMiterLimit: number;
        strokeUniform: boolean;
    };
    /**
     * Returns dataless object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toDatalessObject(propertiesToInclude?: (keyof this)[]): { [R in "cornerStyle" | "cornerSize" | "cornerColor" | "cornerStrokeColor" | "cornerDashArray" | "transparentCorners" | "noScaleCache" | "centeredScaling" | "snapAngle" | "snapThreshold" | "centeredRotation" | "lockMovementX" | "lockMovementY" | "lockRotation" | "lockScalingX" | "lockScalingY" | "lockSkewingX" | "lockSkewingY" | "lockScalingFlip" | "touchCornerSize" | "hasControls" | "borderColor" | "borderDashArray" | "borderOpacityWhenMoving" | "borderScaleFactor" | "hasBorders" | "selectionBackgroundColor" | "selectable" | "evented" | "perPixelTargetFind" | "activeOn" | "hoverCursor" | "moveCursor" | "minScaleLimit" | "includeDefaultValues" | "excludeFromExport" | "objectCaching" | "inverted" | "absolutePositioned" | "padding" | Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("./Object/types").SerializedObjectProps>]: Omit<Partial<import("./Object/types").FabricObjectProps> & import("../typedefs").TClassProperties<this>, keyof import("./Object/types").SerializedObjectProps>["cornerStyle" | "cornerSize" | "cornerColor" | "cornerStrokeColor" | "cornerDashArray" | "transparentCorners" | "noScaleCache" | "centeredScaling" | "snapAngle" | "snapThreshold" | "centeredRotation" | "lockMovementX" | "lockMovementY" | "lockRotation" | "lockScalingX" | "lockScalingY" | "lockSkewingX" | "lockSkewingY" | "lockScalingFlip" | "touchCornerSize" | "hasControls" | "borderColor" | "borderDashArray" | "borderOpacityWhenMoving" | "borderScaleFactor" | "hasBorders" | "selectionBackgroundColor" | "selectable" | "evented" | "perPixelTargetFind" | "activeOn" | "hoverCursor" | "moveCursor" | "minScaleLimit" | "includeDefaultValues" | "excludeFromExport" | "objectCaching" | "inverted" | "absolutePositioned" | "padding" | Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("./Object/types").SerializedObjectProps>]; } & {
        path: (string | number)[][];
        opacity: number;
        globalCompositeOperation: GlobalCompositeOperation;
        backgroundColor: string;
        shadow: Partial<{
            color: string;
            blur: number;
            offsetX: number;
            offsetY: number;
            affectStroke: boolean;
            nonScaling: boolean;
        }> | null;
        visible: boolean;
        clipPath?: (Partial<import("./Object/types").SerializedObjectProps> & import("./Object/types/SerializedObjectProps").ClipPathProps) | undefined;
        top: number;
        left: number;
        width: number;
        height: number;
        flipX: boolean;
        flipY: boolean;
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        originX: import("../typedefs").TOriginX;
        originY: import("../typedefs").TOriginY;
        angle: import("../typedefs").TDegree;
        paintFirst: "fill" | "stroke";
        fill: string | Record<string, any> | (Partial<import("../..").Gradient<"linear", "linear">> & {
            type: "linear";
            coords: import("../gradient/typedefs").LinearGradientCoords<number>;
            colorStops: import("../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | (Partial<import("../..").Gradient<"radial", "radial">> & {
            type: "radial";
            coords: import("../gradient/typedefs").RadialGradientCoords<number>;
            colorStops: import("../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | null;
        fillRule: CanvasFillRule;
        stroke: string | Record<string, any> | (Partial<import("../..").Gradient<"linear", "linear">> & {
            type: "linear";
            coords: import("../gradient/typedefs").LinearGradientCoords<number>;
            colorStops: import("../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | (Partial<import("../..").Gradient<"radial", "radial">> & {
            type: "radial";
            coords: import("../gradient/typedefs").RadialGradientCoords<number>;
            colorStops: import("../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | null;
        strokeWidth: number;
        strokeDashArray: number[] | null;
        strokeDashOffset: number;
        strokeLineCap: CanvasLineCap;
        strokeLineJoin: CanvasLineJoin;
        strokeMiterLimit: number;
        strokeUniform: boolean;
    };
    /**
     * Returns svg representation of an instance
     * @return {Array} an array of strings with the specific svg representation
     * of the instance
     */
    _toSVG(): string[];
    _getOffsetTransform(): string;
    /**
     * Returns svg clipPath representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    toClipPathSVG(reviver: any): string;
    /**
     * Returns svg representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    toSVG(reviver: any): string;
    /**
     * Returns number representation of an instance complexity
     * @return {Number} complexity of this instance
     */
    complexity(): number;
    setDimensions(): Point;
    /**
     * @private
     */
    _calcDimensions(): {
        left: number;
        top: number;
        pathOffset: Point;
        width: number;
        height: number;
    };
    /**
     * List of attribute names to account for when parsing SVG element (used by `Path.fromElement`)
     * @static
     * @memberOf Path
     * @see http://www.w3.org/TR/SVG/paths.html#PathElement
     */
    static ATTRIBUTE_NAMES: string[];
    /**
     * Creates an instance of Path from an object
     * @static
     * @memberOf Path
     * @param {Object} object
     * @returns {Promise<Path>}
     */
    static fromObject(object: any): Promise<import("./Object/Object").FabricObject<Partial<import("./Object/types/ObjectProps").ObjectProps>, import("./Object/types").SerializedObjectProps, import("../EventTypeDefs").ObjectEvents>>;
    /**
     * Creates an instance of Path from an SVG <path> element
     * @static
     * @memberOf Path
     * @param {SVGElement} element to parse
     * @param {Function} callback Callback to invoke when an Path instance is created
     * @param {Object} [options] Options object
     * @param {Function} [callback] Options callback invoked after parsing is finished
     */
    static fromElement(element: any, callback: any, options: any): void;
}
//# sourceMappingURL=Path.d.ts.map