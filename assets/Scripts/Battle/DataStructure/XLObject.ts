import { _decorator, Component, Node } from 'cc';

/**
 * 
 * Object
 * zstuzzy
 * Fri Jul 07 2023 10:01:51 GMT+0800 (中国标准时间)
 *
 */

class GUID {
    private str: string;

    constructor(str?: string) {
        this.str = str || GUID.getNewGUIDString();
    }

    toString() {
        return this.str;
    }

    private static getNewGUIDString() {
        // your favourite guid generation function could go here
        // ex: http://stackoverflow.com/a/8809472/188246
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}

/**
 * 所有物体的基类
 */
export class XLObject
{
    public constructor()
    {
        this.m_sGuid = new GUID().toString();
    }

    private m_sGuid: string = null;

    public get Guid(): string
    {
        return this.m_sGuid;
    }
}