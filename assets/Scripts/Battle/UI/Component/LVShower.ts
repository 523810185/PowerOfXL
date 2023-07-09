import { _decorator, Component, Label, Node } from 'cc';
import { Core } from '../../../Core/Core';
const { ccclass, property } = _decorator;

@ccclass('LVShower')
export class LVShower extends Component {

    @property(Label)
    lvLabel: Label = null;

    @property(Label)
    expLabel: Label = null;

    start() {

    }

    update(deltaTime: number) {
        var player = Core?.GameLogic?.BattleMgr?.PlayerMgr?.GetPlayer();
        if(player != null)
        {
            this.lvLabel.string = "等级：" + player.LV;
            this.expLabel.string = "经验值：" + player.NowExp + " / " + player.MaxExp;
        }
    }
}


