import { _decorator, Component, Node } from 'cc';
import { PlayerMgr } from './PlayerMgr';
const { ccclass, property } = _decorator;

@ccclass('Core')
export class Core 
{
    private static m_pPlayerMgr: PlayerMgr = null;

    public static Init(): void 
    {
        this.m_pPlayerMgr = new PlayerMgr();
    }

    public static get PlayerMgr(): PlayerMgr
    {
        return this.m_pPlayerMgr;
    }
}


