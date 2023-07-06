import { _decorator, Component, Node } from 'cc';

/**
 * 
 * PlayerMgr
 * zstuzzy
 * Thu Jul 06 2023 22:49:42 GMT+0800 (中国标准时间)
 *
 */

export class PlayerMgr
{
    private m_stPlayer: Node = null;

    public SetPlayer(player: Node): void 
    {
        this.m_stPlayer = player;
    }

    public GetPlayer(): Node 
    {
        return this.m_stPlayer;
    }
}