import { _decorator, Component, Node } from 'cc';
import { AI } from '../../AI';
import { Entity } from '../../Entity';
import { Core } from '../../../../Core/Core';

/**
 * 
 * CustomCode
 * zstuzzy
 * Sat Jul 08 2023 20:50:28 GMT+0800 (GMT+08:00)
 *
 */

export class NormalAI extends AI
{
    protected m_stTarget: Entity = null;
    public constructor(entity: Entity) 
    {
        super(entity);
    }

    protected OnUpdateImp(dt: number): void 
    {
        this.m_stTarget = Core.GameLogic.BattleMgr.PlayerMgr.GetPlayer();
        if(this.m_stEntity != null && this.m_stTarget != null && this.m_stTarget.IsAlive())
        {
            this.m_stEntity.MoveToEntity(this.m_stTarget, dt);
        }
    }

}