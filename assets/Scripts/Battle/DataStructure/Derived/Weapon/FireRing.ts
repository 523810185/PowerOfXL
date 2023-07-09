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
    private m_fRotateRadius: number = 0;
    private m_fAngleSpeed: number = 0;
    private m_fDmg: number = 0;
    private m_mapDmgRecorder: Set<Entity> = new Set<Entity>();
    private m_fRotAngle: number = 0;
    public constructor(node: Node, follower: Entity)
    {
        super(node, follower);
        this.m_fRotAngle = 0;
        this.ClearDmgRecorder();
    }
    
    protected OnUpdateImp(dt: number): void 
    {
        this.m_fRotAngle += dt * this.m_fAngleSpeed;
        if(this.m_fRotAngle >= 360) 
        {
            this.m_fRotAngle %= 360;
            this.ClearDmgRecorder();
        }
        var angle = this.m_fRotAngle;
        if(this.m_stFollwer != null && this.m_stSelfNode != null) 
        {
            var _radians = MathUtil.AngleToRadians(angle);
            var _sin = Math.sin(_radians);
            var _cos = Math.cos(_radians);
            var newPos = this.m_stFollwer.Node.getWorldPosition().add(new Vec3(_sin, _cos, 0).multiplyScalar(this.m_fRotateRadius));
            this.m_stSelfNode.setWorldPosition(newPos);

            // 伤害
            var mgr = Core.GameLogic.BattleMgr.EntityMgr;
            mgr.QueryEnemyInRadius(newPos, this.m_stFollwer.CampType, 60/*写死了伤害判定半径*/, _entity => {
                if(!this.m_mapDmgRecorder.has(_entity))
                {
                    this.m_mapDmgRecorder.add(_entity);
                    mgr.EntityApplyDmg(_entity.Guid, this.m_stFollwer.Guid, this.m_fDmg);
                }
            });
        }
    }

    private ClearDmgRecorder(): void 
    {
        this.m_mapDmgRecorder.clear();
    }

    public set RotateRadius(val: number)
    {
        this.m_fRotateRadius = val;
    }

    public set AngleSpeed(val: number)
    {
        this.m_fAngleSpeed = val;
    }

    public get Dmg(): number
    {
        return this.m_fDmg;
    }

    public set Dmg(val: number)
    {
        this.m_fDmg = val;
        console.log("zzy dmg = " + val);
    }
    
}