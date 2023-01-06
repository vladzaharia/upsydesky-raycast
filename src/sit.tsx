import PresetCommand from "./presetCommand";
import { getPresetForState } from "./utils/upsydesky";

export default async function Sit() {
    return PresetCommand(getPresetForState("Sitting"));
}
