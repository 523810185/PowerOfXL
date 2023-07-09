import { _decorator, Component, find, instantiate, Label, Node, randomRange, randomRangeInt, Vec3 } from 'cc';
import { Core } from '../../Core/Core';
import { EventID } from '../../Core/EventID';
import { IUpdate } from '../../Core/TickMgr';
import { FireRingDmgUpper } from '../DataStructure/Derived/WeaponSelect/FireRingDmgUpper';
import { WeaponSelect } from '../DataStructure/WeaponSelect';
import { WeaponSelectItemPool } from '../Misc/WeaponSelectItemPool';

/**
 * 
 * WeaponSelectMgr
 * zstuzzy
 * Sun Jul 09 2023 11:48:16 GMT+0800 (GMT+08:00)
 *
 */

export class WeaponSelectMgr implements IUpdate
{
    private m_iSelectEventCnt = 0;
    private m_fLastTimeScale = 1;
    private m_stUIRootNode: Node = null;
    private m_bOnSelect: boolean = false;
    private m_stWeaponSelectItemPool: WeaponSelectItemPool = null;
    public constructor()
    {
        this.Init();
    }

    private Init(): void 
    {
        Core.TickMgr.BindNoScaleTick(this);
        this.BindEvent();
        this.m_stUIRootNode = new Node("SelectWeaponUIRoot");
        this.m_stUIRootNode.setParent(find("Canvas/TopUILayer"));
        this.m_stUIRootNode.setPosition(0, 0, 1); // z高一点，显示在上面
        this.m_stWeaponSelectItemPool = new WeaponSelectItemPool();
    }

    private BindEvent(): void 
    {
        Core.EventMgr.BindEvent(EventID.PLAYER_LV_UP, data => {
            this.PushSelectEvent();
        }, this);
    }

    private PushSelectEvent()
    {
        this.m_iSelectEventCnt++;
    }

    private ShowUI(selectCnt: number): void 
    {
        if(this.m_bOnSelect) 
        {
            return;
        }
        this.m_bOnSelect = true;
        
        this.m_fLastTimeScale = Core.TickMgr.TimeScale;
        Core.TickMgr.TimeScale = 0;
        this.m_stUIRootNode.setScale(1, 1, 1);

        var needCnt = selectCnt - this.m_stUIRootNode.children.length;
        for(var i=0;i<needCnt;i++)
        {
            var newNode = instantiate(Core.Entrance.selectWeaponPrefab);
            newNode.setParent(this.m_stUIRootNode);
        }

        var nowPosX = 0;
        var sign = 1;
        var dis = 270;
        var step = dis;
        if(selectCnt % 2 == 0)
        {
            nowPosX = dis / 2;
        }

        let children = this.m_stUIRootNode.children;
        for(let i=0;i<children.length;i++) 
        {
            let child = children[i];
            if(i >= selectCnt)
            {
                child.setScale(Vec3.ZERO);
                continue;
            }
            
            child.setScale(Vec3.ONE);
            child.setPosition(nowPosX, 0, 0);
            sign *= -1;
            nowPosX += step * sign;
            step += dis;

            // 临时代码
            let weaponSelectData = this.m_stWeaponSelectItemPool.GetOneItem();
            
            let title = child.getChildByName("title");
            title.getComponent(Label).string = weaponSelectData.Title();
            let content = child.getChildByName("content");
            content.getComponent(Label).string = weaponSelectData.Content();
            let btn = child.getChildByName("select");
            btn.once(Node.EventType.TOUCH_END, e => {
                weaponSelectData.OnSelect();
                this.CloseUI();
                // 还有事件的话就接着Show
                if(this.m_iSelectEventCnt > 0) 
                {
                    this.ShowUI(3);
                }
            }, this);
        }
    }

    private CloseUI(): void 
    {
        if(!this.m_bOnSelect)
        {
            return;
        }
        this.m_bOnSelect = false;

        // 取消掉所有事件绑定
        let children = this.m_stUIRootNode.children;
        for(let i=0;i<children.length;i++)
        {
            let child = children[i];
            let btn = child.getChildByName("select");
            btn.off(Node.EventType.TOUCH_END);
        }

        Core.TickMgr.TimeScale = this.m_fLastTimeScale;
        this.m_stUIRootNode.setScale(0, 0, 0);
        this.m_iSelectEventCnt--;
    }

    Update(dt: number): void 
    {
        // for(let i=0;i<100;i++) 
        {
            if(this.m_iSelectEventCnt > 0) 
            {
                this.ShowUI(3);
            }
            else 
            {
                // break;
            }
        }
    }
}