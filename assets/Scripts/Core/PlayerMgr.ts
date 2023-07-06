import { _decorator, Component, Node } from 'cc';
import { Player } from '../Battle/DataStructure/Player';

/**
 * 
 * PlayerMgr
 * zstuzzy
 * Thu Jul 06 2023 22:49:42 GMT+0800 (中国标准时间)
 *
 */

export class PlayerMgr
{
    private m_stPlayer: Player = null;

    public SetPlayer(player: Player): void 
    {
        this.m_stPlayer = player;
    }

    public GetPlayer(): Player 
    {
        return this.m_stPlayer;
    }
}