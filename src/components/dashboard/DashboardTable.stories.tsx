import type { Meta, StoryObj } from "@storybook/react";
import DashboardTable from "./DashboardTable";
import Badge from "./Badge";

type Order = {
  id: string;
  product: string;
  price: string;
  total: number;
  amount: number;
};

const columns = [
  { key: "id", header: "Tracking no", align: "left" as const },
  { key: "product", header: "Product Name", align: "left" as const },
  { key: "price", header: "Price", align: "left" as const },
  {
    key: "amount",
    header: "Total Order",
    align: "left" as const,
    render: (value: unknown) => <Badge variant="status">{String(value)}</Badge>,
  },
  { key: "total", header: "Total Amount", align: "right" as const },
];

const sampleData: Order[] = [
  { id: "#876364", product: "Camera Lens", price: "$178", total: 146660, amount: 325 },
  { id: "#876368", product: "Black Sleep Dress", price: "$14", total: 46660, amount: 53 },
  { id: "#876412", product: "Argan Oil", price: "$21", total: 346676, amount: 78 },
];

const getRowKey = (row: Order) => row.id;

const meta = {
  title: "Dashboard/DashboardTable",
  component: DashboardTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[700px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DashboardTable<Order>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithData: Story = {
  args: {
    columns,
    data: sampleData,
    getRowKey,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    getRowKey,
    emptyMessage: "주문 내역이 없습니다.",
  },
};
