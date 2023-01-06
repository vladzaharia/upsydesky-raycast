import { getPreferenceValues } from "@raycast/api";

interface PreferenceValues {
  baseUrl: string;
}

export class Preferences {
    private static _instance: Preferences;
    public static Instance() {
        if (!this._instance) {
            this._instance = new Preferences();
        }

        return this._instance;
    }

    private _preferences: PreferenceValues;

    constructor() {
        this._preferences = this.updatePreferenceValues();
    }

    public updatePreferenceValues(): PreferenceValues {
        const preferences = getPreferenceValues<PreferenceValues>();
        return this._preferences = preferences;
    }

    public getPreferenceValues(): PreferenceValues {
        return this._preferences;
    }

    public getPreferenceValue<T = string>(index: keyof PreferenceValues): T {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (this._preferences as any)[index];
    }
}