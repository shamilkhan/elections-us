import { BaseProvider, DarkTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import React from "react";

const engine = new Styletron();

// @ts-ignore
export const withProviders = (Component: React.ComponentType) => (props) => {
  return (
    <>
      <StyletronProvider value={engine}>
        <BaseProvider theme={DarkTheme}>
          <Component {...props} />
        </BaseProvider>
      </StyletronProvider>
    </>
  );
};
