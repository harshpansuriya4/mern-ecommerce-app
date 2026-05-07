import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-2xl font-bold">
        Shop
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/cart">Cart</Link>

        {user ? (
          <>
            {user?.user?.role === "admin" && (
              <Link to="/admin">Add Items</Link>
            )}

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;