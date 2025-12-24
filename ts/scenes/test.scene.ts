import { Entity } from "../entities/entity";
import { Scene } from "../game/scene";

export const TestScene: Scene = (): Entity[] => {
    return [
        new Entity(),
    ];
}
