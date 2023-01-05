import { Action, ActionPanel, Detail, Icon } from "@raycast/api";
import { Timer } from "./utils/timer";
import { UpsyDesky } from "./utils/upsydesky";

export default function Command() {
  const manager = new UpsyDesky();
  const timer = new Timer("1h");

  return (
    <Detail
      isLoading={false}
      markdown={`
# Currently Standing

Standing for past 1 hour

## Timer
Standing for 2 hours

**1 hour, 39 minutes remaining**
`}
      navigationTitle="Desk Status"
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Current Height" icon={Icon.LevelMeter} text={`${manager.getHeight().toLocaleString("en-us", { minimumIntegerDigits: 2, minimumFractionDigits: 2 })}"`} />
          <Detail.Metadata.Label title="Target Height" icon={Icon.BullsEye} text={`${manager.getHeight().toLocaleString("en-us", { minimumIntegerDigits: 2, minimumFractionDigits: 2 })}"`} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Timer" icon={Icon.Stopwatch} text={timer.getIntervalString()} />
          <Detail.Metadata.Label title="Remaining" icon={Icon.Hourglass} text={timer.getRemainingString()} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Status">
            <Detail.Metadata.TagList.Item text="Standing" color={"#eed535"} />
          </Detail.Metadata.TagList>

        </Detail.Metadata>
      }
      // todo: reorder these based on status
      actions={
        <ActionPanel title="Control desk">
          <Action title="Sit" icon={Icon.ChevronDown} onAction={() => { /* todo: this */}} />
          <Action title="Stand" icon={Icon.ChevronUp} onAction={() => { /* todo: this */}} />
        </ActionPanel>
      }
  />
  );
}