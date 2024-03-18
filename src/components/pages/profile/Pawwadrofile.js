
import { render, screen } from "@testing-library/react";
import Profile from "./Pawwadrofile";

test('render profile page', () => {
    render(<Profile />);

    const ProfilePage = screen.getByText('Contact Details');
    expect(ProfilePage).toBeInTheDocument();
});