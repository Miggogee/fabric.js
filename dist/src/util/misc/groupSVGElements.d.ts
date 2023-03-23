import type { FabricObject } from '../../shapes/Object/FabricObject';
import { Group } from '../../shapes/Group';
/**
 * Groups SVG elements (usually those retrieved from SVG document)
 * @static
 * @param {FabricObject[]} elements FabricObject(s) parsed from svg, to group
 * @return {FabricObject | Group}
 */
export declare const groupSVGElements: (elements: FabricObject[]) => FabricObject<Partial<import("../../shapes/Object/types").FabricObjectProps>, import("../../shapes/Object/types").SerializedObjectProps, import("../../EventTypeDefs").ObjectEvents> | Group;
//# sourceMappingURL=groupSVGElements.d.ts.map