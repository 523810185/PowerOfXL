import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node, sp, Vec2, Vec3 } from 'cc';
import { Core } from './Core';
import { IUpdate } from './TickMgr';

/**
 * 
 * InputMgr
 * zstuzzy
 * Fri Jul 07 2023 00:30:12 GMT+0800 (GMT+08:00)
 *
 */

export class InputMgr implements IUpdate
{
    public constructor()
    {
        this.Init();
    }

    //#region 内部数据
    private m_stMoveVec: Vec3 = new Vec3();
    private m_bInMove: boolean = false;
    //#endregion 内部数据

    private Init(): void 
    {
        input.on(Input.EventType.KEY_DOWN, this.OnKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.OnKeyUp, this);
        input.on(Input.EventType.KEY_PRESSING, this.OnKeyPress, this);
        Core.TickMgr.BindTick(this);
    }

    private OnKeyDown(e: EventKeyboard): void 
    {
        this.m_bInMove = true;
        this.SetMoveDir(e);
    }
    private OnKeyUp(e: EventKeyboard): void 
    {
        this.m_bInMove = false;
        this.SetMoveDir(e);
    }
    private OnKeyPress(e: EventKeyboard): void 
    {
        this.SetMoveDir(e);
    }

    private SetMoveDir(e: EventKeyboard): void 
    {
        this.m_stMoveVec.set(0, 0, 0);
        if(e.keyCode == KeyCode.KEY_W) 
        {
            this.m_stMoveVec.y = 1;
        }
        else if(e.keyCode == KeyCode.KEY_S) 
        {
            this.m_stMoveVec.y = -1;
        }
        else if(e.keyCode == KeyCode.KEY_A) 
        {
            this.m_stMoveVec.x = -1;
        }
        else if(e.keyCode == KeyCode.KEY_D) 
        {
            this.m_stMoveVec.x = 1;
        }
    }

    public Update(dt: number): void 
    {
        if(!this.m_bInMove) 
        {
            return;
        }

        let player = Core.PlayerMgr.GetPlayer();
        let speed = player.Speed;
        var node = player.Node;
        var prePos = node.getPosition();
        var moveVec = this.m_stMoveVec.clone();
        node.setPosition(prePos.add(moveVec.multiplyScalar(speed * dt)));
    }
}