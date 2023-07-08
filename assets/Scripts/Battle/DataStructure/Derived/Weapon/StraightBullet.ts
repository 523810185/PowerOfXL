import { _decorator, Component, Node, Vec3 } from 'cc';
import { Weapon } from '../../Weapon';
import { Entity } from '../../Entity';
import { Core } from '../../../../Core/Core';

/**
 * 
 * StraightBullet
 * zstuzzy
 * Sat Jul 08 2023 22:51:44 GMT+0800 (GMT+08:00)
 *
 */

export class StraightBullet extends Weapon
{
    private m_stMoveVec: Vec3;
    private m_fDmg: number = 0;
    private m_fLifeTime: number = 0;
    private m_mapDmgTimeRecorder: Map<Entity, number> = new Map<Entity, number>();
    public constructor(node: Node, follower: Entity)
    {
        super(node, follower);
    }

    protected OnUpdateImp(dt: number): void 
    {
        if(this.m_stFollwer != null && this.m_stSelfNode != null) 
        {
            var newPos = this.m_stSelfNode.getWorldPosition().add(this.m_stMoveVec.clone().multiplyScalar(dt));
            this.m_stSelfNode.setWorldPosition(newPos);

            // 伤害CD
            this.m_mapDmgTimeRecorder.forEach((lastVal: number, entity: Entity) => {
                this.m_mapDmgTimeRecorder.set(entity, lastVal - dt);
            });
            // 伤害
            var mgr = Core.GameLogic.BattleMgr.EntityMgr;
            mgr.QueryEnemyInRadius(newPos, this.m_stFollwer.CampType, 60/*写死了伤害判定半径*/, _entity => {
                if(!this.m_mapDmgTimeRecorder.has(_entity))
                {
                    this.m_mapDmgTimeRecorder.set(_entity, 0);
                }

                if(this.m_mapDmgTimeRecorder.get(_entity) <= 0) 
                {
                    mgr.EntityApplyDmg(_entity.Guid, this.m_stFollwer.Guid, this.m_fDmg);
                    this.m_mapDmgTimeRecorder.set(_entity, 0.5); // 临时写死伤害CD
                }
            });
        }

        if(this.m_fNowTime >= this.m_fLifeTime) 
        {
            this.Die();
        }
    }

    public set Dmg(val: number)
    {
        this.m_fDmg = val;
    }

    public set MoveVec(val: Vec3)
    {
        this.m_stMoveVec = val;
        this.m_stMoveVec.z = 0;
    }

    public set LifeTime(val: number)
    {
        this.m_fLifeTime = val;
    }
}