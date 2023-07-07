import { _decorator, Component, Node } from 'cc';
import { XLObject } from './XLObject';

/**
 * 
 * Entity
 * zstuzzy
 * Thu Jul 06 2023 23:59:15 GMT+0800 (GMT+08:00)
 *
 */

/**
 * 所有有生命物体的基类
 */
export class Entity extends XLObject
{
    private m_stNode: Node = null;
    private m_fSpeed:number = 0;

    public constructor(node: Node)
    {
        super();
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