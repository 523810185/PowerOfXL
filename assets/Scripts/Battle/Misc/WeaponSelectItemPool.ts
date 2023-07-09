import { _decorator, Component, Node, randomRangeInt } from 'cc';
import { WeaponSelect } from '../DataStructure/WeaponSelect';
import { FireRingDmgUpper } from '../DataStructure/Derived/WeaponSelect/FireRingDmgUpper';
import { FireRingDmgRadiusUpper } from '../DataStructure/Derived/WeaponSelect/FireRingDmgRadiusUpper';
import { FireRingAngleSpeedUpper } from '../DataStructure/Derived/WeaponSelect/FireRingAngleSpeedUpper';
import { StraightEmitterDmgUpper } from '../DataStructure/Derived/WeaponSelect/StraightEmitterDmgUpper';
import { StraightEmitterEmitCntUpper } from '../DataStructure/Derived/WeaponSelect/StraightEmitterEmitCntUpper';
import { StraightEmitterEmitDurationDowner } from '../DataStructure/Derived/WeaponSelect/StraightEmitterEmitDurationDowner';

/**
 * 
 * WeaponSelectItemPool
 * zstuzzy
 * Sun Jul 09 2023 23:04:35 GMT+0800 (GMT+08:00)
 *
 */

export class WeaponSelectItemPool
{
    private m_arrPool: Array<WeaponSelect> = new Array<WeaponSelect>();
    public constructor()
    {
        this.Init();
    }

    private Init(): void 
    {
        this.m_arrPool.push(new FireRingDmgUpper(25));
        this.m_arrPool.push(new FireRingDmgRadiusUpper(10));
        this.m_arrPool.push(new FireRingAngleSpeedUpper(15));
        this.m_arrPool.push(new StraightEmitterDmgUpper(30));
        this.m_arrPool.push(new StraightEmitterEmitCntUpper(1));
        this.m_arrPool.push(new StraightEmitterEmitDurationDowner(0.3));
    }

    public GetOneItem(): WeaponSelect
    {
        let id = randomRangeInt(0, this.m_arrPool.length);
        return this.m_arrPool[id];
    }
}