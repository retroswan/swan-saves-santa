import { Action, CreateInputService, InputService, State } from "../../services/input.service";
import { Entity } from "../entity";
import { Component } from "./component";

export abstract class DirectorComponent implements Component {
    public state: Map<Action, boolean> = new Map();

    public Update(entity: Entity): void {
        this.stateLogic();

        if (this.state.get(Action.MoveRight)) {
            entity.x++;
        }

        if (this.state.get(Action.MoveLeft)) {
            entity.x--;
        }

        if (this.state.get(Action.MoveDown)) {
            entity.y++;
        }

        if (this.state.get(Action.MoveUp)) {
            entity.y--;
        }
    }

    protected abstract stateLogic(): void;
}

export class GoombaDirectorComponent extends DirectorComponent {
    protected override stateLogic(): void {
        this.state.set(Action.MoveLeft, true);
    }
}

export class PlayerDirectorComponent extends DirectorComponent {
    public constructor(
        private inputService: InputService = CreateInputService(),
    ) {
        super();
    }

    protected override stateLogic(): void {
        this.state.set(Action.MoveRight, Boolean(this.inputService.Get(Action.MoveRight) & State.Down));
        this.state.set(Action.MoveLeft, Boolean(this.inputService.Get(Action.MoveLeft) & State.Down));
        this.state.set(Action.MoveDown, Boolean(this.inputService.Get(Action.MoveDown) & State.Down));
        this.state.set(Action.MoveUp, Boolean(this.inputService.Get(Action.MoveUp) & State.Down));
    }
}
