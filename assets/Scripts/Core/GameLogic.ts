import { _decorator, Component, find, instantiate, Node } from 'cc';
import { Core } from './Core';
import { Player } from '../Battle/DataStructure/Player';
import { PlayerMgr } from '../Battle/Mgr/PlayerMgr';
import { EntityMgr } from '../Battle/Mgr/EntityMgr';

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

    private m_pPlayerMgr: PlayerMgr = null;
    private m_pEntityMgr: EntityMgr = null;

    private Init(): void 
    {
        // Mgr
        this.m_pEntityMgr = new EntityMgr();
        this.m_pPlayerMgr = new PlayerMgr();
        // 临时逻辑
        let playerNode = instantiate(Core.Entrance.playerPrefab);
        playerNode.setParent(find("Canvas"));
        let player = new Player(playerNode);
        player.Speed = 100;
        this.m_pPlayerMgr.SetPlayer(player); 
        this.m_pEntityMgr.AddEntity(player);
    }

    public get PlayerMgr(): PlayerMgr
    {
        return this.m_pPlayerMgr;
    }
    public get EntityMgr(): EntityMgr
    {
        return this.m_pEntityMgr;
    }
}