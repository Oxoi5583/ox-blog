import { useId } from "react";

class DataHub {
    public readonly debugId: string = Math.random().toString(36).slice(2);

    public constructor() {}
    
    private listeners : Map<string, Array<(arg0: any)=>void>> = new Map<string, Array<(arg0: any)=>void>>();
    private listenerIds : Map<string, Set<string>> = new Map<string, Set<string>>();
    private valBuf : Map<string, any> = new Map<string, any>();

    public addListener(p_state_func : (arg0: any)=>void , p_key : string) : void{
        const uid = useId();

        if(this.valBuf.has(p_key) && this.listenerIds.has(p_key) && !this.listenerIds.get(p_key)?.has(uid)){
            const val = this.valBuf.get(p_key);
            p_state_func(val);
        }
        if(!this.listeners.has(p_key)){
            this.listeners.set(p_key, new Array<(arg0: any)=>void>());
        }
        if(!this.listenerIds.has(p_key)){
            this.listenerIds.set(p_key, new Set<string>());
        }
        this.listenerIds.get(p_key)?.add(uid);
        this.listeners.get(p_key)?.push(p_state_func);
    }
    public setData(p_key : string, p_val : any) : void{
        if(this.listeners.has(p_key)){
            let lc = this.listeners.get(p_key)?.length ?? 0;
            for(let i = 0; i < lc; i++){
                this.listeners.get(p_key)?.[i](p_val);
            }
        }
        this.valBuf.set(p_key, p_val);
    }
    public getListenerCount(p_key : string) : number{
        return this.listeners.get(p_key)?.length ?? 0;
    }
}

declare global {
    var __datahub__: DataHub | undefined;
}

const dataHub = globalThis.__datahub__ ?? new DataHub();
globalThis.__datahub__ = dataHub;

export default dataHub;