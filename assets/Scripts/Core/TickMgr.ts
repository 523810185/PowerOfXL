import { _decorator, Component, Node } from 'cc';

/**
 * 
 * TickMgr
 * zstuzzy
 * Fri Jul 07 2023 00:42:15 GMT+0800 (GMT+08:00)
 *
 */
export interface IUpdate
{
    Update(dt: number): void;
}

export class TickMgr
{
    private m_arrUpdater: Array<IUpdate> = new Array<IUpdate>();

    public Update(dt: number): void 
    {
        this.m_arrUpdater.forEach(element => {
            element.Update(dt);
        });
    }

    public BindTick(updater: IUpdate)
    {
        this.m_arrUpdater.push(updater);
    }
}