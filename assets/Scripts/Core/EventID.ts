import { _decorator, Component, Node } from 'cc';
import { EventMsg } from './EventMgr';

/**
 * 
 * EventID
 * zstuzzy
 * Fri Jul 07 2023 22:09:03 GMT+0800 (GMT+08:00)
 *
 */

export enum EventID
{
    /**单位收到伤害 */
    ENTITY_APPLY_DMG = 1,
    /**单位死亡 */
    ENTITY_DIE = 2,
    /**武器消失 */
    WEAPON_DIE = 3,
}

export class EntityApplyDmgData extends EventMsg
{
    public targetGuid: string = null;
    public sourceGuid: string = null;
    public dmg: number = 0;
    public constructor(targetGuid: string, sourceGuid: string, dmg: number) 
    {
        super();
        this.targetGuid = targetGuid;
        this.sourceGuid = sourceGuid;
        this.dmg = dmg;
    }
}

export class EntityDieMsg extends EventMsg
{
    public guid: string = null;
    public constructor(guid: string)
    {
        super();
        this.guid = guid;
    }
}

export class WeaponDieMsg extends EventMsg
{
    public guid: string = null;
    public constructor(guid: string)
    {
        super();
        this.guid = guid;
    }
}