import React from 'react';

import type { Preview } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from '../src/styles/GlobalStyles';

import { theme } from "../src/styles/theme"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    ),
  ],
};


export default preview;
