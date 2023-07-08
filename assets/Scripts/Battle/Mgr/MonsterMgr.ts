import { _decorator, Component, Node } from 'cc';
import { Monster } from '../DataStructure/Monster';
import { Core } from '../../Core/Core';
import { IUpdate } from '../../Core/TickMgr';
import { EntityDieMsg, EventID } from '../../Core/EventID';
import { EventMsg } from '../../Core/EventMgr';

/**
 * 
 * MonsterMgr
 * zstuzzy
 * Sat Jul 08 2023 21:49:29 GMT+0800 (GMT+08:00)
 *
 */

export class MonsterMgr implements IUpdate
{
    private m_mapMonsterMap: Map<string, Monster> = null;

    public constructor()
    {
        this.Init();
    }

    private Init(): void 
    {
        this.m_mapMonsterMap = new Map<string, Monster>();
        Core.TickMgr.BindTick(this);
        this.BindEvent();
    }

    public AddMonster(monster: Monster): void
    {
        if(monster == null || this.m_mapMonsterMap.has(monster.Guid))
        {
            return;
        }
        
        this.m_mapMonsterMap.set(monster.Guid, monster);
    }

    public RemoveMonsterByGuid(guid: string): void
    {
        if(guid != null && this.m_mapMonsterMap.has(guid)) 
        {
            this.m_mapMonsterMap.delete(guid);
        }
    }

    public RemoveMonster(monster: Monster): void 
    {
        if(monster != null)
        {
            this.RemoveMonsterByGuid(monster.Guid);
        }
    }

    public Update(dt: number): void 
    {
        this.m_mapMonsterMap.forEach(monster => {
            monster.OnUpdate(dt);
        });
    }

    //#region 内部方法
    private BindEvent(): void 
    {
        Core.EventMgr.BindEvent(EventID.ENTITY_DIE, (data: EventMsg) => {
            var info = data as EntityDieMsg;
            this.RemoveMonsterByGuid(info.guid);
        }, this);
    }
    //#endregion 内部方法
}