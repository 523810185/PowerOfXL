import { _decorator, Component, Node } from 'cc';
import { WeaponSelect } from '../../WeaponSelect';
import { StraightBulletEmitter } from '../Weapon/StraightBulletEmitter';

/**
 * 
 * FireRingDmgUpper
 * zstuzzy
 * Sun Jul 09 2023 11:31:41 GMT+0800 (GMT+08:00)
 *
 */

export class StraightEmitterEmitDurationDowner extends WeaponSelect
{
    private m_fDownVal: number = 0;
    public constructor(downVal: number)
    {
        super();
        this.m_fDownVal = downVal;
    }

    public Title(): string {
        return "冲击波发射间隔降低"
    }
    public Content(): string {
        return "发射间隔降低" + this.m_fDownVal;
    }

    public OnSelect(): void 
    {
        this.TraverseWeaponOfFilter(weapon => {
            var fr = weapon as StraightBulletEmitter;
            fr.EmitDuration -= this.m_fDownVal;
        }, weapon => {
            return weapon instanceof StraightBulletEmitter;
        });
    }

}