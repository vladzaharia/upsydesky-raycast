import { showToast, Toast } from "@raycast/api";

export default async function Command() {
    const success = false;

    if (success) {
        await showToast({ title: "Success!", message: "Set desk to standing mode" });
    } else {
        await showToast({
            style: Toast.Style.Failure,
            title: "Something went wrong",
            message: "Couldn't set desk to standing mode",
        });
    }
}
