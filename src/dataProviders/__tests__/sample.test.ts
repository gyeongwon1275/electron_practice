import { truthy } from "../sample";

describe("smaple test", () => {
  it("sample boolean test!", () => {
    expect(truthy()).toBeTruthy();
    expect(false).toBeFalsy();
  });
});
