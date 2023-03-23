export declare enum GLPrecision {
    low = "lowp",
    medium = "mediump",
    high = "highp"
}
export declare abstract class GLProbe {
    GLPrecision: GLPrecision | undefined;
    abstract queryWebGL(canvas: HTMLCanvasElement): void;
    abstract isSupported(textureSize: number): boolean;
}
//# sourceMappingURL=GLProbe.d.ts.map