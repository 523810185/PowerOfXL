import { EventKeyboard, KeyCode, Vec3, input } from 'cc';
import { macro } from 'cc';
import { find, Input } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class NewComponent extends Component {

    @property({type:Number})
    speed = 0;

    start() {
        console.log(" start ! ");
        input.on(Input.EventType.KEY_PRESSING, this.OnKeyDown, this);
    }

    OnKeyDown(e : EventKeyboard) {
        console.log("dd 11 ");
        if(e.keyCode == KeyCode.KEY_W)
        {
            console.log("dd ");
            let pos = this.node.getPosition();
            pos = new Vec3(pos.x, pos.y + this.speed);
            this.node.setPosition(pos);
        }
    }

    update(deltaTime: number) {
        
    }
}


