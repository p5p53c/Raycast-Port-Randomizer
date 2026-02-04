import { Action, ActionPanel, Detail, Icon } from "@raycast/api";
import { useState } from "react";

const MIN_PORT = 1024;
const MAX_PORT = 65535;

function generatePort() {
  return Math.floor(Math.random() * (MAX_PORT - MIN_PORT + 1)) + MIN_PORT;
}

export default function Command() {
  const [port, setPort] = useState(() => generatePort());

  const markdown = [
    `# \`${port}\``,
    ``,
    `## Port Randomizer`,
    ``,
    `---`,
    ``,
    `**Actions**`,
    ``,
    `- Press **Return ↩** to copy`,
    `- Press **⌘ R** to regenerate`,
  ].join("\n");

  return (
    <Detail
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Port" text={String(port)} icon={Icon.Clipboard} />
          <Detail.Metadata.Label title="Range" text={`${MIN_PORT}–${MAX_PORT}`} icon={Icon.BarChart} />
          <Detail.Metadata.Label title="Type" text="Ephemeral" icon={Icon.Bolt} />
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Port" content={String(port)} />
          <Action
            title="Regenerate Port"
            shortcut={{ modifiers: ["cmd"], key: "r" }}
            onAction={() => setPort(generatePort())}
          />
        </ActionPanel>
      }
    />
  );
}
