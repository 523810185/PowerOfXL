import { _decorator, Component, Node, Vec3 } from 'cc';
import { CampType, Entity } from '../DataStructure/Entity';
import { Core } from '../../Core/Core';
import { EntityApplyDmgData, EntityDieMsg, EventID } from '../../Core/EventID';
import { EventMsg } from '../../Core/EventMgr';

/**
 * 
 * EntityMgr
 * zstuzzy
 * Fri Jul 07 2023 10:12:49 GMT+0800 (中国标准时间)
 *
 */

export class EntityMgr
{
    private m_mapEntityMap: Map<string, Entity> = null;

    public constructor()
    {
        this.m_mapEntityMap = new Map<string, Entity>();
        this.BindEvent();
    }

    public AddEntity(entity: Entity): void
    {
        if(entity == null || this.m_mapEntityMap.has(entity.Guid))
        {
            return;
        }
        
        console.log("单位被添加: " + entity.Guid);
        this.m_mapEntityMap.set(entity.Guid, entity);
    }

    public RemoveEntityByGuid(guid: string): void
    {
        if(guid != null && this.m_mapEntityMap.has(guid)) 
        {
            this.m_mapEntityMap.delete(guid);
        }
    }

    public RemoveEntity(entity: Entity): void
    {
        if(entity != null) 
        {
            this.RemoveEntityByGuid(entity.Guid);
        }
    }

    public GetEntity(guid: string): Entity
    {
        if(guid == null || !this.m_mapEntityMap.has(guid))
        {
            return null;
        }

        return this.m_mapEntityMap.get(guid);
    }

    public EntityApplyDmg(targetGuid: string, sourceGuid: string, dmg: number): void
    {
        var entity = this.GetEntity(targetGuid);
        if(entity != null) 
        {
            entity.ApplyDmg(dmg);
            console.log(entity.Guid + " .. " + entity.NowHP);
            Core.EventMgr.Emit(EventID.ENTITY_APPLY_DMG, new EntityApplyDmgData(targetGuid, sourceGuid, dmg));
        }
    }

    public QueryEnemyInRadius(worldPos: Vec3, queryCamp: CampType, radius: number, cb: (entity: Entity) => void) 
    {
        this.m_mapEntityMap.forEach(entity => {
            var node = entity.Node;
            if(node != null && queryCamp != entity.CampType) 
            {
                var vec = node.getWorldPosition().subtract(worldPos);
                vec.z = 0;
                var dis = vec.length();
                if(dis <= radius) 
                {
                    cb(entity);
                }
            } 
        });
    }

    //#region 内部方法
    private BindEvent(): void 
    {
        Core.EventMgr.BindEvent(EventID.ENTITY_DIE, (data: EventMsg) => {
            var info = data as EntityDieMsg;
            this.RemoveEntityByGuid(info.guid);
        }, this);
    }
    //#endregion 内部方法
}