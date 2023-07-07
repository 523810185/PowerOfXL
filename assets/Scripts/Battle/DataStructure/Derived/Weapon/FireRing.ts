import { _decorator, Component, Node, Vec3 } from 'cc';
import { Weapon } from '../../Weapon';
import { Entity } from '../../Entity';

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
    public constructor(node: Node, follower: Entity, radius: number)
    {
        super(node, follower);
        this.m_fRadius = radius;
    }
    
    public OnUpdateImp(dt: number): void 
    {
        var angle = this.m_fNowTime % 360;
        if(this.m_stFollwer != null && this.m_stSelfNode != null) 
        {
            var _radians = angle / 180 * Math.PI;
            var _sin = Math.sin(_radians);
            var _cos = Math.cos(_radians);
            var newPos = this.m_stFollwer.Node.getWorldPosition().add(new Vec3(_sin, _cos, 0).multiplyScalar(this.m_fRadius));
            this.m_stSelfNode.setWorldPosition(newPos);
        }
    }
    
}