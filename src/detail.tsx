import { Action, ActionPanel, Detail, Icon } from "@raycast/api";
import Sit from "./sit";
import Stand from "./stand";
import { Timer } from "./utils/timer";
import { getDeskState, UpsyDesky } from "./utils/upsydesky";

export default function Command() {
  const manager = new UpsyDesky();
  const timer = new Timer("1h");

  const { isLoading: isHeightLoading, data: height, revalidate: revalidateHeight } = manager.fetchHeight();
  const { isLoading: isTargetHeightLoading, data: targetHeight, revalidate: revalidateTargetHeight } = manager.fetchTargetHeight();

  return (
    <Detail
      isLoading={isHeightLoading || isTargetHeightLoading}
      markdown={`
# Currently ${getDeskState(height).toLowerCase()}

![](state/${getDeskState(height)}@dark.png)
`}
      navigationTitle="Desk Status"
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Current Height" icon={Icon.LevelMeter} text={`${height.toLocaleString("en-us", { minimumIntegerDigits: 2, minimumFractionDigits: 2 })}"`} />
          <Detail.Metadata.Label title="Target Height" icon={Icon.BullsEye} text={`${targetHeight.toLocaleString("en-us", { minimumIntegerDigits: 2, minimumFractionDigits: 2 })}"`} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Timer" icon={Icon.Stopwatch} text={timer.getIntervalString()} />
          <Detail.Metadata.Label title="Remaining" icon={Icon.Hourglass} text={timer.getRemainingString()} />
        </Detail.Metadata>
      }
      // todo: reorder these based on status
      actions={
        <ActionPanel title="Control desk">
          <Action title="Reload" icon={Icon.RotateClockwise} onAction={() => {
            revalidateHeight(); 
            revalidateTargetHeight();
          }} />

          <Action title="Sit" icon={"sit@dark.png"} onAction={Sit} />
          <Action title="Stand" icon={"stand@dark.png"} onAction={Stand} />
        </ActionPanel>
      }
  />
  );
}