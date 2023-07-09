import { _decorator, Component, Node } from 'cc';
import { CampType, Entity } from './Entity';
import { AI } from './AI';
import { IUpdate } from '../../Core/TickMgr';
import { Core } from '../../Core/Core';
import { EventID, MonsterDieMsg } from '../../Core/EventID';

/**
 * 
 * Monster
 * zstuzzy
 * Sat Jul 08 2023 20:27:24 GMT+0800 (GMT+08:00)
 *
 */

export class Monster extends Entity
{
    protected m_stAI: AI = null;

    public constructor(node: Node) 
    {
        super(node);
        this.CampType = CampType.Enemy;
    }

    public get AI(): AI 
    {
        return this.m_stAI;
    }

    public set AI(ai: AI)
    {
        this.m_stAI = ai;
    }

    public OnUpdate(dt: number): void 
    {
        this.m_stAI?.OnUpdate(dt);
        this.OnUpdateImp(dt);
    }

    //#region 可供子类覆盖的方法
    protected OnUpdateImp(dt: number): void
    {

    }
    //#endregion 可供子类覆盖的方法

    //#region 覆盖父类的方法
    protected override OnDie(): void 
    {
        Core.EventMgr.Emit(EventID.MONSTER_DIE, new MonsterDieMsg(this.Guid));
    }
    //#endregion 覆盖父类的方法
}