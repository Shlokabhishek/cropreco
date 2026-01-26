// Type declarations for external modules without type definitions

declare module 'plotly.js-dist-min' {
  export interface Config {
    responsive?: boolean;
    displayModeBar?: boolean;
    displaylogo?: boolean;
    scrollZoom?: boolean;
    editable?: boolean;
    staticPlot?: boolean;
    toImageButtonOptions?: object;
    modeBarButtonsToRemove?: string[];
    modeBarButtonsToAdd?: string[];
  }

  export interface Layout {
    title?: string | { text?: string };
    xaxis?: object;
    yaxis?: object;
    width?: number;
    height?: number;
    margin?: object;
    showlegend?: boolean;
    legend?: object;
    paper_bgcolor?: string;
    plot_bgcolor?: string;
    font?: object;
    annotations?: object[];
    shapes?: object[];
    images?: object[];
    autosize?: boolean;
    hovermode?: string | boolean;
    dragmode?: string | boolean;
    grid?: object;
    template?: object;
  }

  export function newPlot(root: string | HTMLElement, data: object[], layout?: Layout, config?: Config): Promise<void>;
  export function react(root: string | HTMLElement, data: object[], layout?: Layout, config?: Config): Promise<void>;
  export function restyle(root: string | HTMLElement, update: object, traceIndices?: number[]): Promise<void>;
  export function relayout(root: string | HTMLElement, update: object): Promise<void>;
  export function purge(root: string | HTMLElement): void;
}

declare module 'papaparse' {
  export interface ParseConfig {
    delimiter?: string;
    newline?: string;
    quoteChar?: string;
    escapeChar?: string;
    header?: boolean;
    transformHeader?: (header: string, index: number) => string;
    dynamicTyping?: boolean;
    preview?: number;
    encoding?: string;
    worker?: boolean;
    comments?: boolean | string;
    step?: (results: ParseResult<any>, parser: any) => void;
    complete?: (results: ParseResult<any>) => void;
    error?: (error: ParseError, file: File) => void;
    download?: boolean;
    downloadRequestHeaders?: Record<string, string>;
    downloadRequestBody?: any;
    skipEmptyLines?: boolean | 'greedy';
    chunk?: (results: ParseResult<any>, parser: any) => void;
    chunkSize?: number;
    fastMode?: boolean;
    beforeFirstChunk?: (chunk: string) => string | void;
    withCredentials?: boolean;
    transform?: (value: string, field: string | number) => any;
    delimitersToGuess?: string[];
  }

  export interface ParseError {
    type: string;
    code: string;
    message: string;
    row: number;
  }

  export interface ParseMeta {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
    fields?: string[];
  }

  export interface ParseResult<T> {
    data: T[];
    errors: ParseError[];
    meta: ParseMeta;
  }

  export function parse<T>(input: string | File, config?: ParseConfig): ParseResult<T>;
  export function unparse(data: any, config?: any): string;
}
