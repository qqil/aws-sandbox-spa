import { Button, Navbar } from "flowbite-react";
import { FC } from "react";
import { NavLink, NavLinkProps, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const navLinkClasses: NavLinkProps["className"] = ({ isActive }) =>
  isActive ? "underline underline-offset-8" : undefined;

const links: { name: string; to: string; end?: boolean }[] = [
  { name: "Home", to: "/", end: true },
  { name: "Products", to: "/products", end: true },
  { name: "Create product", to: "/products/create", end: true },
  { name: "Import", to: "/import" },
];

const MainLayout: FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header className="container mx-auto mt-2">
        <Navbar fluid={true} rounded={true} border={true}>
          <Navbar.Brand>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              My Cloud Store!
            </span>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            {links.map(({ name, to, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} className={navLinkClasses}>
                  {name}
                </NavLink>
              </li>
            ))}
          </Navbar.Collapse>
          {!user && (
            <Button onClick={() => navigate("/auth/login")}>Login</Button>
          )}
          {user && (
            <Button onClick={() => logout({ redirectTo: "/" })}>Logout</Button>
          )}
        </Navbar>
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
