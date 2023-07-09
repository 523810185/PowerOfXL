import { _decorator, Component, Node } from 'cc';
import { WeaponSelect } from '../../WeaponSelect';
import { FireRing } from '../Weapon/FireRing';

/**
 * 
 * FireRingDmgUpper
 * zstuzzy
 * Sun Jul 09 2023 11:31:41 GMT+0800 (GMT+08:00)
 *
 */

export class FireRingAngleSpeedUpper extends WeaponSelect
{
    private m_iUpVal: number = 0;
    public constructor(upVal: number)
    {
        super();
        this.m_iUpVal = upVal;
    }

    public Title(): string {
        return "旋火轮转速增加"
    }
    public Content(): string {
        return "转速增加" + this.m_iUpVal + "度每秒";
    }

    public OnSelect(): void 
    {
        this.TraverseWeaponOfFilter(weapon => {
            var fr = weapon as FireRing;
            fr.AngleSpeed += this.m_iUpVal;
        }, weapon => {
            return weapon instanceof FireRing;
        });
    }

}