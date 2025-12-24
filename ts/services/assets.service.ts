export interface SpriteSheetJson {}

export interface AssetsService {
    Init(): void;
    GetTexture(id: string): HTMLImageElement;
}

let assetsService: AssetsService;

export function CreateAssetsService(): AssetsService {
    if (!assetsService) {
        assetsService = new HtmlAssetsService();
    }

    return assetsService;
}

class HtmlAssetsService implements AssetsService {
    private readonly images: Map<string, SpriteSheetJson> = new Map<string, SpriteSheetJson>([
        [ 'sprites-16x16', null ],
    ]);

    public async Init() {
        const promises: Promise<void>[] = [];

        // Load images
        promises.push(...[ ...this.images.keys() ].map((asset: string) => {
            return new Promise<void>((resolve) => {
                const img = document.createElement('img');
                img.src = `./assets/${asset}.png`;
                img.id = asset;
                img.onload = () => resolve();

                document.body.appendChild(img);
            });
        }));

        // Load JSON
        promises.push(...[ ...this.images.keys() ].map((asset: string) => {
            return new Promise<void>(async (resolve) => {
                const request = await fetch(`./assets/${asset}.json`);
                const data = await request.json();
                this.images.set(asset, data);
                console.log(data);

                resolve();
            });
        }));

        await Promise.all(promises);
    }

    public GetTexture(id: string): HTMLImageElement {
        return document.getElementById(id) as HTMLImageElement;
    }
}
