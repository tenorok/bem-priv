import { Content, IAttrs, IBemjson, IMix, IMods } from './iBem';
import { BemjsonRenderer, IBemjsonRender } from './iRender';

export type BlockParams = { jsonRenders?: BemjsonRenderer[]; params?: object; };

export abstract class Block implements IBemjsonRender {
    private static readonly MODS_KEY: string = 'mods';
    private static readonly MIX_KEY: string = 'mix';
    private static readonly ATTRS_KEY: string = 'attrs';
    private static readonly PARAMS_KEY: string = 'js';
    private static readonly CONTENT_KEY: string = 'content';

    protected params: object;

    private _bemjson: IBemjson;

    private _jsonRenders: BemjsonRenderer[];

    constructor(args: BlockParams = {}) {
        const { jsonRenders = [], ...params }: BlockParams = args;

        this.params = Object.assign(this.defaultParams, params);

        this._jsonRenders = jsonRenders;

        this._bemjson = {
            block: this.block
        };
    }

    protected get defaultParams(): object {
        return {};
    }

    public get block(): string {
        return (this as any).constructor.name.toLowerCase();
    }

    public json(): IBemjson {
        this._jsonRenders.forEach((render: BemjsonRenderer) => {
            if (render instanceof Function) {
                this.bemjson = render(this.bemjson);
            } else {
                this.bemjson = render.json(this.bemjson);
            }
        });

        return this.bemjson;
    }

    public get mods(): IMods {
        return this._getProp(Block.MODS_KEY) as IMods;
    }

    public set mods(mods: IMods) {
        this._bemjson[Block.MODS_KEY] = mods;
    }

    public get mix(): IMix[] {
        return this._getProp(Block.MIX_KEY) as IMix[];
    }

    public set mix(mix: IMix[]) {
        this._bemjson[Block.MIX_KEY] = mix;
    }

    public get attrs(): IAttrs {
        return this._getProp(Block.ATTRS_KEY) as IAttrs;
    }

    public set attrs(attrs: IAttrs) {
        this._bemjson[Block.ATTRS_KEY] = attrs;
    }

    public get js(): object {
        return this._getProp(Block.PARAMS_KEY);
    }

    public set js(params: object) {
        this._bemjson[Block.PARAMS_KEY] = params;
    }

    public get content(): Content[] {
        return this._getProp(Block.CONTENT_KEY) as Content[];
    }

    public set content(content: Content[]) {
        this._bemjson[Block.CONTENT_KEY] = content;
    }

    public addProps(props: object): void {
        Object.assign(this._bemjson, props);
    }

    protected get bemjson(): IBemjson {
        return this._bemjson;
    }

    protected set bemjson(bemjson: IBemjson) {
        this._bemjson = bemjson;
    }

    private _getProp(key: string): object | object[] {
        if (!this._bemjson[key]) {
            this._bemjson[key] = key === Block.MIX_KEY || key === Block.CONTENT_KEY ? [] : {};
        }

        return this._bemjson[key];
    }
}
