import React from "react";

import { render, screen } from "@testing-library/react";
import App from "./App";

import { AssetsContextProvider } from "./contexts/Assets";

jest.mock("./contexts/Assets", () => ({
  ...jest.requireActual("./contexts/Assets"),
  useAssetsContext: () => ({
    assets: [
      {
        name: "BTC",
        balance: "1.23",
      },
      {
        name: "ETH",
        balance: "1",
      },
    ],
    refetch: jest.fn(),
  }),
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <AssetsContextProvider>{children}</AssetsContextProvider>
);

test("Renders app with asset list", () => {
  render(<App />, { wrapper: Wrapper });

  expect(screen.getByText(/BTC - 1.23/i)).toBeInTheDocument();
  expect(screen.getByText(/ETH - 1/i)).toBeInTheDocument();
});
