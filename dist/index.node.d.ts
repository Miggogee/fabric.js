/// <reference types="node" />
import type { JpegConfig, PngConfig } from 'canvas';
import { Canvas as CanvasBase, StaticCanvas as StaticCanvasBase } from './fabric';
export * from './fabric';
export declare class StaticCanvas extends StaticCanvasBase {
    getNodeCanvas(): import("./src/env/fakeCanvas").fakeCanvas;
    createPNGStream(opts?: PngConfig): Promise<Buffer>;
    createJPEGStream(opts?: JpegConfig): Promise<Buffer>;
}
export declare class Canvas extends CanvasBase {
    getNodeCanvas(): import("./src/env/fakeCanvas").fakeCanvas;
    createPNGStream(opts?: PngConfig): Promise<Buffer>;
    createJPEGStream(opts?: JpegConfig): Promise<Buffer>;
}
//# sourceMappingURL=index.node.d.ts.map