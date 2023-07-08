import { _decorator, Component, Node } from 'cc';
import { CampType, Entity } from './Entity';
import { AI } from './AI';
import { IUpdate } from '../../Core/TickMgr';

/**
 * 
 * Monster
 * zstuzzy
 * Sat Jul 08 2023 20:27:24 GMT+0800 (GMT+08:00)
 *
 */

export class Monster extends Entity
{
    protected m_stAI: AI = null;

    public constructor(node: Node) 
    {
        super(node);
        this.CampType = CampType.Enemy;
    }

    public get AI(): AI 
    {
        return this.m_stAI;
    }

    public set AI(ai: AI)
    {
        this.m_stAI = ai;
    }

    public OnUpdate(dt: number): void 
    {
        this.m_stAI?.OnUpdate(dt);
        this.OnUpdateImp(dt);
    }

    protected OnUpdateImp(dt: number): void
    {

    }
}