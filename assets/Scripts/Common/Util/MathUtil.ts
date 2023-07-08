import { _decorator, Component, Node, Vec3 } from 'cc';

/**
 * 
 * MathUtil
 * zstuzzy
 * Sat Jul 08 2023 21:07:55 GMT+0800 (GMT+08:00)
 *
 */

export class MathUtil
{
    public static DisOfVec3(selfPos: Vec3, targetPos: Vec3): number
    {
        var _dis = selfPos.clone().subtract(targetPos);
        _dis.z = 0;
        return _dis.length();
    }

    public static AngleToRadians(angle: number): number
    {
        var _radians = angle / 180 * Math.PI;
        return _radians; 
    }
}