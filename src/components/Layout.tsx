import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: FC = () => (
  <>
    <div>This is layout</div>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </div>
    <div>
      <Outlet />
    </div>
  </>
);

export default Layout;
