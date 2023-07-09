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
    private m_arrNoScaleUpdater: Array<IUpdate> = new Array<IUpdate>();
    private m_fTimeScale: number = 1;

    public constructor()
    {
        this.m_fTimeScale = 1;
    }

    public Update(dt: number): void 
    {
        var scaledDT = dt * this.m_fTimeScale;
        this.m_arrUpdater.forEach(element => {
            element.Update(scaledDT);
        });

        this.m_arrNoScaleUpdater.forEach(element => {
            element.Update(dt);
        });
    }

    public BindTick(updater: IUpdate)
    {
        this.m_arrUpdater.push(updater);
    }

    public BindNoScaleTick(updater: IUpdate) 
    {
        this.m_arrNoScaleUpdater.push(updater);
    }

    public set TimeScale(val: number) 
    {
        this.m_fTimeScale = val;
    }

    public get TimeScale(): number 
    {
        return this.m_fTimeScale;
    }
}