import { _decorator, Component, Node } from 'cc';
import { XLObject } from './XLObject';
import { Entity } from './Entity';
import { Core } from '../../Core/Core';
import { EventID, WeaponDieMsg } from '../../Core/EventID';

/**
 * 
 * Weapon
 * zstuzzy
 * Fri Jul 07 2023 13:15:23 GMT+0800 (中国标准时间)
 *
 */

export abstract class Weapon extends XLObject
{
    protected m_stSelfNode: Node = null;
    protected m_stFollwer: Entity = null;
    protected m_fNowTime: number = 0;
    public constructor(node: Node, follower: Entity)
    {
        super();
        this.m_stSelfNode = node;
        this.m_stFollwer = follower;
        this.m_fNowTime = 0;
    }

    public get Follower(): Entity
    {
        return this.m_stFollwer;
    }

    public OnUpdate(dt: number): void
    {
        this.m_fNowTime += dt;
        this.OnUpdateImp(dt);
    }

    protected abstract OnUpdateImp(dt: number): void;

    protected Die(): void 
    {
        this.m_stSelfNode.destroy();
        Core.EventMgr.Emit(EventID.WEAPON_DIE, new WeaponDieMsg(this.Guid));
    }
}