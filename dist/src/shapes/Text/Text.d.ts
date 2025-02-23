import { ObjectEvents } from '../../EventTypeDefs';
import { TextStyle, TextStyleDeclaration, StyledText } from './StyledText';
import type { Point } from '../../Point';
import type { TCacheCanvasDimensions, TClassProperties, TFiller } from '../../typedefs';
import { Path } from '../Path';
/**
 * Measure and return the info of a single grapheme.
 * needs the the info of previous graphemes already filled
 * Override to customize measuring
 */
export type GraphemeBBox<onPath = false> = {
    width: number;
    height: number;
    kernedWidth: number;
    left: number;
    deltaY: number;
} & (onPath extends true ? {
    renderLeft: number;
    renderTop: number;
    angle: number;
} : Record<string, never>);
export declare const textDefaultValues: Partial<TClassProperties<Text>>;
/**
 * Text class
 * @tutorial {@link http://fabricjs.com/fabric-intro-part-2#text}
 */
export declare class Text<EventSpec extends ObjectEvents = ObjectEvents> extends StyledText<EventSpec> {
    /**
     * Properties that requires a text layout recalculation when changed
     * @type string[]
     * @protected
     */
    static textLayoutProperties: string[];
    /**
     * @private
     */
    _reNewline: RegExp;
    /**
     * Use this regular expression to filter for whitespaces that is not a new line.
     * Mostly used when text is 'justify' aligned.
     * @private
     */
    _reSpacesAndTabs: RegExp;
    /**
     * Use this regular expression to filter for whitespace that is not a new line.
     * Mostly used when text is 'justify' aligned.
     * @private
     */
    _reSpaceAndTab: RegExp;
    /**
     * Use this regular expression to filter consecutive groups of non spaces.
     * Mostly used when text is 'justify' aligned.
     * @private
     */
    _reWords: RegExp;
    text: string;
    /**
     * Font size (in pixels)
     * @type Number
     * @default
     */
    fontSize: number;
    /**
     * Font weight (e.g. bold, normal, 400, 600, 800)
     * @type {(Number|String)}
     * @default
     */
    fontWeight: string;
    /**
     * Font family
     * @type String
     * @default
     */
    fontFamily: string;
    /**
     * Text decoration underline.
     * @type Boolean
     * @default
     */
    underline: boolean;
    /**
     * Text decoration overline.
     * @type Boolean
     * @default
     */
    overline: boolean;
    /**
     * Text decoration linethrough.
     * @type Boolean
     * @default
     */
    linethrough: boolean;
    /**
     * Text alignment. Possible values: "left", "center", "right", "justify",
     * "justify-left", "justify-center" or "justify-right".
     * @type String
     * @default
     */
    textAlign: string;
    /**
     * Font style . Possible values: "", "normal", "italic" or "oblique".
     * @type String
     * @default
     */
    fontStyle: string;
    /**
     * Line height
     * @type Number
     * @default
     */
    lineHeight: number;
    /**
     * Superscript schema object (minimum overlap)
     */
    superscript: {
        /**
         * fontSize factor
         * @default 0.6
         */
        size: number;
        /**
         * baseline-shift factor (upwards)
         * @default -0.35
         */
        baseline: number;
    };
    /**
     * Subscript schema object (minimum overlap)
     */
    subscript: {
        /**
         * fontSize factor
         * @default 0.6
         */
        size: number;
        /**
         * baseline-shift factor (downwards)
         * @default 0.11
         */
        baseline: number;
    };
    /**
     * Background color of text lines
     * @type String
     * @default
     */
    textBackgroundColor: string;
    protected _styleProperties: string[];
    styles: TextStyle;
    /**
     * Path that the text should follow.
     * since 4.6.0 the path will be drawn automatically.
     * if you want to make the path visible, give it a stroke and strokeWidth or fill value
     * if you want it to be hidden, assign visible = false to the path.
     * This feature is in BETA, and SVG import/export is not yet supported.
     * @type Path
     * @example
     * const textPath = new Text('Text on a path', {
     *     top: 150,
     *     left: 150,
     *     textAlign: 'center',
     *     charSpacing: -50,
     *     path: new Path('M 0 0 C 50 -100 150 -100 200 0', {
     *         strokeWidth: 1,
     *         visible: false
     *     }),
     *     pathSide: 'left',
     *     pathStartOffset: 0
     * });
     * @default
     */
    path: Path;
    /**
     * Offset amount for text path starting position
     * Only used when text has a path
     * @type Number
     * @default
     */
    pathStartOffset: number;
    /**
     * Which side of the path the text should be drawn on.
     * Only used when text has a path
     * @type {String} 'left|right'
     * @default
     */
    pathSide: string;
    /**
     * How text is aligned to the path. This property determines
     * the perpendicular position of each character relative to the path.
     * (one of "baseline", "center", "ascender", "descender")
     * This feature is in BETA, and its behavior may change
     * @type String
     * @default
     */
    pathAlign: string;
    /**
     * @private
     */
    _fontSizeFraction: number;
    /**
     * @private
     */
    offsets: {
        underline: number;
        linethrough: number;
        overline: number;
    };
    /**
     * Text Line proportion to font Size (in pixels)
     * @type Number
     * @default
     */
    _fontSizeMult: number;
    /**
     * additional space between characters
     * expressed in thousands of em unit
     * @type Number
     * @default
     */
    charSpacing: number;
    /**
     * Baseline shift, styles only, keep at 0 for the main text object
     * @type {Number}
     * @default
     */
    deltaY: number;
    /**
     * WARNING: EXPERIMENTAL. NOT SUPPORTED YET
     * determine the direction of the text.
     * This has to be set manually together with textAlign and originX for proper
     * experience.
     * some interesting link for the future
     * https://www.w3.org/International/questions/qa-bidi-unicode-controls
     * @since 4.5.0
     * @type {String} 'ltr|rtl'
     * @default
     */
    direction: string;
    /**
     * contains characters bounding boxes
     */
    protected __charBounds: GraphemeBBox[][];
    /**
     * use this size when measuring text. To avoid IE11 rounding errors
     * @type {Number}
     * @default
     * @readonly
     * @private
     */
    CACHE_FONT_SIZE: number;
    /**
     * contains the min text width to avoid getting 0
     * @type {Number}
     * @default
     */
    MIN_TEXT_WIDTH: number;
    /**
     * contains the the text of the object, divided in lines as they are displayed
     * on screen. Wrapping will divide the text independently of line breaks
     * @type {string[]}
     * @default
     */
    textLines: string[];
    /**
     * same as textlines, but each line is an array of graphemes as split by splitByGrapheme
     * @type {string[]}
     * @default
     */
    _textLines: string[][];
    _unwrappedTextLines: string[][];
    _text: string[];
    cursorWidth: number;
    __lineHeights: number[];
    __lineWidths: number[];
    initialized?: true;
    static cacheProperties: string[];
    static ownDefaults: Record<string, any>;
    static getDefaults(): {
        [x: string]: any;
    };
    constructor(text: string, options: any);
    /**
     * If text has a path, it will add the extra information needed
     * for path and text calculations
     */
    setPathInfo(): void;
    /**
     * @private
     * Divides text into lines of text and lines of graphemes.
     */
    _splitText(): {
        _unwrappedLines: string[][];
        lines: string[];
        graphemeText: string[];
        graphemeLines: string[][];
    };
    /**
     * Initialize or update text dimensions.
     * Updates this.width and this.height with the proper values.
     * Does not return dimensions.
     */
    initDimensions(): void;
    /**
     * Enlarge space boxes and shift the others
     */
    enlargeSpaces(): void;
    /**
     * Detect if the text line is ended with an hard break
     * text and itext do not have wrapping, return false
     * @return {Boolean}
     */
    isEndOfWrapping(lineIndex: number): boolean;
    /**
     * Detect if a line has a linebreak and so we need to account for it when moving
     * and counting style.
     * It return always for text and Itext.
     * @return Number
     */
    missingNewlineOffset(lineIndex: number): number;
    /**
     * Returns 2d representation (lineIndex and charIndex) of cursor
     * @param {Number} selectionStart
     * @param {Boolean} [skipWrapping] consider the location for unwrapped lines. useful to manage styles.
     */
    get2DCursorLocation(selectionStart: number, skipWrapping?: boolean): {
        lineIndex: number;
        charIndex: number;
    };
    /**
     * Returns string representation of an instance
     * @return {String} String representation of text object
     */
    toString(): string;
    /**
     * Return the dimension and the zoom level needed to create a cache canvas
     * big enough to host the object to be cached.
     * @private
     * @param {Object} dim.x width of object to be cached
     * @param {Object} dim.y height of object to be cached
     * @return {Object}.width width of canvas
     * @return {Object}.height height of canvas
     * @return {Object}.zoomX zoomX zoom value to unscale the canvas before drawing cache
     * @return {Object}.zoomY zoomY zoom value to unscale the canvas before drawing cache
     */
    _getCacheCanvasDimensions(): TCacheCanvasDimensions;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderText(ctx: CanvasRenderingContext2D): void;
    /**
     * Set the font parameter of the context with the object properties or with charStyle
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {Object} [charStyle] object with font style properties
     * @param {String} [charStyle.fontFamily] Font Family
     * @param {Number} [charStyle.fontSize] Font size in pixels. ( without px suffix )
     * @param {String} [charStyle.fontWeight] Font weight
     * @param {String} [charStyle.fontStyle] Font style (italic|normal)
     */
    _setTextStyles(ctx: CanvasRenderingContext2D, charStyle?: any, forMeasuring?: boolean): void;
    /**
     * calculate and return the text Width measuring each line.
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @return {Number} Maximum width of Text object
     */
    calcTextWidth(): number;
    /**
     * @private
     * @param {String} method Method name ("fillText" or "strokeText")
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {String} line Text to render
     * @param {Number} left Left position of text
     * @param {Number} top Top position of text
     * @param {Number} lineIndex Index of a line in a text
     */
    _renderTextLine(method: 'fillText' | 'strokeText', ctx: CanvasRenderingContext2D, line: string[], left: number, top: number, lineIndex: number): void;
    /**
     * Renders the text background for lines, taking care of style
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderTextLinesBackground(ctx: CanvasRenderingContext2D): void;
    /**
     * measure and return the width of a single character.
     * possibly overridden to accommodate different measure logic or
     * to hook some external lib for character measurement
     * @private
     * @param {String} _char, char to be measured
     * @param {Object} charStyle style of char to be measured
     * @param {String} [previousChar] previous char
     * @param {Object} [prevCharStyle] style of previous char
     */
    _measureChar(_char: string, charStyle: TextStyleDeclaration, previousChar: string | undefined, prevCharStyle: any): {
        width: number;
        kernedWidth: number;
    };
    /**
     * Computes height of character at given position
     * @param {Number} line the line index number
     * @param {Number} _char the character index number
     * @return {Number} fontSize of the character
     */
    getHeightOfChar(line: number, _char: number): number;
    /**
     * measure a text line measuring all characters.
     * @param {Number} lineIndex line number
     */
    measureLine(lineIndex: number): {
        width: number;
        numOfSpaces: number;
    };
    /**
     * measure every grapheme of a line, populating __charBounds
     * @param {Number} lineIndex
     * @return {Object} object.width total width of characters
     * @return {Object} object.numOfSpaces length of chars that match this._reSpacesAndTabs
     */
    _measureLine(lineIndex: number): {
        width: number;
        numOfSpaces: number;
    };
    /**
     * Calculate the angle  and the left,top position of the char that follow a path.
     * It appends it to graphemeInfo to be reused later at rendering
     * @private
     * @param {Number} positionInPath to be measured
     * @param {GraphemeBBox} graphemeInfo current grapheme box information
     * @param {Object} startingPoint position of the point
     */
    _setGraphemeOnPath(positionInPath: number, graphemeInfo: GraphemeBBox<true>, startingPoint: Point): void;
    /**
     *
     * @param {String} grapheme to be measured
     * @param {Number} lineIndex index of the line where the char is
     * @param {Number} charIndex position in the line
     * @param {String} [prevGrapheme] character preceding the one to be measured
     * @returns {GraphemeBBox} grapheme bbox
     */
    _getGraphemeBox(grapheme: string, lineIndex: number, charIndex: number, prevGrapheme?: string, skipLeft?: boolean): GraphemeBBox;
    /**
     * Calculate height of line at 'lineIndex'
     * @param {Number} lineIndex index of line to calculate
     * @return {Number}
     */
    getHeightOfLine(lineIndex: number): number;
    /**
     * Calculate text box height
     */
    calcTextHeight(): number;
    /**
     * @private
     * @return {Number} Left offset
     */
    _getLeftOffset(): number;
    /**
     * @private
     * @return {Number} Top offset
     */
    _getTopOffset(): number;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {String} method Method name ("fillText" or "strokeText")
     */
    _renderTextCommon(ctx: CanvasRenderingContext2D, method: 'fillText' | 'strokeText'): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderTextFill(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderTextStroke(ctx: CanvasRenderingContext2D): void;
    /**
     * @private
     * @param {String} method fillText or strokeText.
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {Array} line Content of the line, splitted in an array by grapheme
     * @param {Number} left
     * @param {Number} top
     * @param {Number} lineIndex
     */
    _renderChars(method: 'fillText' | 'strokeText', ctx: CanvasRenderingContext2D, line: Array<any>, left: number, top: number, lineIndex: number): void;
    /**
     * This function try to patch the missing gradientTransform on canvas gradients.
     * transforming a context to transform the gradient, is going to transform the stroke too.
     * we want to transform the gradient but not the stroke operation, so we create
     * a transformed gradient on a pattern and then we use the pattern instead of the gradient.
     * this method has drawbacks: is slow, is in low resolution, needs a patch for when the size
     * is limited.
     * @private
     * @param {TFiller} filler a fabric gradient instance
     * @return {CanvasPattern} a pattern to use as fill/stroke style
     */
    _applyPatternGradientTransformText(filler: TFiller): CanvasPattern;
    handleFiller<T extends 'fill' | 'stroke'>(ctx: CanvasRenderingContext2D, property: `${T}Style`, filler: TFiller | string): {
        offsetX: number;
        offsetY: number;
    };
    _setStrokeStyles(ctx: CanvasRenderingContext2D, { stroke, strokeWidth }: Pick<this, 'stroke' | 'strokeWidth'>): {
        offsetX: number;
        offsetY: number;
    };
    _setFillStyles(ctx: CanvasRenderingContext2D, { fill }: Pick<this, 'fill'>): {
        offsetX: number;
        offsetY: number;
    };
    /**
     * @private
     * @param {String} method
     * @param {CanvasRenderingContext2D} ctx Context to render on
     * @param {Number} lineIndex
     * @param {Number} charIndex
     * @param {String} _char
     * @param {Number} left Left coordinate
     * @param {Number} top Top coordinate
     * @param {Number} lineHeight Height of the line
     */
    _renderChar(method: 'fillText' | 'strokeText', ctx: CanvasRenderingContext2D, lineIndex: number, charIndex: number, _char: string, left: number, top: number): void;
    /**
     * Turns the character into a 'superior figure' (i.e. 'superscript')
     * @param {Number} start selection start
     * @param {Number} end selection end
     */
    setSuperscript(start: number, end: number): void;
    /**
     * Turns the character into an 'inferior figure' (i.e. 'subscript')
     * @param {Number} start selection start
     * @param {Number} end selection end
     */
    setSubscript(start: number, end: number): void;
    /**
     * Applies 'schema' at given position
     * @private
     * @param {Number} start selection start
     * @param {Number} end selection end
     * @param {Number} schema
     */
    protected _setScript(start: number, end: number, schema: {
        size: number;
        baseline: number;
    }): void;
    /**
     * @private
     * @param {Number} lineIndex index text line
     * @return {Number} Line left offset
     */
    _getLineLeftOffset(lineIndex: number): number;
    /**
     * @private
     */
    _clearCache(): void;
    /**
     * Measure a single line given its index. Used to calculate the initial
     * text bounding box. The values are calculated and stored in __lineWidths cache.
     * @private
     * @param {Number} lineIndex line number
     * @return {Number} Line width
     */
    getLineWidth(lineIndex: number): number;
    _getWidthOfCharSpacing(): number;
    /**
     * Retrieves the value of property at given character position
     * @param {Number} lineIndex the line number
     * @param {Number} charIndex the character number
     * @param {String} property the property name
     * @returns the value of 'property'
     */
    getValueOfPropertyAt(lineIndex: number, charIndex: number, property: string): any;
    /**
     * @private
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _renderTextDecoration(ctx: CanvasRenderingContext2D, type: 'underline' | 'linethrough' | 'overline'): void;
    /**
     * return font declaration string for canvas context
     * @param {Object} [styleObject] object
     * @returns {String} font declaration formatted for canvas context.
     */
    _getFontDeclaration(styleObject?: TextStyleDeclaration, forMeasuring?: boolean): string;
    /**
     * Renders text instance on a specified context
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    render(ctx: CanvasRenderingContext2D): void;
    /**
     * Override this method to customize grapheme splitting
     * @todo the util `graphemeSplit` needs to be injectable in some way.
     * is more comfortable to inject the correct util rather than having to override text
     * in the middle of the prototype chain
     * @param {string} value
     * @returns {string[]} array of graphemes
     */
    graphemeSplit(value: string): string[];
    /**
     * Returns the text as an array of lines.
     * @param {String} text text to split
     * @returns  Lines in the text
     */
    _splitTextIntoLines(text: string): {
        _unwrappedLines: string[][];
        lines: string[];
        graphemeText: string[];
        graphemeLines: string[][];
    };
    /**
     * Returns object representation of an instance
     * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} Object representation of an instance
     */
    toObject(propertiesToInclude?: (keyof this)[]): { [R in Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("../Object/types").SerializedObjectProps> | Exclude<keyof EventSpec, keyof import("../Object/types").SerializedObjectProps>]: Omit<EventSpec & TClassProperties<this>, keyof import("../Object/types").SerializedObjectProps>[Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("../Object/types").SerializedObjectProps> | Exclude<keyof EventSpec, keyof import("../Object/types").SerializedObjectProps>]; } & {
        path?: ({
            canvas?: unknown;
            cornerStyle: unknown;
            cornerSize: unknown;
            cornerColor: unknown;
            cornerStrokeColor: unknown;
            cornerDashArray: unknown;
            transparentCorners: unknown;
            noScaleCache: unknown;
            centeredScaling: unknown;
            snapAngle?: unknown;
            snapThreshold?: unknown;
            centeredRotation: unknown;
            lockMovementX: unknown;
            lockMovementY: unknown;
            lockRotation: unknown;
            lockScalingX: unknown;
            lockScalingY: unknown;
            lockSkewingX: unknown;
            lockSkewingY: unknown;
            lockScalingFlip: unknown;
            touchCornerSize: unknown;
            hasControls: unknown;
            borderColor: unknown;
            borderDashArray: unknown;
            borderOpacityWhenMoving: unknown;
            borderScaleFactor: unknown;
            hasBorders: unknown;
            selectionBackgroundColor: unknown;
            selectable: unknown;
            evented: unknown;
            perPixelTargetFind: unknown;
            activeOn: unknown;
            hoverCursor: unknown;
            moveCursor: unknown;
            oCoords: unknown;
            __corner?: unknown;
            _controlsVisibility: unknown;
            controls: unknown;
            isMoving?: unknown;
            _scaling?: unknown;
            minScaleLimit: unknown;
            includeDefaultValues: unknown;
            excludeFromExport: unknown;
            objectCaching: unknown;
            inverted: unknown;
            absolutePositioned: unknown;
            dirty: unknown;
            _cacheContext: unknown;
            _cacheCanvas?: unknown;
            cacheWidth?: unknown;
            cacheHeight?: unknown;
            zoomX?: unknown;
            zoomY?: unknown;
            cacheTranslationX?: unknown;
            cacheTranslationY?: unknown;
            group?: unknown;
            ownCaching?: unknown;
            _transformDone?: unknown;
            type: unknown;
            colorProperties: unknown;
            __owningGroup?: unknown;
            padding: unknown;
            aCoords: unknown;
            lineCoords: unknown;
            ownMatrixCache?: unknown;
            matrixCache?: unknown;
            _originalOriginX?: unknown;
            _originalOriginY?: unknown;
            clipPathId?: unknown;
            path: unknown;
            pathOffset: unknown;
            fromSVG?: unknown;
            sourcePath?: unknown;
            segmentsInfo?: unknown;
        } & {
            path: (string | number)[][];
            opacity: number;
            globalCompositeOperation: GlobalCompositeOperation;
            backgroundColor: string;
            shadow: Partial<{
                color: string;
                /**
                 * Text decoration underline.
                 * @type Boolean
                 * @default
                 */
                blur: number;
                offsetX: number;
                offsetY: number;
                affectStroke: boolean;
                nonScaling: boolean;
            }> | null;
            visible: boolean;
            clipPath?: (Partial<import("../Object/types").SerializedObjectProps> & import("../Object/types/SerializedObjectProps").ClipPathProps) | undefined;
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
            originX: import("../../typedefs").TOriginX;
            originY: import("../../typedefs").TOriginY;
            angle: import("../../typedefs").TDegree;
            paintFirst: "fill" | "stroke";
            fill: string | Record<string, any> | (Partial<import("../../..").Gradient<"linear", "linear">> & {
                type: "linear";
                coords: import("../../gradient/typedefs").LinearGradientCoords<number>;
                colorStops: import("../../gradient/typedefs").ColorStop[];
                offsetX: number;
                offsetY: number;
                gradientUnits: import("../../gradient/typedefs").GradientUnits;
                gradientTransform: number[] | null;
            }) | (Partial<import("../../..").Gradient<"radial", "radial">> & {
                type: "radial";
                coords: import("../../gradient/typedefs").RadialGradientCoords<number>;
                colorStops: import("../../gradient/typedefs").ColorStop[];
                offsetX: number;
                offsetY: number;
                gradientUnits: import("../../gradient/typedefs").GradientUnits;
                gradientTransform: number[] | null;
            }) | null;
            fillRule: CanvasFillRule;
            stroke: string | Record<string, any> | (Partial<import("../../..").Gradient<"linear", "linear">> & {
                type: "linear";
                coords: import("../../gradient/typedefs").LinearGradientCoords<number>;
                colorStops: import("../../gradient/typedefs").ColorStop[];
                offsetX: number;
                offsetY: number;
                gradientUnits: import("../../gradient/typedefs").GradientUnits;
                gradientTransform: number[] | null;
            }) | (Partial<import("../../..").Gradient<"radial", "radial">> & {
                type: "radial";
                coords: import("../../gradient/typedefs").RadialGradientCoords<number>;
                colorStops: import("../../gradient/typedefs").ColorStop[];
                offsetX: number;
                offsetY: number;
                gradientUnits: import("../../gradient/typedefs").GradientUnits;
                gradientTransform: number[] | null;
            }) | null;
            strokeWidth: number;
            strokeDashArray: number[] | null;
            strokeDashOffset: number;
            strokeLineCap: CanvasLineCap;
            strokeLineJoin: CanvasLineJoin;
            strokeMiterLimit: number;
            strokeUniform: boolean;
        }) | undefined;
        styles: import("../../util/misc/textStyles").TextStyleArray;
        opacity: number;
        globalCompositeOperation: GlobalCompositeOperation;
        backgroundColor: string;
        shadow: Partial<{
            color: string;
            /**
             * Text decoration underline.
             * @type Boolean
             * @default
             */
            blur: number;
            offsetX: number;
            offsetY: number;
            affectStroke: boolean;
            nonScaling: boolean;
        }> | null;
        visible: boolean;
        clipPath?: (Partial<import("../Object/types").SerializedObjectProps> & import("../Object/types/SerializedObjectProps").ClipPathProps) | undefined;
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
        originX: import("../../typedefs").TOriginX;
        originY: import("../../typedefs").TOriginY;
        angle: import("../../typedefs").TDegree;
        paintFirst: "fill" | "stroke";
        fill: string | Record<string, any> | (Partial<import("../../..").Gradient<"linear", "linear">> & {
            type: "linear";
            coords: import("../../gradient/typedefs").LinearGradientCoords<number>;
            colorStops: import("../../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | (Partial<import("../../..").Gradient<"radial", "radial">> & {
            type: "radial";
            coords: import("../../gradient/typedefs").RadialGradientCoords<number>;
            colorStops: import("../../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | null;
        fillRule: CanvasFillRule;
        stroke: string | Record<string, any> | (Partial<import("../../..").Gradient<"linear", "linear">> & {
            type: "linear";
            coords: import("../../gradient/typedefs").LinearGradientCoords<number>;
            colorStops: import("../../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../../gradient/typedefs").GradientUnits;
            gradientTransform: number[] | null;
        }) | (Partial<import("../../..").Gradient<"radial", "radial">> & {
            type: "radial";
            coords: import("../../gradient/typedefs").RadialGradientCoords<number>;
            colorStops: import("../../gradient/typedefs").ColorStop[];
            offsetX: number;
            offsetY: number;
            gradientUnits: import("../../gradient/typedefs").GradientUnits;
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
    set(key: string | any, value?: any): this;
    /**
     * Returns complexity of an instance
     * @return {Number} complexity
     */
    complexity(): number;
    static genericFonts: string[];
    /**
     * List of attribute names to account for when parsing SVG element (used by {@link Text.fromElement})
     * @static
     * @memberOf Text
     * @see: http://www.w3.org/TR/SVG/text.html#TextElement
     */
    static ATTRIBUTE_NAMES: string[];
    /**
     * Returns Text instance from an SVG element (<b>not yet implemented</b>)
     * @static
     * @memberOf Text
     * @param {SVGElement} element Element to parse
     * @param {Function} callback callback function invoked after parsing
     * @param {Object} [options] Options object
     */
    static fromElement(element: SVGElement, callback: (text: Text | null) => any, options: object): any;
    /**
     * Returns Text instance from an object representation
     * @param {Object} object plain js Object to create an instance from
     * @returns {Promise<Text>}
     */
    static fromObject(object: Record<string, any>): Promise<Text>;
}
//# sourceMappingURL=Text.d.ts.map