import { _decorator, Component, Node } from 'cc';

/**
 * 
 * EventMgr
 * zstuzzy
 * Fri Jul 07 2023 21:58:01 GMT+0800 (GMT+08:00)
 *
 */

export class EventMgr 
{
    /**储存事件的map */
    private m_mapEventMap: Map<number, Map<any, (data: EventMsg) => void>> = null;

    constructor()
    {
        this.Init();
    }

    private Init(): void
    {
        this.m_mapEventMap = new Map<number, Map<any, (data: EventMsg) => void>>();
    }

    /**
     * 绑定事件
     * @param eventID 事件id
     * @param callback 回调函数的结构体 (data: EventMsg) => {}
     * @param caller 作用域
     */
    public BindEvent(eventID: number, callback: (data: EventMsg) => void, caller: any): void
    {
        let eventMap: Map<any, (data: EventMsg) => void> = this.m_mapEventMap.get(eventID);
        if(eventMap == null)
        {
            eventMap = new Map<any, (data: EventMsg) => void>();
            eventMap.set(caller, callback);
            this.m_mapEventMap.set(eventID, eventMap);
        }
        else
        {
            if(eventMap.has(caller)) 
            {
                console.warn("EventMgr：正在注册一个已经存在的事件。eventID:", eventID);
            }
            else 
            {
                eventMap.set(caller, callback);
            }
        }
    }

    /**
     * 解绑事件
     * @param eventID 事件id
     * @param caller 作用域
     */
    public UnbindEvent(eventID: number, caller: Object): void
    {
        let eventMap = this.m_mapEventMap.get(eventID);
        if(eventMap == null)
        {
            console.warn("EventMgr：正在解绑一个已经不存在的事件。eventID:", eventID);
        }
        else
        {
            if(eventMap.has(caller)) 
            {
                eventMap.delete(caller);
            }
            else 
            {
                console.warn("EventMgr：正在解绑一个已经不存在的结构体。eventID:", eventID);
            }
        }
    }

    /**
     * 丢出一个事件
     * @param eventID 事件id
     * @param data 数据
     */
    public Emit(eventID: number, data: EventMsg): void
    {
        let eventMap = this.m_mapEventMap.get(eventID);
        if(eventMap == null)
        {
            // console.warn("EventMgr：正在发送数据给一个已经未注册的事件。eventID:", eventID);
        }
        else
        {
            eventMap.forEach((callback: (data: EventMsg) => void, caller: Object) =>
            {
                // TODO.. 这两种有什么差异，以后需要去学习一下，但是至少现在ResMgr和EventMgr的两种方式工作情况都是没问题的
                callback.call(caller, data);
                // callback(data);
            });
        }
    }
}

export abstract class EventMsg 
{

}