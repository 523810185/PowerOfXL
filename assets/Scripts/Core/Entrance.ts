import { _decorator, Component, Node, Prefab } from 'cc';
import { Core } from './Core';
const { ccclass, property } = _decorator;

@ccclass('Entrance')
export class Entrance extends Component 
{
    @property(Prefab)
    playerPrefab: Prefab = null;

    start() 
    {
        Core.Init(this);
    }

    update(deltaTime: number) 
    {
        Core.TickMgr.Update(deltaTime);
    }
}


