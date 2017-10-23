import { IBemjson } from './iBem';

export interface IBemjsonRender {
    json(bemjson?: IBemjson): IBemjson;
}

export type BemjsonRendererFunction = (bemjson?: IBemjson) => IBemjson;

export type BemjsonRenderer = IBemjsonRender | BemjsonRendererFunction;
