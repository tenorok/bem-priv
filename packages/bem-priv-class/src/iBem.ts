export interface IMods extends Record<string, string | boolean | number> {}

export interface IAttrs extends Record<string, string | boolean | number> {}

export interface IMix {
    block?: string;
    mods?: IMods;
    elem?: string;
    elemMods?: IMods;
    js?: object;
}

export type Content = IBemjson | string | number;

export interface IBemjson extends IMix, Record<string, any> {
    attrs?: IAttrs;
    mix?: IMix[];
    content?: Content[];
    bem?: boolean;
    cls?: string;
    tag?: string;
}
