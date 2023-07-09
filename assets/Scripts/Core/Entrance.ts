import { _decorator, Component, Node, Prefab } from 'cc';
import { Core } from './Core';
import { TestDemo } from '../Test/TestDemo';
const { ccclass, property } = _decorator;

@ccclass('Entrance')
export class Entrance extends Component 
{
    @property(Prefab)
    playerPrefab: Prefab = null;

    @property(Prefab)
    fireRingPerfab: Prefab = null;

    @property(Prefab)
    monsterPerfab: Prefab = null;

    @property(Prefab)
    straightBulletPerfab: Prefab = null;

    @property(Prefab)
    selectWeaponPrefab: Prefab = null;

    start() 
    {
        Core.Init(this);
        // 临时逻辑
        new TestDemo();
    }

    update(deltaTime: number) 
    {
        Core.TickMgr.Update(deltaTime);
    }
}


