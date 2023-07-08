import { _decorator, Component, Node } from 'cc';
import { Entity } from './Entity';

/**
 * 
 * AI
 * zstuzzy
 * Sat Jul 08 2023 20:30:58 GMT+0800 (GMT+08:00)
 *
 */

export abstract class AI
{
    protected m_stEntity: Entity = null;

    public constructor(entity: Entity)
    {
        this.m_stEntity = entity;
    }

    public OnUpdate(dt: number): void
    {
        this.OnUpdateImp(dt);
    }

    protected abstract OnUpdateImp(dt: number): void;
}