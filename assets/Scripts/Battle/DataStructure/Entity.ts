import { _decorator, Component, Node } from 'cc';

/**
 * 
 * Entity
 * zstuzzy
 * Thu Jul 06 2023 23:59:15 GMT+0800 (GMT+08:00)
 *
 */

export class Entity
{
    private m_stNode: Node = null;
    private m_fSpeed = 0;

    public constructor(node: Node) 
    {
        this.m_stNode = node;
    }

    public get Node(): Node 
    {
        return this.m_stNode;
    }

    public get Speed(): number
    {
        return this.m_fSpeed;
    }

    public set Speed(val: number) 
    {
        this.m_fSpeed = val;
    }
}