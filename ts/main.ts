import { CreateRenderService, RenderService } from "./services/render.service";

window.addEventListener('load', () => {
    const service: RenderService = CreateRenderService();
    service.DrawSprite();
});
