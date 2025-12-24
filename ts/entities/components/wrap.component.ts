import { Entity } from "../entity";
import { Component } from "./component";

export class WrapComponent implements Component {
    Update(entity: Entity): void {
        if (entity.x < -32) {
            entity.x += 300;
        }
    }
}
