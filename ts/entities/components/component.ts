import { Entity } from "../entity";

export interface Component {
    Update(entity: Entity): void;
}
