import { _decorator, Component, Node } from 'cc';
import { Weapon } from './Weapon';
import { Core } from '../../Core/Core';

/**
 * 
 * WeaponSelect
 * zstuzzy
 * Sun Jul 09 2023 11:16:27 GMT+0800 (GMT+08:00)
 *
 */

export abstract class WeaponSelect
{
    public abstract Title(): string;
    public abstract Content(): string;
    public abstract OnSelect(): void;

    protected TraverseWeaponOfFilter(traverseCb: (weapon: Weapon) => void, filterCb: (weapon: Weapon) => boolean = null) 
    {
        var mgr = Core.GameLogic.BattleMgr.WeaponMgr;
        mgr.Traverse(weapon => {
            if(filterCb == null || filterCb(weapon))
            {
                traverseCb(weapon);
            }
        });
    }
}