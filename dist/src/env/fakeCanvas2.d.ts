import { Canvas } from '@napi-rs/canvas';
import type { Canvas as NodeCanvas, JpegConfig, JPEGStream, PdfConfig, PDFStream, PngConfig, PNGStream } from 'canvas';
export declare class fakeCanvas extends Canvas implements NodeCanvas {
    type: 'image' | 'pdf' | 'svg';
    stride: number;
    PNG_NO_FILTERS: number;
    PNG_ALL_FILTERS: number;
    PNG_FILTER_NONE: number;
    PNG_FILTER_SUB: number;
    PNG_FILTER_UP: number;
    PNG_FILTER_AVG: number;
    PNG_FILTER_PAETH: number;
    constructor();
    createPNGStream(config?: PngConfig | undefined): PNGStream;
    createJPEGStream(config?: JpegConfig | undefined): JPEGStream;
    createPDFStream(config?: PdfConfig | undefined): PDFStream;
}
//# sourceMappingURL=fakeCanvas2.d.ts.map