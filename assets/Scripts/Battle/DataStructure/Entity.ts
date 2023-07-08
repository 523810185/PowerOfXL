import { _decorator, Component, Node, Vec3 } from 'cc';
import { XLObject } from './XLObject';
import { Core } from '../../Core/Core';
import { EntityDieMsg, EventID } from '../../Core/EventID';
import { EventMsg } from '../../Core/EventMgr';

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

    //#region 属性get&set

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
        if(this.m_fNowHp <= 0) 
        {
            this.Die();
        }
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

    //#endregion 属性get&set

    //#region 对外方法

    public IsAlive(): boolean 
    {
        return this.m_fNowHp > 0;
    }

    public MoveToEntity(entity: Entity, dt: number): boolean
    {
        if(entity.Node == null) 
        {
            return false;
        }

        return this.MoveToPos(entity.Node.getWorldPosition(), dt);
    }

    public ApplyDmg(dmg: number): void
    {
        this.m_fNowHp -= dmg;
        if(this.m_fNowHp <= 0) 
        {
            this.Die();
        }
    }

    /**
     * 向目标位置移动，返回是否已经到达终点
     * @param targetPos 
     * @param dt 
     */
    public MoveToPos(targetPos: Vec3, dt: number): boolean
    {
        if(this.m_stNode == null || this.m_fSpeed <= 0) 
        {
            return false;
        }

        var _vec = targetPos.clone().subtract(this.m_stNode.getWorldPosition());
        var _dis = _vec.length();
        if(_dis <= this.m_fSpeed * dt) 
        {
            this.m_stNode.setWorldPosition(targetPos);
            return true;
        }
        else 
        {
            var _moveVec = _vec.clone().normalize();
            var _toPos = this.m_stNode.getWorldPosition().add(_moveVec.multiplyScalar(dt * this.m_fSpeed));
            this.m_stNode.setWorldPosition(_toPos);
            return false;
        }
    }

    //#endregion 对外方法

    //#region 内部方法
    private Die(): void 
    {
        this.m_stNode?.destroy();
        Core.EventMgr.Emit(EventID.ENTITY_DIE, new EntityDieMsg(this.Guid));
    }
    //#endregion 内部方法
}