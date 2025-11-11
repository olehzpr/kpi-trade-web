# Test Suite Documentation

This directory contains integration tests and test utilities for the KPI Trade application.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- path/to/test.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="Product"
```

## Test Structure

### Unit Tests
Unit tests are colocated with the source files:
- `src/lib/utils.test.ts` - Utility function tests
- `src/utils/uploadImage.test.ts` - Image upload tests
- `src/schemas/createProductFormSchema.test.ts` - Form validation tests
- `src/services/api/**/*.test.ts` - API service tests
- `src/hooks/**/*.test.ts` - Custom hook tests
- `src/store/**/*.test.ts` - Zustand store tests
- `src/components/**/*.test.tsx` - Component tests

### Integration Tests
Integration tests are in `src/__tests__/integration/`:
- `products.integration.test.tsx` - End-to-end product feature tests

### Test Utilities
Test utilities are in `src/test-utils/`:
- `setup.ts` - Jest setup and global mocks
- `mocks.ts` - Mock data and factories
- `test-wrapper.tsx` - React Query test wrapper

## Test Coverage

### Current Coverage Areas

#### 1. Utility Functions
- `cn()` class name merging utility
- `uploadImage()` file upload function

#### 2. Form Schemas
- Product creation form validation
- All validation rules (title, description, price, image)

#### 3. API Services
- **Auth API**: login, register, refresh, logout, getMe
- **Products API**: getProducts, getProduct, createProduct
- All error handling and response validation

#### 4. Custom Hooks
- `useProducts` - Product fetching with filters
- Query invalidation and caching

#### 5. State Management
- `useProductFilters` - Filter state management
- State persistence across component instances

#### 6. Context
- `AuthContext` - Authentication flow
- Token refresh logic
- Interceptor setup/cleanup

#### 7. Components
- `Button` - All variants and sizes
- `Filters` - Product filtering UI

#### 8. Integration Tests
- Product listing flow
- Product filtering (category, price, name)
- Product detail fetching
- Product creation
- Pagination
- Sorting
- Error handling

## Writing New Tests

### Unit Test Example

```typescript
import { myFunction } from "./myFunction";

describe("myFunction", () => {
  it("does something correctly", () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });
});
```

### Component Test Example

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders and handles interaction", async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("Result")).toBeInTheDocument();
  });
});
```

### Hook Test Example

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { useMyHook } from "./useMyHook";
import { TestWrapper } from "@/test-utils/test-wrapper";

describe("useMyHook", () => {
  it("fetches data successfully", async () => {
    const { result } = renderHook(() => useMyHook(), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
  });
});
```

## Mocking

### Mocking API Calls

```typescript
import { api } from "@/lib/api";

jest.mock("@/lib/api");

const mockedApi = api as jest.Mocked<typeof api>;

mockedApi.get.mockResolvedValueOnce({ data: mockData });
```

### Mocking Next.js Router

Already configured in `src/test-utils/setup.ts`. No additional setup needed.

### Using Mock Data

```typescript
import { mockUser, mockProduct, mockCategories } from "@/test-utils/mocks";

// Use in your tests
expect(result).toEqual(mockProduct);
```

## Best Practices

1. **Test Behavior, Not Implementation**
   - Test what the user sees/does, not internal state

2. **Use Descriptive Test Names**
   - Bad: `it("works")`
   - Good: `it("displays error message when form validation fails")`

3. **Arrange-Act-Assert Pattern**
   ```typescript
   // Arrange
   const input = "test";

   // Act
   const result = myFunction(input);

   // Assert
   expect(result).toBe(expected);
   ```

4. **Clean Up After Tests**
   ```typescript
   beforeEach(() => {
     jest.clearAllMocks();
   });
   ```

5. **Test Edge Cases**
   - Empty inputs
   - Error states
   - Loading states
   - Null/undefined values

6. **Use `waitFor` for Async Operations**
   ```typescript
   await waitFor(() => {
     expect(result.current.isSuccess).toBe(true);
   });
   ```

## Troubleshooting

### Tests Timing Out
- Increase timeout: `jest.setTimeout(10000)`
- Ensure mocks are properly configured
- Check for unresolved promises

### React Query Tests Failing
- Use `TestWrapper` for hooks using React Query
- Wait for query to complete with `waitFor`
- Clear query cache between tests

### Component Tests Not Finding Elements
- Use `screen.debug()` to see rendered output
- Check if element is hidden or not yet rendered
- Use correct query methods (getBy, findBy, queryBy)

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro)
- [Testing React Query](https://tanstack.com/query/latest/docs/framework/react/guides/testing)
