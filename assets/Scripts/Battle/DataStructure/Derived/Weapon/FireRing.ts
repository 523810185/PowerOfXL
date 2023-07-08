import { _decorator, Component, Node, Vec3 } from 'cc';
import { Weapon } from '../../Weapon';
import { Entity } from '../../Entity';
import { Core } from '../../../../Core/Core';
import { MathUtil } from '../../../../Common/Util/MathUtil';

/**
 * 
 * FireRing
 * zstuzzy
 * Fri Jul 07 2023 13:19:36 GMT+0800 (中国标准时间)
 *
 */

export class FireRing extends Weapon
{
    private m_fRadius: number = 0;
    private m_fAngleSpeed: number = 0;
    private m_fDmg: number = 0;
    private m_mapDmgTimeRecorder: Map<Entity, number> = new Map<Entity, number>();
    public constructor(node: Node, follower: Entity)
    {
        super(node, follower);
    }
    
    protected OnUpdateImp(dt: number): void 
    {
        var angle = this.m_fNowTime * this.m_fAngleSpeed % 360;
        if(this.m_stFollwer != null && this.m_stSelfNode != null) 
        {
            var _radians = MathUtil.AngleToRadians(angle);
            var _sin = Math.sin(_radians);
            var _cos = Math.cos(_radians);
            var newPos = this.m_stFollwer.Node.getWorldPosition().add(new Vec3(_sin, _cos, 0).multiplyScalar(this.m_fRadius));
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
                    this.m_mapDmgTimeRecorder.set(_entity, 0.3); // 临时写死伤害CD
                }
            });
        }
    }

    public set Radius(val: number)
    {
        this.m_fRadius = val;
    }

    public set AngleSpeed(val: number)
    {
        this.m_fAngleSpeed = val;
    }

    public set Dmg(val: number)
    {
        this.m_fDmg = val;
    }
    
}