import { Rect } from "../Core/Utils";
export class Entity {
    x = 0;
    y = 0;

    assetName = '';

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getAssetName() {
        return this.assetName;
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        };
    }

    draw(canvas, assetManager) {
        
        const asset = assetManager.getAsset(this.getAssetName());
        
        const drawX = this.x - asset.width / 2;
        const drawY = this.y - asset.height / 2;

        canvas.drawImage(asset, drawX, drawY, asset.width, asset.height);
    }

    getBounds(assetManager){

        const asset = assetManager.getAsset(this.getAssetName());
        
        const bound = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y + asset.height / 2
        );

        return bound;

    }

}