import PresetCommand from "./presetCommand";
import { getPresetForState } from "./utils/upsydesky";

export default async function Stand() {
    return PresetCommand(getPresetForState("Standing"));
}
