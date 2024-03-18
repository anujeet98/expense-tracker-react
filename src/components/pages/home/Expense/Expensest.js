
import { render, screen } from "@testing-library/react";
import Expense from "./Expense";

test('render Expense page', () => {
    render(<Expense />);

    const ExpensePage = screen.getByText('Contact Details');
    screen.
    expect(ExpensePage).toBeInTheDocument();
});