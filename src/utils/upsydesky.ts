import { useFetch, usePromise } from "@raycast/utils";
import { UseCachedPromiseReturnType } from "@raycast/utils/dist/types";
import { Preferences } from "./preferences";

export class UpsyDesky {
    private _height = 0.0;
    private _targetHeight = 0.0;
    private _preferences: Preferences = Preferences.Instance();

    public getHeight(): number {
        return this._height;
    }

    public fetchHeight(): UseCachedPromiseReturnType<number, number> {
        const url = `${this._preferences.getPreferenceValue("baseUrl")}/sensor/desk_height`;
        const result = useFetch<number, number>(url, {
            parseResponse: async (res) => JSON.parse(await res.text()).value,
            initialData: 0
        });

        this._height = result.data;
        return result;
    }

    private async _fetchHeightHookless(): Promise<number> {
        const url = `${this._preferences.getPreferenceValue("baseUrl")}/sensor/desk_height`;
        const res = await fetch(url);
        return JSON.parse(await res.text()).value;
    }

    public getTargetHeight(): number {
        return this._targetHeight;
    }

    public fetchTargetHeight(): UseCachedPromiseReturnType<number, number> {
        const url = `${this._preferences.getPreferenceValue("baseUrl")}/number/target_desk_height`;
        const result = useFetch<number, number>(url, {
            parseResponse: async (res) => JSON.parse(await res.text()).value,
            initialData: 0
        });

        this._height = result.data;
        return result;
    }

    public async moveToPreset(preset: Preset) {
        const url = `${this._preferences.getPreferenceValue("baseUrl")}/button/desk_preset_${preset}/press`;
        const result = await fetch(url, {
            method: "POST"
        });

        if (result.ok) {
            this._targetHeight = getPresetTargets(preset);
        }

        return result;
    }

    public async checkIfFinishedMoving(prevHeight = this._height): Promise<boolean> {
        const newHeight = await this._fetchHeightHookless();

        if (newHeight === prevHeight || newHeight === this._targetHeight) {
            return true;
        }

        await new Promise(r => setTimeout(r, 1000));

        return this.checkIfFinishedMoving(newHeight);
    }
}

export function getPresetForState(state: DeskState): Preset {
    // TODO: Make all these generic
    if (state === "Sitting") {
        return 1;
    } else {
        return 2;
    }
}

function getPresetTargets(preset: Preset): number {
    // TODO: Make all these generic
    switch (preset) {
        case 1:
            return 30.1;
        case 2: 
            return 41.2;
        case 3:
            return 43.4;
        case 4:
            return 37.2;
    }
}

export function getDeskState(height: number): DeskState {
    if (height > 32) {
        return "Standing";
    }

    return "Sitting"
}

export type DeskState = "Standing" | "Sitting";
export type Preset = 1 | 2 | 3 | 4;