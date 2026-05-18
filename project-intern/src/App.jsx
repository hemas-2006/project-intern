import "./App.css";

function App() {
  return (
    <div>

      {/* NAVBAR */}

      <nav>

        <h1 id="logo">
          ExpenseAI
        </h1>

        <ul id="menu">

          <li>Home</li>
          <li>Dashboard</li>
          <li>Budget</li>
          <li>Reports</li>
          <li>Profile</li>

        </ul>

        <div id="navButtons">

          <button id="loginButton">
            Login
          </button>

          <button id="signupButton">
            Sign Up
          </button>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section id="heroSection">

        <div id="heroText">

          <h1>
            AI Smart Expense<br/> 
            & Budget Tracker
          </h1>

          <p>
            Track your daily expenses, manage budgets,
            monitor savings and get smart AI suggestions
            for better financial planning.
          </p>

          <div id="heroButtons">

            <button id="startButton">
              Get Started
            </button>

            <button id="learnButton">
              Learn More
            </button>

          </div>

        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2489/2489756.png"
          alt="expense"
        />

      </section>

      {/* FEATURES SECTION */}

      <section id="featureSection">

        <h2>
          Smart Features
        </h2>

        <div id="featureContainer">

          <div className="card">

            <h3>Expense Tracking</h3>

            <p>
              Easily track daily expenses and spending.
            </p>

            <button>
              View
            </button>

          </div>

          <div className="card">

            <h3>Budget Planning</h3>

            <p>
              Set monthly budget limits and save money.
            </p>

            <button>
              View
            </button>

          </div>

          <div className="card">

            <h3>AI Suggestions</h3>

            <p>
              Get smart tips to improve your savings.
            </p>

            <button>
              View
            </button>

          </div>

          <div className="card">

            <h3>Reports</h3>

            <p>
              Analyze monthly spending with reports.
            </p>

            <button>
              View
            </button>

          </div>

        </div>

      </section>

      {/* ANALYTICS SECTION */}

      <section id="analyticsSection">

        <h2>
          Monthly Overview
        </h2>

        <div id="analyticsContainer">

          <div className="analyticsCard">

            <h3>Total Income</h3>

            <p>₹45,000</p>

          </div>

          <div className="analyticsCard">

            <h3>Total Expenses</h3>

            <p>₹28,000</p>

          </div>

          <div className="analyticsCard">

            <h3>Total Savings</h3>

            <p>₹17,000</p>

          </div>

          <div className="analyticsCard">

            <h3>Budget Left</h3>

            <p>₹10,000</p>

          </div>

        </div>

      </section>

      {/* RECENT TRANSACTIONS */}

      <section id="transactionSection">

        <h2>
          Recent Transactions
        </h2>

        <table>

          <thead>

            <tr>

              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>Food</td>
              <td>₹1200</td>
              <td>Completed</td>

            </tr>

            <tr>

              <td>Travel</td>
              <td>₹2500</td>
              <td>Completed</td>

            </tr>

            <tr>

              <td>Shopping</td>
              <td>₹1800</td>
              <td>Pending</td>

            </tr>

          </tbody>

        </table>

      </section>

      {/* AI SUGGESTION */}

      <section id="suggestionSection">

        <h2>
          AI Smart Suggestions
        </h2>

        <div id="suggestionBox">

          <p>
            ✔ Reduce shopping expenses this month.
          </p>

          <p>
            ✔ Your savings increased by 15%.
          </p>

          <p>
            ✔ You are within your monthly budget.
          </p>

        </div>

      </section>

      {/* FOOTER */}

      <footer>

        <p>
          © 2026 ExpenseAI | Smart Budget Tracker
        </p>

      </footer>

    </div>
  );
}

export default App;