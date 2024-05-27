import 'bootstrap/dist/css/bootstrap.min.css';
import { withConsole } from "@storybook/addon-console";
/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [(storyFn, context) => withConsole()(storyFn)(context), ]
};

export default preview;
