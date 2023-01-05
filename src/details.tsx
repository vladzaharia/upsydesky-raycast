import { Action, ActionPanel, Detail, Icon } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown={`
## Currently Standing

Standing for 1 hour
      `}
      navigationTitle="Desk Status"
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Height" text={`31.00"`} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Status">
            <Detail.Metadata.TagList.Item text="Standing" color={"#eed535"} />
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
      // todo: reorder these based on 
      actions={
        <ActionPanel title="Control desk">
          <Action title="Sit" icon={Icon.ChevronDown} onAction={() => { /* todo: this */}} />
          <Action title="Stand" icon={Icon.ChevronUp} onAction={() => { /* todo: this */}} />
        </ActionPanel>
      }
  />
  );
}