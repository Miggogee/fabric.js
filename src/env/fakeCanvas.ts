import {
  Canvas,
  ContextAttributes,
  SKRSContext2D,
  SvgExportFlag,
} from '@napi-rs/canvas';
/*
import type {
  Canvas as NodeCanvas,
  CanvasRenderingContext2D,
  JpegConfig,
  JPEGStream,
  PdfConfig,
  PDFStream,
  PngConfig,
  PNGStream,
} from 'canvas';*/

export class fakeCanvas extends Canvas {
  type: 'image' | 'pdf' | 'svg';
  stride: number;
  PNG_NO_FILTERS: number;
  PNG_ALL_FILTERS: number;
  PNG_FILTER_NONE: number;
  PNG_FILTER_SUB: number;
  PNG_FILTER_UP: number;
  PNG_FILTER_AVG: number;
  PNG_FILTER_PAETH: number;

  constructor(width: number, height: number, flag?: SvgExportFlag) {
    super(width, height, flag);
    this.type = 'svg';
  }

  getContext(contextType: '2d', contextAttributes?: ContextAttributes) {
    let ctx = super.getContext(contextType, contextAttributes) as SKRSContext2D;
    /*
    let transform = ctx.getTransform()
    let ctx_fix = Object.assign(ctx, {
      addPage: () => {},
      patternQuality: 'good',
      antialias: 'default',
      textDrawingMode: 'path',
      quality: 'good',
      currentTransform: transform,
    }) as CanvasRenderingContext2D;*/
    return ctx;
  }

  createPNGStream(config?: undefined) {
    return this.encode('png');
  }
  createJPEGStream(config?: undefined) {
    return this.encode('jpeg');
  }
  createPDFStream(config?: undefined) {
    throw new Error('Method not implemented.');
  }
}
