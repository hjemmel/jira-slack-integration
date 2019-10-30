import request from "supertest";
import Server from "../../../..";

describe("Webhook", () => {
  it("should get all examples", done =>
    request(Server)
      .post("/api/v1/webhook")
      .send({ name: "tobi" })
      .then(r => {
        expect(r.body).toBeInstanceOf(Array);
        expect(r.status).toBe(400);
        expect(r.body).toHaveLength(2);
        done();
      }));
});
