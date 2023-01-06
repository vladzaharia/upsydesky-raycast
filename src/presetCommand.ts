import { showToast, Toast } from "@raycast/api";
import { Preset, UpsyDesky } from "./utils/upsydesky";

export default async function PresetCommand(preset: Preset) {
    const manager = new UpsyDesky();
    const toast = await showToast({
        style: Toast.Style.Animated,
        title: "Updating chair position",
        message: "Sending request..."
    });
    
    try {
        const response = await manager.moveToPreset(preset);

        if (response.ok) {
            toast.message = "Waiting for chair to finish...";

            await new Promise(r => setTimeout(r, 1000));

            await manager.checkIfFinishedMoving();
            toast.style = Toast.Style.Success;
            toast.message = "Finished moving!";
        } else {
            throw new Error("Something went wrong");
        }
    } catch (e) {
        let message = 'Unknown Error'
        if (e instanceof Error) message = e.message
      
        toast.style = Toast.Style.Failure;
        toast.title = "Something went wrong";
        toast.message = message;
    }
}
