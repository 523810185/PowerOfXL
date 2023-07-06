import { _decorator, Component, Node } from 'cc';
import { Core } from './Core';
const { ccclass, property } = _decorator;

@ccclass('Entrance')
export class Entrance extends Component 
{
    start() 
    {
        Core.Init();
    }

    update(deltaTime: number) 
    {
        
    }
}


