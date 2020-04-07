import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import ProfileVaultPage from "./index";
import { Provider } from "react-redux";
import { store } from "../../../store";

describe("ProfileVaultPage render", () => {
  it("render without crash", async () => {
    let content = render(
      <Router>
        <Provider store={store}>
          <ProfileVaultPage />
        </Provider>
      </Router>
    );
    expect(content).toBeDefined();
  });
});
