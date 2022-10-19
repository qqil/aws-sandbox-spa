import { Navbar } from "flowbite-react";
import { FC } from "react";
import { NavLink, NavLinkProps, Outlet } from "react-router-dom";

const navLinkClasses: NavLinkProps["className"] = ({ isActive }) =>
  isActive ? "underline underline-offset-8" : undefined;

const links: { name: string; to: string; end?: boolean }[] = [
  { name: "Home", to: "/", end: true },
  { name: "Products", to: "/products", end: true },
  { name: "Create product", to: "/products/create", end: true },
];

const Layout: FC = () => {
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
        </Navbar>
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
