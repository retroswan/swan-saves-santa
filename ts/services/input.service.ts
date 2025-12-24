export enum Action {
    MoveRight,
    MoveLeft,
    MoveDown,
    MoveUp,
}

export enum State {
    IsDown = 1<<0,
    IsChanged = 1<<1,

    Down = IsDown,
    Up = 0,
    Pressed = Down | IsChanged,
    Released = Up | IsChanged,
}

export interface InputService {
    Update(): void;
    Get(action: Action): State;
}

let inputService: InputService;

export function CreateInputService(): InputService {
    if (!inputService) {
        inputService = new KeyboardInputService();
    }

    return inputService;
}

class KeyboardInputService implements InputService {
    private actionsToKeys: Map<Action, string> = new Map([
        [ Action.MoveRight, 'ArrowRight' ],
        [ Action.MoveLeft, 'ArrowLeft' ],
        [ Action.MoveDown, 'ArrowDown' ],
        [ Action.MoveUp, 'ArrowUp' ],
    ]);
    private keys: Map<string, State> = new Map();

    public constructor() {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            this.handleEvent(e);
        });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            this.handleEvent(e);
        });
    }

    private handleEvent(e: KeyboardEvent): void {
        this.keys.set(
            e.key,
            e.type === 'keydown'
                ? State.Pressed
                : State.Released,
        );
    }

    Update(): void {
        for (const key of this.keys.keys()) {
            this.keys.set(key, this.keys.get(key) & State.Down);
        }
    }

    Get(action: Action): State {
        const key: string = this.actionsToKeys.get(action);
        if (!key) {
            return State.Up;
        }

        return this.keys.get(key);
    }
}
