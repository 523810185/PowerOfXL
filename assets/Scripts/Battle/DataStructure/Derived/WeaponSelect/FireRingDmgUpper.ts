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

export class FireRingDmgUpper extends WeaponSelect
{
    private m_iDmgUp: number = 0;
    public constructor(dmgUp: number)
    {
        super();
        this.m_iDmgUp = dmgUp;

        this.debugCnt = FireRingDmgUpper.iii;
        FireRingDmgUpper.iii++;
    }

    public Title(): string {
        return "旋火轮伤害增加"
    }
    public Content(): string {
        return "伤害增加" + this.m_iDmgUp;
    }

    public OnSelect(): void 
    {
        this.TraverseWeaponOfFilter(weapon => {
            var fr = weapon as FireRing;
            console.log(" OnSelect " + this.m_iDmgUp);
            fr.Dmg += this.m_iDmgUp;
        }, weapon => {
            return weapon instanceof FireRing;
        });
    }

    public debugCnt: number;
    public static iii: number = 0;
    
}