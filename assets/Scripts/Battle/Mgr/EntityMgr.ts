import { _decorator, Component, Node } from 'cc';
import { Entity } from '../DataStructure/Entity';

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
}