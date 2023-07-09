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

export class StraightEmitterDmgUpper extends WeaponSelect
{
    private m_iUpVal: number = 0;
    public constructor(upVal: number)
    {
        super();
        this.m_iUpVal = upVal;
    }

    public Title(): string {
        return "冲击波伤害增加"
    }
    public Content(): string {
        return "伤害增加" + this.m_iUpVal;
    }

    public OnSelect(): void 
    {
        this.TraverseWeaponOfFilter(weapon => {
            var fr = weapon as StraightBulletEmitter;
            fr.Dmg += this.m_iUpVal;
        }, weapon => {
            return weapon instanceof StraightBulletEmitter;
        });
    }

}