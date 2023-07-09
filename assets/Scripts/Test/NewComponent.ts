import { EventKeyboard, KeyCode, Vec3, input } from 'cc';
import { macro } from 'cc';
import { find, Input } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { Core } from '../Core/Core';
import { EventID } from '../Core/EventID';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {

    @property({type:Number})
    speed = 0;

    start() {
        var a = new Vec3(1, 2, 3);
        var b = a.subtract(new Vec3(1, 1, 1));
        console.log(" a = " + a);
        console.log(" b = " + b);
        // console.log(" start ! ");
        input.on(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
    }

    OnKeyDown(e : EventKeyboard) {
        console.log("dd 11 ");
        if(e.keyCode == KeyCode.KEY_P)
        {
            console.log("dd ");
            // let pos = this.node.getPosition();
            // pos = new Vec3(pos.x, pos.y + this.speed);
            // this.node.setPosition(pos);
            Core.EventMgr.Emit(EventID.PLAYER_LV_UP, null);
        }
    }

    update(deltaTime: number) {
        
    }
}


