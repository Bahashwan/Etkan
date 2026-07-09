import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@backdoor_est/etkan-ui-react";

const meta: Meta<typeof Pagination> = {
  title: "Data/Pagination",
  component: Pagination,
  args: { page: 3, pageCount: 10, siblingCount: 1 },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    pageCount: { control: { type: "number", min: 1 } },
    siblingCount: { control: { type: "number", min: 0, max: 3 } },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

function Interactive(props: React.ComponentProps<typeof Pagination>) {
  const [page, setPage] = React.useState(props.page);
  return <Pagination {...props} page={page} onChange={setPage} />;
}

export const Playground: Story = {
  render: (args) => <Interactive {...args} />,
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Interactive page={1} pageCount={5} />
      <Interactive page={5} pageCount={12} />
      <Interactive page={9} pageCount={9} />
    </div>
  ),
};

export const Arabic: Story = {
  globals: { direction: "rtl" },
  render: () => (
    <div dir="rtl">
      <Interactive
        page={4}
        pageCount={12}
        label="ترقيم الصفحات"
        previousLabel="الصفحة السابقة"
        nextLabel="الصفحة التالية"
      />
    </div>
  ),
};
