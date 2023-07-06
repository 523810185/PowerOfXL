import { _decorator, Component, find, instantiate, Node } from 'cc';
import { Core } from './Core';
import { Player } from '../Battle/DataStructure/Player';

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

    private Init(): void 
    {
        let playerNode = instantiate(Core.Entrance.playerPrefab);
        playerNode.setParent(find("Canvas"));
        let player = new Player(playerNode);
        player.Speed = 100;
        Core.PlayerMgr.SetPlayer(player); 
    }
}