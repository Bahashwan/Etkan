import * as React from "react";
import type { Decorator, Preview } from "@storybook/react";

import "@backdoor/etkan-ui-tokens";

/** Apply dir + theme to <html> so tokens/base.css sees them exactly like a real app. */
const withDirectionAndTheme: Decorator = (Story, context) => {
  const dir = context.globals.direction ?? "ltr";
  const theme = context.globals.theme ?? "light";
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("dir", dir);
    root.setAttribute("data-theme", theme);
    root.setAttribute("lang", dir === "rtl" ? "ar" : "en");
  }, [dir, theme]);
  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    direction: {
      description: "Language direction",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "ltr", title: "EN · LTR" },
          { value: "rtl", title: "AR · RTL" },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { direction: "ltr", theme: "light" },
  decorators: [withDirectionAndTheme],
  parameters: {
    layout: "centered",
    backgrounds: { disable: true },
  },
};

export default preview;
