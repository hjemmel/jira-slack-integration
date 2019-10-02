import JiraService from "../../services/jira.service";
import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { Issue } from "./interface";

export class Controller {
  create(req: Request, res: Response): void {
    const issue = {
      ...req.body.issue,
      changelog: { ...req.body.changelog },
      user: { ...req.body.user }
    } as Issue;
    JiraService.create(issue).then(() => res.status(HttpStatus.OK).end());
  }
}

export default new Controller();
