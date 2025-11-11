import { render, screen } from "@testing-library/react";
import Filters from "./filters";
import { mockCategories } from "@/test-utils/mocks";
import { useProductFilters } from "@/store/useProductFilters";

// Mock Radix UI components that have complex interactions
jest.mock("@radix-ui/react-slider", () => ({
  Root: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Track: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Range: (props: any) => <div {...props} />,
  Thumb: (props: any) => <div {...props} />,
}));

describe("Filters", () => {
  beforeEach(() => {
    // Reset store before each test
    useProductFilters.setState({
      categoryId: undefined,
      sortBy: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      name: undefined,
      sort: "createdAt,asc",
    });
  });

  it("renders filters component", () => {
    render(<Filters categories={mockCategories} />);

    expect(screen.getByText("Фільтри")).toBeInTheDocument();
    expect(screen.getByText("Категорії")).toBeInTheDocument();
    expect(screen.getByText("Ціна")).toBeInTheDocument();
    expect(screen.getByText("Статус")).toBeInTheDocument();
  });

  it("renders all categories", () => {
    render(<Filters categories={mockCategories} />);

    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it("renders price slider with default range", () => {
    render(<Filters categories={mockCategories} />);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  it("renders status checkboxes", () => {
    render(<Filters categories={mockCategories} />);

    expect(screen.getByLabelText("New items")).toBeInTheDocument();
    expect(screen.getByLabelText("Featured")).toBeInTheDocument();
    expect(screen.getByLabelText("On Sale")).toBeInTheDocument();
  });

  it("renders apply filters button", () => {
    render(<Filters categories={mockCategories} />);

    expect(
      screen.getByRole("button", { name: "Apply Filters" })
    ).toBeInTheDocument();
  });

  it("applies price filters when button is clicked", () => {
    render(<Filters categories={mockCategories} />);

    const applyButton = screen.getByRole("button", { name: "Apply Filters" });
    applyButton.click();

    const state = useProductFilters.getState();
    expect(state.minPrice).toBe(0);
    expect(state.maxPrice).toBe(1000);
  });

  it("renders without categories", () => {
    render(<Filters />);

    expect(screen.getByText("Фільтри")).toBeInTheDocument();
    expect(screen.getByText("Категорії")).toBeInTheDocument();
  });

  it("has sticky positioning", () => {
    const { container } = render(<Filters categories={mockCategories} />);
    const card = container.querySelector(".sticky");
    expect(card).toBeInTheDocument();
  });
});
