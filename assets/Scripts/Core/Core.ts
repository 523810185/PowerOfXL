import { _decorator, Component, Node } from 'cc';
import { PlayerMgr } from './PlayerMgr';
import { GameLogic } from './GameLogic';
import { Entrance } from './Entrance';
import { InputMgr } from './InputMgr';
import { TickMgr } from './TickMgr';
const { ccclass, property } = _decorator;

@ccclass('Core')
export class Core 
{
    private static m_pEntrance: Entrance = null;
    private static m_pPlayerMgr: PlayerMgr = null;
    private static m_pGameLogic: GameLogic = null;
    private static m_pInputMgr: InputMgr = null;
    private static m_pTickMgr: TickMgr = null;

    public static Init(entrance: Entrance): void 
    {
        this.m_pEntrance = entrance;
        this.m_pPlayerMgr = new PlayerMgr();
        this.m_pGameLogic = new GameLogic();
        this.m_pTickMgr = new TickMgr();
        this.m_pInputMgr = new InputMgr();
    }

    public static get Entrance(): Entrance
    {
        return this.m_pEntrance;
    }
    public static get PlayerMgr(): PlayerMgr
    {
        return this.m_pPlayerMgr;
    }
    public static get GameLogic(): GameLogic
    {
        return this.m_pGameLogic;
    }
    public static get TickMgr(): TickMgr
    {
        return this.m_pTickMgr;
    }
}


