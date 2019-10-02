import Promise from "bluebird";
import L from "../../common/logger";
import { Issue } from "../controllers/webhook/interface";
import SlackService from "./slack.service";

export class JiraService {
  SPRINT_FIELD = "Sprint";
  CUSTOM_SPRINT_FIELD: string =
    process.env.CUSTOM_SPRINT_FIELD || "customfield_10910";

  create(issue: Issue): Promise<boolean> {
    L.info(`Parsing issue ${issue.key}`);

    const sprintChanged = issue.changelog.items.find(
      item => item.field === this.SPRINT_FIELD
    );
    const addedToActiveSprint = this.sprintChangedToActiveSprint(
      issue.fields[this.CUSTOM_SPRINT_FIELD]
    );

    if (!sprintChanged) {
      L.info("No Sprint change");
    } else if (sprintChanged.to === "") {
      L.info(`${issue.key} removed from ${sprintChanged.fromString}`);
    } else if (addedToActiveSprint) {
      L.info(
        `${issue.key} added to an active sprint: ${sprintChanged.toString}`
      );
      SlackService.sendToSlack(issue, sprintChanged.toString);
    } else {
      L.info(`${issue.key} added to a closed or future sprint`);
    }

    return Promise.resolve(true);
  }

  /*
   * Take an array of sprints (strings) and if you find one where state=active
   * then return true.
   */
  sprintChangedToActiveSprint(sprints: string[]) {
    // its possible there are no sprints
    if (!sprints) {
      return false;
    }

    for (let i = 0; i < sprints.length; i++) {
      if (sprints[i].includes("state=ACTIVE")) {
        return true;
      } else if (i === sprints.length - 1) {
        return false;
      }
    }
  }
}

export default new JiraService();
