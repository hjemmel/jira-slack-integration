import { Issue } from "../controllers/webhook/interface";
import {
  IncomingWebhook,
  IncomingWebhookResult,
  IncomingWebhookSendArguments
} from "@slack/webhook";

export class SlackService {
  CUSTOM_STORY_POINTS_FIELD: string =
    process.env.CUSTOM_STORY_POINTS_FIELD || "customfield_10113";

  sendToSlack(issue: Issue, sprint: string): Promise<IncomingWebhookResult> {
    const url = process.env.SLACK_WEBHOOK_URL;
    const jiraURL = process.env.JIRA_URL || "";
    const webhook = new IncomingWebhook(url!, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      icon_emoji: process.env.EMOJI || ":bowtie:"
    });

    return webhook.send(this.buildIncomingWebhook(issue, sprint, jiraURL));
  }

  buildIncomingWebhook(
    issue: Issue,
    sprint: string,
    jiraURL: string
  ): IncomingWebhookSendArguments {
    return {
      text: `${issue.user.displayName} added an issue to ${sprint}`,
      attachments: [
        {
          fallback: `${issue.user.displayName} added <${jiraURL}/browse/${issue.key}|${issue.key}: ${issue.fields.summary}> to ${sprint}`,
          color: "#0052CC",
          title: `<${jiraURL}/browse/${issue.key}|${issue.key}: ${issue.fields.summary}>`,
          // eslint-disable-next-line @typescript-eslint/camelcase
          author_name: `${issue.user.displayName}`,
          // eslint-disable-next-line @typescript-eslint/camelcase
          author_link: `mailto:${issue.user.displayName} <${issue.user.emailAddress}>`,
          footer: "Slack Jira Integration",
          fields: [
            {
              title: "Type",
              value: `${issue.fields.issuetype.name}`,
              short: true
            },
            {
              title: "Story Points",
              value: `${issue.fields[this.CUSTOM_STORY_POINTS_FIELD]}`,
              short: true
            },
            {
              title: "Priority",
              value: `${issue.fields.priority.name}`,
              short: true
            },
            {
              title: "Labels",
              value: issue.fields.labels.join(", "),
              short: true
            }
          ]
        }
      ]
    };
  }
}

export default new SlackService();
