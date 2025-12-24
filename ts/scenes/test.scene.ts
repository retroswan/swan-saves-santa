import { Entity } from "../entities/entity";
import { GoombaEntity } from "../entities/goomba.entity";
import { PlayerEntity } from "../entities/player.entity";

export function TestScene(): Entity[] {
    return [
        new PlayerEntity(),
        new GoombaEntity(256, 64),
    ];
}
