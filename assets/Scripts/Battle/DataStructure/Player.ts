import { _decorator, Component, Node } from 'cc';
import { CampType, Entity } from './Entity';
import { Core } from '../../Core/Core';
import { EventID, MonsterDieMsg } from '../../Core/EventID';

/**
 * 
 * Player
 * zstuzzy
 * Thu Jul 06 2023 23:59:27 GMT+0800 (GMT+08:00)
 *
 */

export class Player extends Entity
{
    private m_iLV: number;
    private m_iNowExp: number;
    private m_iMaxExp: number;

    public constructor(node: Node) 
    {
        super(node);
        this.CampType = CampType.Player;
        this.m_iLV = 1;
        this.m_iNowExp = 0;
        this.m_iMaxExp = this.m_iLV * 100; // 先写死
        // this.OnLVChange();
        this.BindEvent();
    }

    //#region 属性get&set
    public get LV(): number
    {
        return this.m_iLV;
    }

    public get NowExp(): number
    {
        return this.m_iNowExp;
    }

    public get MaxExp(): number
    {
        return this.m_iMaxExp;
    }
    //#endregion 属性get&set

    public GainExp(exp: number): void 
    {
        this.m_iNowExp += exp;
        for(let i=0;i<10000;i++) // 防止死循环
        {
            if(this.m_iNowExp >= this.m_iMaxExp)
            {
                this.m_iNowExp -= this.m_iNowExp;
                this.m_iLV++;
                this.OnLVChange();
            }
        }
    }

    protected OnLVChange(): void 
    {
        this.m_iMaxExp = this.m_iLV * 100; // 先写死
        Core.EventMgr.Emit(EventID.PLAYER_LV_UP, null);
    }

    private BindEvent(): void 
    {
        Core.EventMgr.BindEvent(EventID.MONSTER_DIE, data => {
            this.GainExp(20);
        }, this);
    }
}