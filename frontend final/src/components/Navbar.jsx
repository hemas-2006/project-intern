import { Link } from "react-router-dom";

function Navbar() {

  return (

    <div id="navbar">

      <h2>
        AI Smart Expense Tracker
      </h2>

      <div className="authBtns">

        <Link to="/login">

          <button>
            Login
          </button>

        </Link>

        <Link to="/register">

          <button>
            Register
          </button>

        </Link>

      </div>

    </div>
  );
}

export default Navbar;