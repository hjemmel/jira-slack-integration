import JiraService from "../../services/jira.service";
import {Request, Response} from "express";
import HttpStatus from "http-status-codes";
import {Issue} from "./interface";

export class Controller {
    webhook(req: Request, res: Response): void {
        const issue = {
            ...req.body.issue,
            changelog: {...req.body.changelog},
            user: {...req.body.user}
        } as Issue;
        JiraService.webhook(issue).then(() => res.status(HttpStatus.OK).end())
            .catch(() => res.status(HttpStatus.BAD_REQUEST).json({message: "Webhook Failed"}).end());
    }
}

export default new Controller();
