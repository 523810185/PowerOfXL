import { _decorator, Component, Node } from 'cc';
import { Weapon } from '../DataStructure/Weapon';
import { IUpdate } from '../../Core/TickMgr';
import { Core } from '../../Core/Core';

/**
 * 
 * WeaponMgr
 * zstuzzy
 * Fri Jul 07 2023 13:35:14 GMT+0800 (中国标准时间)
 *
 */

export class WeaponMgr implements IUpdate
{
    private m_mapWeaponMap: Map<string, Weapon> = null;

    public constructor()
    {
        this.Init();
    }

    private Init(): void 
    {
        this.m_mapWeaponMap = new Map<string, Weapon>();
        Core.TickMgr.BindTick(this);
    }

    public AddWeapon(weapon: Weapon): void
    {
        if(weapon == null || this.m_mapWeaponMap.has(weapon.Guid))
        {
            return;
        }
        
        console.log("武器被添加: " + weapon.Guid);
        this.m_mapWeaponMap.set(weapon.Guid, weapon);
    }

    public RemoveWeapon(weapon: Weapon): void 
    {
        if(weapon == null || !this.m_mapWeaponMap.has(weapon.Guid))
        {
            return;
        }

        this.m_mapWeaponMap.delete(weapon.Guid);
    }

    public Update(dt: number): void 
    {
        this.m_mapWeaponMap.forEach(weapon => {
            weapon.OnUpdate(dt);
        });
    }
}