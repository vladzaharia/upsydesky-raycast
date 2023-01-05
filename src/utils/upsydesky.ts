import { Preferences } from "./preferences";

export class UpsyDesky {
    private _height = 0.0;
    private _preferences: Preferences = Preferences.Instance();

    public getHeight(): number {
        return this._height;
    }

    public getStatus(): DeskStatus {
        return isStanding(this._height);
    }
}

function isStanding(height: number): DeskStatus {
    if (height > 32) {
        return "standing";
    }

    return "sitting"
}

export type DeskStatus = "standing" | "sitting";