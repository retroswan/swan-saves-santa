import { Game } from "./game/game";

window.addEventListener('load', async () => {
    const game: Game = new Game();

    await game.Init();
});
