import { _decorator, Component, instantiate, Node, Vec3 } from 'cc';
import { Weapon } from '../../Weapon';
import { Entity } from '../../Entity';
import { MathUtil } from '../../../../Common/Util/MathUtil';
import { StraightBullet } from './StraightBullet';
import { Core } from '../../../../Core/Core';

/**
 * 
 * StraightBulletEmitter
 * zstuzzy
 * Sat Jul 08 2023 23:04:35 GMT+0800 (GMT+08:00)
 *
 */

export class StraightBulletEmitter extends Weapon
{
    private m_fDmg: number = 0;
    private m_iEmitCnt: number = 0;
    private m_fEmitDuration: number = 9999;
    public constructor(node: Node, foller: Entity) 
    {
        super(node, foller);
        this.m_stSelfNode.setScale(0, 0, 0);
    }

    protected OnUpdateImp(dt: number): void 
    {
        if(this.m_stSelfNode == null || this.m_iEmitCnt < 1) 
        {
            return;
        }

        if(this.m_fNowTime >= this.m_fEmitDuration)
        {
            this.m_fNowTime = 0;
            let step = 360 / this.m_iEmitCnt;
            for(let i=0;i<this.m_iEmitCnt;i++) 
            {
                let speed = 500;
                var angle = i * step;
                var radians = MathUtil.AngleToRadians(angle);
                var _vec = new Vec3(Math.sin(radians), Math.cos(radians), 0).multiplyScalar(speed);
                var newNode = instantiate(this.m_stSelfNode);
                newNode.setParent(this.m_stSelfNode.parent);
                newNode.setScale(1, 1, 1);
                newNode.setWorldPosition(this.m_stFollwer.Node.getWorldPosition());
                var bullet = new StraightBullet(newNode, this.m_stFollwer);
                bullet.LifeTime = 2;
                bullet.Dmg = this.m_fDmg;
                bullet.MoveVec = _vec;
                Core.GameLogic.BattleMgr.WeaponMgr.AddWeapon(bullet);
            }
        }
    }

    public set Dmg(val: number)
    {
        this.m_fDmg = val;
    }

    public get Dmg(): number
    {
        return this.m_fDmg;
    }

    public set EmitDuration(val: number) 
    {
        val = Math.max(val, 0.25); // 写死最低发射间隔
        this.m_fEmitDuration = val;
    }

    public get EmitDuration(): number
    {
        return this.m_fEmitDuration;
    }

    public set EmitCnt(val: number) 
    {
        val = Math.min(val, 36); // 写死最大发射个数
        this.m_iEmitCnt = val;
    }

    public get EmitCnt(): number
    {
        return this.m_iEmitCnt;
    }
    
}