import "./App.css";

function App() {

  const totalIncome = 50000;
  const totalExpense = 32000;
  const balance = totalIncome - totalExpense;

  function showMessage() {
    alert("Welcome to ExpenseAI");
  }

  return (

    <div>

      {/* NAVBAR */}

      <nav>

        <h2 id="logo">
          ExpenseAI
        </h2>

        <div id="navButtons">

          <button id="loginButton">
            Login
          </button>

          <button id="registerButton">
            Register
          </button>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section id="hero">

        <h1>
          AI Smart Expense Tracker
        </h1>

        <p>
          Track your expenses and manage your budget easily.
        </p>

        <button onClick={showMessage}>
          Get Started
        </button>

      </section>

      {/* BALANCE SECTION */}

      <section id="balanceSection">

        <div className="balanceCard">

          <h3>Total Income</h3>

          <p>₹{totalIncome}</p>

        </div>

        <div className="balanceCard">

          <h3>Total Expense</h3>

          <p>₹{totalExpense}</p>

        </div>

        <div className="balanceCard">

          <h3>Balance</h3>

          <p>₹{balance}</p>

        </div>

      </section>

      {/* CATEGORY SECTION */}

      <section id="categorySection">

        <h2>
          Expense Categories
        </h2>

        <div id="cards">

          <div className="card">

            <h3>Food</h3>

            <p>₹5000</p>

          </div>

          <div className="card">

            <h3>Travel</h3>

            <p>₹8000</p>

          </div>

          <div className="card">

            <h3>Shopping</h3>

            <p>₹12000</p>

          </div>

          <div className="card">

            <h3>Entertainment</h3>

            <p>₹7000</p>

          </div>

        </div>

      </section>

      {/* RECENT TRANSACTIONS */}

      <section id="transactionSection">

        <h2>
          Recent Transactions
        </h2>

        <table>

          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>

          <tr>
            <td>Food</td>
            <td>₹500</td>
            <td>Paid</td>
          </tr>

          <tr>
            <td>Travel</td>
            <td>₹1200</td>
            <td>Paid</td>
          </tr>

          <tr>
            <td>Shopping</td>
            <td>₹3000</td>
            <td>Pending</td>
          </tr>

        </table>

      </section>

      {/* SAVINGS GOAL */}

      <section id="goalSection">

        <h2>
          Monthly Savings Goal
        </h2>

        <div id="goalBox">

          <p>
            Goal : ₹20,000
          </p>

          <p>
            Saved : ₹18,000
          </p>

          <progress value="18000" max="20000"></progress>

        </div>

      </section>

      {/* DAILY LIMIT */}

      <section id="limitSection">

        <h2>
          Daily Expense Limit
        </h2>

        <div id="limitBox">

          <p>
            Daily Limit : ₹2000
          </p>

          <p>
            Today's Expense : ₹1500
          </p>

          <button>
            Within Limit
          </button>

        </div>

      </section>

      {/* GAMIFIED REWARD */}

      <section id="rewardSection">

        <h2>
          Savings Rewards
        </h2>

        <div id="rewardBox">

          <p>
            🎉 You saved ₹18,000 this month.
          </p>

          <p>
            🏆 Reward Level : Gold Saver
          </p>

          <p>
            ⭐ Points Earned : 450
          </p>

        </div>

      </section>

      {/* AI SUGGESTIONS */}

      <section id="suggestionSection">

        <h2>
          AI Suggestions
        </h2>

        <div id="suggestionBox">

          <p>
            ✔ Reduce shopping expenses this month.
          </p>

          <p>
            ✔ Food expenses are within budget.
          </p>

          <p>
            ✔ Great savings progress this month.
          </p>

        </div>

      </section>

      {/* FOOTER */}

      <footer>

        <p>
          © 2026 ExpenseAI
        </p>

      </footer>

    </div>

  );
}

export default App;