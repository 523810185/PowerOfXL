import { _decorator, Component, Node } from 'cc';
import { CampType, Entity } from './Entity';

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
        this.OnLVChange();
    }

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
        this.m_iMaxExp = this.m_iLV * 100;
    }
}