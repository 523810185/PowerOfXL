import { _decorator, Component, find, instantiate, Node, random, randomRange, Vec3 } from 'cc';
import { Core } from '../Core/Core';
import { Player } from '../Battle/DataStructure/Player';
import { FireRing } from '../Battle/DataStructure/Derived/Weapon/FireRing';
import { Monster } from '../Battle/DataStructure/Monster';
import { NormalAI } from '../Battle/DataStructure/Derived/AI/NormalAI';
import { IUpdate } from '../Core/TickMgr';
import { StraightBulletEmitter } from '../Battle/DataStructure/Derived/Weapon/StraightBulletEmitter';

/**
 * 
 * TestDemo
 * zstuzzy
 * Sat Jul 08 2023 21:59:40 GMT+0800 (GMT+08:00)
 *
 */

export class TestDemo implements IUpdate
{
    public constructor()
    {
        this.Init();
        this.m_fNowTime = 0;
        Core.TickMgr.BindTick(this);
    }

    private m_fNowTime: number = 0;
    Update(dt: number): void 
    {
        this.m_fNowTime += dt;
        if(this.m_fNowTime >= 3) 
        {
            this.m_fNowTime = 0;
            for(let i=0;i<5;i++) 
            {
                this.CreateMonster();
            }
        }
    }

    private Init(): void 
    {
        // player
        let playerNode = instantiate(Core.Entrance.playerPrefab);
        playerNode.setParent(find("Canvas"));
        let player = new Player(playerNode);
        player.Speed = 100;
        player.NowHP = 100;
        Core.GameLogic.BattleMgr.PlayerMgr.SetPlayer(player); 
        Core.GameLogic.BattleMgr.EntityMgr.AddEntity(player);
        // weapon
        var fireRingNode = instantiate(Core.Entrance.fireRingPerfab);
        fireRingNode.setParent(find("Canvas"));
        let weapon = new FireRing(fireRingNode, player);
        weapon.Radius = 200;
        weapon.AngleSpeed = 270;
        weapon.Dmg = 100;
        Core.GameLogic.BattleMgr.WeaponMgr.AddWeapon(weapon);

        var bulletEmitterNode = instantiate(Core.Entrance.straightBulletPerfab);
        bulletEmitterNode.setParent(find("Canvas"));
        let bulletEmitter = new StraightBulletEmitter(bulletEmitterNode, player);
        Core.GameLogic.BattleMgr.WeaponMgr.AddWeapon(bulletEmitter);
    }

    private CreateMonster(): void 
    {
        var monsterNode = instantiate(Core.Entrance.monsterPerfab);
        monsterNode.setParent(find("Canvas"));
        var monster = new Monster(monsterNode);
        monster.AI = new NormalAI(monster);
        Core.GameLogic.BattleMgr.EntityMgr.AddEntity(monster);
        Core.GameLogic.BattleMgr.MonsterMgr.AddMonster(monster);
        monster.Speed = 30;
        monster.NowHP = 300;
        monster.Node.setPosition(new Vec3(
            randomRange(-300, 300),
            randomRange(-300, 300),
            0
        ));
    }
}