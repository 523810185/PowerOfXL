import { _decorator, Component, Node } from 'cc';
import { Weapon } from '../DataStructure/Weapon';
import { IUpdate } from '../../Core/TickMgr';
import { Core } from '../../Core/Core';
import { EventID, WeaponDieMsg } from '../../Core/EventID';
import { EventMsg } from '../../Core/EventMgr';

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
        this.BindEvent();
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

    public RemoveWeaponByGuid(guid: string): void
    {
        if(guid != null && this.m_mapWeaponMap.has(guid))
        {
            this.m_mapWeaponMap.delete(guid);
        }
    }

    public RemoveWeapon(weapon: Weapon): void 
    {
        if(weapon != null) 
        {
            this.RemoveWeaponByGuid(weapon.Guid);
        }
    }

    public Traverse(cb: (weapon: Weapon) => void): void
    {
        if(cb != null) 
        {
            this.m_mapWeaponMap.forEach(weapon => {
                cb(weapon);
            });
        }
    }

    public Update(dt: number): void 
    {
        this.m_mapWeaponMap.forEach(weapon => {
            weapon.OnUpdate(dt);
        });
    }

    //#region 内部方法
    private BindEvent(): void 
    {
        Core.EventMgr.BindEvent(EventID.WEAPON_DIE, (data: EventMsg) => {
            var info = data as WeaponDieMsg;
            this.RemoveWeaponByGuid(info.guid);
        }, this);
    }
    //#endregion 内部方法
}