import { _decorator, Component, find, instantiate, Node } from 'cc';
import { BattleMgr } from '../Battle/BattleMgr';

/**
 * 
 * GameLogic
 * zstuzzy
 * Fri Jul 07 2023 00:06:00 GMT+0800 (GMT+08:00)
 *
 */

export class GameLogic
{
    public constructor()
    {
        this.Init();
    }

    private m_pBattleMgr: BattleMgr = null;

    private Init(): void 
    {
        // Mgr
        this.m_pBattleMgr = new BattleMgr();
    }

    public get BattleMgr(): BattleMgr
    {
        return this.m_pBattleMgr;
    }

}