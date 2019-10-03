import { Application } from "express";
import webhookRouter from "./api/controllers/webhook/router";
export default function routes(app: Application): void {
  app.use("/api/v1/webhook", webhookRouter);
}
