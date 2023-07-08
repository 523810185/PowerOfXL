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
    public constructor(node: Node) 
    {
        super(node);
        this.CampType = CampType.Player;
    }
}