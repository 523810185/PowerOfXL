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
    public constructor(node: Node, foller: Entity) 
    {
        super(node, foller);
        this.m_stSelfNode.setScale(0, 0, 0);
    }

    protected OnUpdateImp(dt: number): void 
    {
        if(this.m_stSelfNode == null) 
        {
            return;
        }

        if(this.m_fNowTime >= 2)
        {
            this.m_fNowTime = 0;
            for(let i=0;i<12;i++) 
            {
                let speed = 500;
                var angle = i * 30;
                var radians = MathUtil.AngleToRadians(angle);
                var _vec = new Vec3(Math.sin(radians), Math.cos(radians), 0).multiplyScalar(speed);
                var newNode = instantiate(this.m_stSelfNode);
                newNode.setParent(this.m_stSelfNode.parent);
                newNode.setScale(1, 1, 1);
                newNode.setWorldPosition(this.m_stFollwer.Node.getWorldPosition());
                var bullet = new StraightBullet(newNode, this.m_stFollwer);
                bullet.LifeTime = 2;
                bullet.Dmg = 150;
                bullet.MoveVec = _vec;
                Core.GameLogic.BattleMgr.WeaponMgr.AddWeapon(bullet);
            }
        }
    }
    
}