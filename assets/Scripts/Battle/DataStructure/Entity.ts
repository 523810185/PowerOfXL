import { _decorator, Component, Node } from 'cc';
import { XLObject } from './XLObject';

/**
 * 
 * Entity
 * zstuzzy
 * Thu Jul 06 2023 23:59:15 GMT+0800 (GMT+08:00)
 *
 */

export enum CampType 
{
    None = 0,
    Player = 1,
    Enemy = 2,
}

/**
 * 所有有生命物体的基类
 */
export class Entity extends XLObject
{
    private m_stNode: Node = null;
    private m_fSpeed:number = 0;
    private m_fMaxHP: number = 0;
    private m_fNowHp: number = 0;
    private m_eCampType: CampType;

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

    public get NowHP(): number
    {
        return this.m_fNowHp;
    }

    public set NowHP(val: number)
    {
        this.m_fNowHp = val;
    }

    public get MaxHP(): number
    {
        return this.m_fMaxHP;
    }

    public set MaxHP(val: number)
    {
        this.m_fMaxHP = val;
    }

    public get CampType(): CampType
    {
        return this.m_eCampType;
    }

    public set CampType(val: CampType)
    {
        this.m_eCampType = val;
    }
}