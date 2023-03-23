/// <reference types="node" />
import { Canvas, ContextAttributes, SKRSContext2D, SvgExportFlag } from '@napi-rs/canvas';
export declare class fakeCanvas extends Canvas {
    type: 'image' | 'pdf' | 'svg';
    stride: number;
    PNG_NO_FILTERS: number;
    PNG_ALL_FILTERS: number;
    PNG_FILTER_NONE: number;
    PNG_FILTER_SUB: number;
    PNG_FILTER_UP: number;
    PNG_FILTER_AVG: number;
    PNG_FILTER_PAETH: number;
    constructor(width: number, height: number, flag?: SvgExportFlag);
    getContext(contextType: '2d', contextAttributes?: ContextAttributes): SKRSContext2D;
    createPNGStream(config?: undefined): Promise<Buffer>;
    createJPEGStream(config?: undefined): Promise<Buffer>;
    createPDFStream(config?: undefined): void;
}
//# sourceMappingURL=fakeCanvas.d.ts.map