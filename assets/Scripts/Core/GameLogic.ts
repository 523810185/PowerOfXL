import { _decorator, Component, find, instantiate, Node } from 'cc';
import { Core } from './Core';
import { Player } from '../Battle/DataStructure/Player';
import { BattleMgr } from '../Battle/BattleMgr';
import { FireRing } from '../Battle/DataStructure/Derived/Weapon/FireRing';

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
        // 临时逻辑
        let playerNode = instantiate(Core.Entrance.playerPrefab);
        playerNode.setParent(find("Canvas"));
        let player = new Player(playerNode);
        player.Speed = 100;
        this.m_pBattleMgr.PlayerMgr.SetPlayer(player); 
        this.m_pBattleMgr.EntityMgr.AddEntity(player);
        var fireRingNode = instantiate(Core.Entrance.fireRingPerfab);
        fireRingNode.setParent(find("Canvas"));
        let weapon = new FireRing(fireRingNode, player, 200, 60);
        this.m_pBattleMgr.WeaponMgr.AddWeapon(weapon);
    }

    public get BattleMgr(): BattleMgr
    {
        return this.m_pBattleMgr;
    }

}