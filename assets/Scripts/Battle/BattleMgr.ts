import { _decorator, Component, Node } from 'cc';
import { PlayerMgr } from './Mgr/PlayerMgr';
import { EntityMgr } from './Mgr/EntityMgr';
import { WeaponMgr } from './Mgr/WeaponMgr';
import { MonsterMgr } from './Mgr/MonsterMgr';
import { WeaponSelectMgr } from './Mgr/WeaponSelectMgr';

/**
 * 
 * BattleMgr
 * zstuzzy
 * Fri Jul 07 2023 21:08:24 GMT+0800 (GMT+08:00)
 *
 */

export class BattleMgr
{
    private m_pPlayerMgr: PlayerMgr = null;
    private m_pEntityMgr: EntityMgr = null;
    private m_pWeaponMgr: WeaponMgr = null;
    private m_pMonsterMgr: MonsterMgr = null;
    private m_pWeaponSelectMgr: WeaponSelectMgr = null;

    public constructor()
    {
        this.Init();
    }

    private Init(): void 
    {
        this.m_pEntityMgr = new EntityMgr();
        this.m_pPlayerMgr = new PlayerMgr();
        this.m_pWeaponMgr = new WeaponMgr();
        this.m_pMonsterMgr = new MonsterMgr();
        this.m_pWeaponSelectMgr = new WeaponSelectMgr();
    }

    public get PlayerMgr(): PlayerMgr
    {
        return this.m_pPlayerMgr;
    }
    public get EntityMgr(): EntityMgr
    {
        return this.m_pEntityMgr;
    }
    public get WeaponMgr(): WeaponMgr
    {
        return this.m_pWeaponMgr;
    }
    public get MonsterMgr(): MonsterMgr
    {
        return this.m_pMonsterMgr;
    }
    public get WeaponSelectMgr(): WeaponSelectMgr
    {
        return this.m_pWeaponSelectMgr;
    }
}