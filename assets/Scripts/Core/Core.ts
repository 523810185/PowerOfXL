import { _decorator, Component, Node } from 'cc';
import { GameLogic } from './GameLogic';
import { Entrance } from './Entrance';
import { InputMgr } from './InputMgr';
import { TickMgr } from './TickMgr';
import { EventMgr } from './EventMgr';
const { ccclass, property } = _decorator;

@ccclass('Core')
export class Core 
{
    private static m_pEntrance: Entrance = null;
    private static m_pGameLogic: GameLogic = null;
    private static m_pInputMgr: InputMgr = null;
    private static m_pTickMgr: TickMgr = null;
    private static m_pEventMgr: EventMgr = null;

    public static Init(entrance: Entrance): void 
    {
        this.m_pEntrance = entrance;
        this.m_pEventMgr = new EventMgr();
        this.m_pTickMgr = new TickMgr();
        this.m_pGameLogic = new GameLogic();
        this.m_pInputMgr = new InputMgr();
    }

    public static get Entrance(): Entrance
    {
        return this.m_pEntrance;
    }
    public static get GameLogic(): GameLogic
    {
        return this.m_pGameLogic;
    }
    public static get TickMgr(): TickMgr
    {
        return this.m_pTickMgr;
    }
    public static get EventMgr(): EventMgr
    {
        return this.m_pEventMgr;
    }
}


