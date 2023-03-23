import type { CollectionEvents, ObjectEvents } from '../EventTypeDefs';
import { Point } from '../Point';
import type { TClassProperties } from '../typedefs';
import { FabricObject } from './Object/FabricObject';
export type LayoutContextType = 'initialization' | 'object_modified' | 'added' | 'removed' | 'layout_change' | 'imperative';
export type LayoutContext = {
    type: LayoutContextType;
    /**
     * array of objects starting from the object that triggered the call to the current one
     */
    path?: Group[];
    [key: string]: any;
};
export type GroupEvents = ObjectEvents & CollectionEvents & {
    layout: {
        context: LayoutContext;
        result: LayoutResult;
        diff: Point;
    };
};
export type LayoutStrategy = 'fit-content' | 'fit-content-lazy' | 'fixed' | 'clip-path';
/**
 * positioning and layout data **relative** to instance's parent
 */
export type LayoutResult = {
    /**
     * new centerX as measured by the containing plane (same as `left` with `originX` set to `center`)
     */
    centerX: number;
    /**
     * new centerY as measured by the containing plane (same as `top` with `originY` set to `center`)
     */
    centerY: number;
    /**
     * correctionX to translate objects by, measured as `centerX`
     */
    correctionX?: number;
    /**
     * correctionY to translate objects by, measured as `centerY`
     */
    correctionY?: number;
    width: number;
    height: number;
};
export declare const groupDefaultValues: Partial<TClassProperties<Group>>;
declare const Group_base: {
    new (...args: any[]): {
        _objects: import("../EventTypeDefs").BaseFabricObject[];
        _onObjectAdded(object: import("../EventTypeDefs").BaseFabricObject): void;
        _onObjectRemoved(object: import("../EventTypeDefs").BaseFabricObject): void;
        _onStackOrderChanged(object: import("../EventTypeDefs").BaseFabricObject): void;
        add(...objects: import("../EventTypeDefs").BaseFabricObject[]): number;
        insertAt(index: number, ...objects: import("../EventTypeDefs").BaseFabricObject[]): number;
        remove(...objects: import("../EventTypeDefs").BaseFabricObject[]): import("../EventTypeDefs").BaseFabricObject[];
        forEachObject(callback: (object: import("../EventTypeDefs").BaseFabricObject, index: number, array: import("../EventTypeDefs").BaseFabricObject[]) => any): void;
        getObjects(...types: string[]): import("../EventTypeDefs").BaseFabricObject[];
        item(index: number): import("../EventTypeDefs").BaseFabricObject;
        isEmpty(): boolean;
        size(): number;
        contains(object: import("../EventTypeDefs").BaseFabricObject, deep?: boolean | undefined): boolean;
        complexity(): number;
        sendObjectToBack(object: import("../EventTypeDefs").BaseFabricObject): boolean;
        bringObjectToFront(object: import("../EventTypeDefs").BaseFabricObject): boolean;
        sendObjectBackwards(object: import("../EventTypeDefs").BaseFabricObject, intersecting?: boolean | undefined): boolean;
        bringObjectForward(object: import("../EventTypeDefs").BaseFabricObject, intersecting?: boolean | undefined): boolean;
        moveObjectTo(object: import("../EventTypeDefs").BaseFabricObject, index: number): boolean;
        findNewLowerIndex(object: import("../EventTypeDefs").BaseFabricObject, idx: number, intersecting?: boolean | undefined): number;
        findNewUpperIndex(object: import("../EventTypeDefs").BaseFabricObject, idx: number, intersecting?: boolean | undefined): number;
        collectObjects({ left, top, width, height }: import("../typedefs").TBBox, { includeIntersecting }?: {
            includeIntersecting?: boolean | undefined;
        }): import("../EventTypeDefs").BaseFabricObject[];
    };
} & {
    new (options?: GroupEvents | undefined): FabricObject<GroupEvents, import("./Object/types").SerializedObjectProps, ObjectEvents>;
    ownDefaults: Record<string, any>;
    getDefaults(): Record<string, any>;
    stateProperties: string[];
    cacheProperties: string[];
    _fromObject<S extends import("./Object/Object").FabricObject<Partial<import("./Object/types/ObjectProps").ObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>>(object: Record<string, unknown>, { extraParam, ...options }?: {
        extraParam?: string | undefined;
        signal?: AbortSignal | undefined;
    }): Promise<S>;
    fromObject<T extends import("./Object/types").TProps<import("./Object/types").SerializedObjectProps>>(object: T, options?: {
        signal?: AbortSignal | undefined;
    } | undefined): Promise<import("./Object/Object").FabricObject<Partial<import("./Object/types/ObjectProps").ObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>>;
};
/**
 * @fires object:added
 * @fires object:removed
 * @fires layout once layout completes
 */
export declare class Group extends Group_base {
    /**
     * Specifies the **layout strategy** for instance
     * Used by `getLayoutStrategyResult` to calculate layout
     * `fit-content`, `fit-content-lazy`, `fixed`, `clip-path` are supported out of the box
     * @type LayoutStrategy
     * @default
     */
    layout: LayoutStrategy;
    /**
     * Used to optimize performance
     * set to `false` if you don't need contained objects to be targets of events
     * @default
     * @type boolean
     */
    subTargetCheck: boolean;
    /**
     * Used to allow targeting of object inside groups.
     * set to true if you want to select an object inside a group.\
     * **REQUIRES** `subTargetCheck` set to true
     * @default
     * @type boolean
     */
    interactive: boolean;
    /**
     * Used internally to optimize performance
     * Once an object is selected, instance is rendered without the selected object.
     * This way instance is cached only once for the entire interaction with the selected object.
     * @private
     */
    protected _activeObjects: FabricObject[];
    static stateProperties: string[];
    static ownDefaults: Record<string, any>;
    static getDefaults(): Record<string, any>;
    /**
     * Constructor
     *
     * @param {FabricObject[]} [objects] instance objects
     * @param {Object} [options] Options object
     * @param {boolean} [objectsRelativeToGroup] true if objects exist in group coordinate plane
     */
    constructor(objects?: FabricObject[], options?: any, objectsRelativeToGroup?: boolean);
    /**
     * Checks if object can enter group and logs relevant warnings
     * @private
     * @param {FabricObject} object
     * @returns
     */
    canEnterGroup(object: FabricObject): boolean;
    /**
     * Override this method to enhance performance (for groups with a lot of objects).
     * If Overriding, be sure not pass illegal objects to group - it will break your app.
     * @private
     */
    protected _filterObjectsBeforeEnteringGroup(objects: FabricObject[]): FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[];
    /**
     * Add objects
     * @param {...FabricObject[]} objects
     */
    add(...objects: FabricObject[]): number;
    /**
     * Inserts an object into collection at specified index
     * @param {FabricObject[]} objects Object to insert
     * @param {Number} index Index to insert object at
     */
    insertAt(index: number, ...objects: FabricObject[]): number;
    /**
     * Remove objects
     * @param {...FabricObject[]} objects
     * @returns {FabricObject[]} removed objects
     */
    remove(...objects: FabricObject[]): import("../EventTypeDefs").BaseFabricObject[];
    _onObjectAdded(object: FabricObject): void;
    _onRelativeObjectAdded(object: FabricObject): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object should exit group without applying group's transform to it
     */
    _onObjectRemoved(object: FabricObject, removeParentTransform?: boolean): void;
    /**
     * @private
     * @param {'added'|'removed'} type
     * @param {FabricObject[]} targets
     */
    _onAfterObjectsChange(type: 'added' | 'removed', targets: FabricObject[]): void;
    _onStackOrderChanged(): void;
    /**
     * @private
     * @param {string} key
     * @param {*} value
     */
    _set(key: string, value: any): this;
    /**
     * @private
     */
    _shouldSetNestedCoords(): boolean;
    /**
     * Remove all objects
     * @returns {FabricObject[]} removed objects
     */
    removeAll(): import("../EventTypeDefs").BaseFabricObject[];
    /**
     * invalidates layout on object modified
     * @private
     */
    __objectMonitor(opt: any): void;
    /**
     * keeps track of the selected objects
     * @private
     */
    __objectSelectionMonitor(selected: boolean, opt: any): void;
    /**
     * @private
     * @param {boolean} watch
     * @param {FabricObject} object
     */
    _watchObject(watch: boolean, object: FabricObject): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object is in canvas coordinate plane
     * @returns {boolean} true if object entered group
     */
    enterGroup(object: FabricObject, removeParentTransform?: boolean): boolean;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object is in canvas coordinate plane
     */
    _enterGroup(object: FabricObject, removeParentTransform?: boolean): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object should exit group without applying group's transform to it
     */
    exitGroup(object: FabricObject, removeParentTransform?: boolean): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {boolean} [removeParentTransform] true if object should exit group without applying group's transform to it
     */
    _exitGroup(object: FabricObject, removeParentTransform?: boolean): void;
    /**
     * Decide if the object should cache or not. Create its own cache level
     * needsItsOwnCache should be used when the object drawing method requires
     * a cache step. None of the fabric classes requires it.
     * Generally you do not cache objects in groups because the group is already cached.
     * @return {Boolean}
     */
    shouldCache(): boolean;
    /**
     * Check if this object or a child object will cast a shadow
     * @return {Boolean}
     */
    willDrawShadow(): boolean;
    /**
     * Check if instance or its group are caching, recursively up
     * @return {Boolean}
     */
    isOnACache(): boolean;
    /**
     * Execute the drawing operation for an object on a specified context
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    drawObject(ctx: CanvasRenderingContext2D): void;
    /**
     * @override
     * @return {Boolean}
     */
    setCoords(): void;
    /**
     * Renders instance on a given context
     * @param {CanvasRenderingContext2D} ctx context to render instance on
     */
    render(ctx: CanvasRenderingContext2D): void;
    /**
     * @public
     * @param {Partial<LayoutResult> & { layout?: string }} [context] pass values to use for layout calculations
     */
    triggerLayout(context: any): void;
    /**
     * @private
     * @param {FabricObject} object
     * @param {Point} diff
     */
    _adjustObjectPosition(object: FabricObject, diff: Point): void;
    /**
     * initial layout logic:
     * calculate bbox of objects (if necessary) and translate it according to options received from the constructor (left, top, width, height)
     * so it is placed in the center of the bbox received from the constructor
     *
     * @private
     * @param {LayoutContext} context
     */
    _applyLayoutStrategy(context: any): void;
    /**
     * Override this method to customize layout.
     * If you need to run logic once layout completes use `onLayout`
     * @public
     * @param {string} layoutDirective
     * @param {FabricObject[]} objects
     * @param {LayoutContext} context
     * @returns {LayoutResult | undefined}
     */
    getLayoutStrategyResult(layoutDirective: LayoutStrategy, objects: FabricObject[], context: LayoutContext): any;
    /**
     * Override this method to customize layout.
     * A wrapper around {@link Group#getObjectsBoundingBox}
     * @public
     * @param {string} layoutDirective
     * @param {FabricObject[]} objects
     * @param {LayoutContext} context
     * @returns {LayoutResult | undefined}
     */
    prepareBoundingBox(layoutDirective: LayoutStrategy, objects: FabricObject[], context: LayoutContext): any;
    /**
     * Calculates center taking into account originX, originY while not being sure that width/height are initialized
     * @public
     * @param {string} layoutDirective
     * @param {FabricObject[]} objects
     * @param {LayoutContext} context
     * @returns {LayoutResult | undefined}
     */
    prepareInitialBoundingBox(layoutDirective: LayoutStrategy, objects: FabricObject[], context: LayoutContext): {
        centerX: number;
        centerY: number;
        correctionX: number;
        correctionY: number;
        width: number;
        height: number;
    } | undefined;
    /**
     * Calculate the bbox of objects relative to instance's containing plane
     * @public
     * @param {FabricObject[]} objects
     * @returns {LayoutResult | null} bounding box
     */
    getObjectsBoundingBox(objects: FabricObject[], ignoreOffset?: boolean): LayoutResult | null;
    /**
     * Hook that is called once layout has completed.
     * Provided for layout customization, override if necessary.
     * Complements `getLayoutStrategyResult`, which is called at the beginning of layout.
     * @public
     * @param {LayoutContext} context layout context
     * @param {LayoutResult} result layout result
     */
    onLayout(context: LayoutContext, result: LayoutResult): void;
    /**
     *
     * @private
     * @param {'toObject'|'toDatalessObject'} [method]
     * @param {string[]} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @returns {FabricObject[]} serialized objects
     */
    __serializeObjects(method: 'toObject' | 'toDatalessObject', propertiesToInclude?: string[]): ({
        canvas?: unknown;
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
    } & import("./Object/types").SerializedObjectProps)[];
    /**
     * Returns object representation of an instance
     * @param {string[]} [propertiesToInclude] Any properties that you might want to additionally include in the output
     * @return {Object} object representation of an instance
     */
    toObject(propertiesToInclude?: (keyof this)[]): { [R in "mousedown" | "mousedown:before" | "mousemove" | "mousemove:before" | "mouseup" | "mouseup:before" | "mousedblclick" | "mousewheel" | "mouseover" | "mouseout" | "moving" | "scaling" | "rotating" | "skewing" | "resizing" | "modified" | "selected" | "deselected" | "added" | "removed" | "erasing:end" | "layout" | keyof {
        dragstart: import("../EventTypeDefs").TEvent<DragEvent> & {
            target: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>;
        };
        drag: import("../EventTypeDefs").DragEventData;
        dragover: import("../EventTypeDefs").DragEventData;
        dragenter: import("../EventTypeDefs").TEvent<DragEvent> & {
            target?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            subTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
            dragSource?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            canDrop?: boolean | undefined;
            didDrop?: boolean | undefined;
            dropTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        } & {
            previousTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        };
        dragleave: import("../EventTypeDefs").TEvent<DragEvent> & {
            target?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            subTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
            dragSource?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            canDrop?: boolean | undefined;
            didDrop?: boolean | undefined;
            dropTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        } & {
            nextTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        };
        dragend: import("../EventTypeDefs").DragEventData;
        'drop:before': import("../EventTypeDefs").DropEventData;
        drop: import("../EventTypeDefs").DropEventData;
        'drop:after': import("../EventTypeDefs").DropEventData;
    } | keyof import("../EventTypeDefs").MiscEvents | keyof CollectionEvents | Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("./Object/types").SerializedObjectProps>]: Omit<Record<"mousedown" | "mousedown:before" | "mousemove" | "mousemove:before" | "mouseup" | "mouseup:before" | "mousedblclick", import("../EventTypeDefs").TPointerEventInfo<import("../EventTypeDefs").TPointerEvent>> & Record<"mousewheel", import("../EventTypeDefs").TPointerEventInfo<WheelEvent>> & Record<"mouseover", import("../EventTypeDefs").TEvent<import("../EventTypeDefs").TPointerEvent> & {
        target?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        subTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
        button?: number | undefined;
        isClick: boolean;
        pointer: Point;
        transform?: import("../EventTypeDefs").Transform | null | undefined;
        absolutePointer: Point;
        currentSubTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
        currentTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | null | undefined;
    } & {
        previousTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
    }> & Record<"mouseout", import("../EventTypeDefs").TEvent<import("../EventTypeDefs").TPointerEvent> & {
        target?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        subTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
        button?: number | undefined;
        isClick: boolean;
        pointer: Point;
        transform?: import("../EventTypeDefs").Transform | null | undefined;
        absolutePointer: Point;
        currentSubTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
        currentTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | null | undefined;
    } & {
        nextTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
    }> & {
        dragstart: import("../EventTypeDefs").TEvent<DragEvent> & {
            target: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>;
        };
        drag: import("../EventTypeDefs").DragEventData;
        dragover: import("../EventTypeDefs").DragEventData;
        dragenter: import("../EventTypeDefs").TEvent<DragEvent> & {
            target?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            subTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
            dragSource?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            canDrop?: boolean | undefined;
            didDrop?: boolean | undefined;
            dropTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        } & {
            previousTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        };
        dragleave: import("../EventTypeDefs").TEvent<DragEvent> & {
            target?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            subTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
            dragSource?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            canDrop?: boolean | undefined;
            didDrop?: boolean | undefined;
            dropTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        } & {
            nextTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        };
        dragend: import("../EventTypeDefs").DragEventData;
        'drop:before': import("../EventTypeDefs").DropEventData;
        drop: import("../EventTypeDefs").DropEventData;
        'drop:after': import("../EventTypeDefs").DropEventData;
    } & import("../EventTypeDefs").MiscEvents & Record<"moving" | "scaling" | "rotating" | "skewing" | "resizing", import("../EventTypeDefs").BasicTransformEvent<import("../EventTypeDefs").TPointerEvent>> & Record<"modified", import("../EventTypeDefs").ModifiedEvent<import("../EventTypeDefs").TPointerEvent>> & {
        selected: Partial<import("../EventTypeDefs").TEvent<import("../EventTypeDefs").TPointerEvent>> & {
            target: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>;
        };
        deselected: Partial<import("../EventTypeDefs").TEvent<import("../EventTypeDefs").TPointerEvent>> & {
            target: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>;
        };
        added: {
            target: import("../..").Canvas | Group | import("../..").StaticCanvas<import("../EventTypeDefs").StaticCanvasEvents>;
        };
        removed: {
            target: import("../..").Canvas | Group | import("../..").StaticCanvas<import("../EventTypeDefs").StaticCanvasEvents>;
        };
        'erasing:end': {
            path: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>;
        }; /**
         * Remove objects
         * @param {...FabricObject[]} objects
         * @returns {FabricObject[]} removed objects
         */
    } & CollectionEvents & {
        layout: {
            context: LayoutContext;
            result: LayoutResult;
            diff: Point;
        };
    } & TClassProperties<this>, keyof import("./Object/types").SerializedObjectProps>["mousedown" | "mousedown:before" | "mousemove" | "mousemove:before" | "mouseup" | "mouseup:before" | "mousedblclick" | "mousewheel" | "mouseover" | "mouseout" | "moving" | "scaling" | "rotating" | "skewing" | "resizing" | "modified" | "selected" | "deselected" | "added" | "removed" | "erasing:end" | "layout" | keyof {
        dragstart: import("../EventTypeDefs").TEvent<DragEvent> & {
            target: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>;
        };
        drag: import("../EventTypeDefs").DragEventData;
        dragover: import("../EventTypeDefs").DragEventData;
        dragenter: import("../EventTypeDefs").TEvent<DragEvent> & {
            target?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            subTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
            dragSource?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            canDrop?: boolean | undefined;
            didDrop?: boolean | undefined;
            dropTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        } & {
            previousTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        };
        dragleave: import("../EventTypeDefs").TEvent<DragEvent> & {
            target?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            subTargets?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents>[] | undefined;
            dragSource?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
            canDrop?: boolean | undefined;
            didDrop?: boolean | undefined;
            dropTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        } & {
            nextTarget?: FabricObject<Partial<import("./Object/types").FabricObjectProps>, import("./Object/types").SerializedObjectProps, ObjectEvents> | undefined;
        };
        dragend: import("../EventTypeDefs").DragEventData;
        'drop:before': import("../EventTypeDefs").DropEventData;
        drop: import("../EventTypeDefs").DropEventData;
        'drop:after': import("../EventTypeDefs").DropEventData;
    } | keyof import("../EventTypeDefs").MiscEvents | keyof CollectionEvents | Exclude<{ [K in keyof this]: this[K] extends Function ? never : K; }[keyof this], keyof import("./Object/types").SerializedObjectProps>]; } & import("./Object/types").SerializedObjectProps;
    toString(): string;
    dispose(): void;
    /**
     * @private
     */
    _createSVGBgRect(reviver?: (markup: string) => any): string;
    /**
     * Returns svg representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    _toSVG(reviver?: (markup: string) => any): string[];
    /**
     * Returns styles-string for svg-export, specific version for group
     * @return {String}
     */
    getSvgStyles(): string;
    /**
     * Returns svg clipPath representation of an instance
     * @param {Function} [reviver] Method for further parsing of svg representation.
     * @return {String} svg representation of an instance
     */
    toClipPathSVG(reviver?: (markup: string) => any): string;
    /**
     * @todo support loading from svg
     * @private
     * @static
     * @memberOf Group
     * @param {Object} object Object to create a group from
     * @returns {Promise<Group>}
     */
    static fromObject({ objects, ...options }: {
        [x: string]: any;
        objects?: never[] | undefined;
    }): Promise<Group>;
}
export {};
//# sourceMappingURL=Group.d.ts.map