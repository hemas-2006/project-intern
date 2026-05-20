import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

import { useState, useEffect } from "react";

function App() {

  /* MAIN STATES */

  const [totalIncome, setTotalIncome] =
  useState("");

  const [totalExpense, setTotalExpense] =
  useState("");

  const [food, setFood] =
  useState("");

  const [travel, setTravel] =
  useState("");

  const [shopping, setShopping] =
  useState("");

  const [entertainment, setEntertainment] =
  useState("");

  const [suggestion, setSuggestion] =
  useState("");

  const [incomeError, setIncomeError] =
  useState("");

  const [expenseError, setExpenseError] =
  useState("");

  const [successMessage,
  setSuccessMessage] =
  useState("");

  /* TASK / TRANSACTION STATES */

  const [transactions,
  setTransactions] =
  useState([]);

  const [editId,
  setEditId] =
  useState(null);

  const [alertMessage,
  setAlertMessage] =
  useState("");

  const balance =

  (Number(totalIncome) || 0)
  -
  (Number(totalExpense) || 0);

  const totalCategoryExpense =

  (Number(food) || 0)
  +
  (Number(travel) || 0)
  +
  (Number(shopping) || 0)
  +
  (Number(entertainment) || 0);

  /* AI SUGGESTION */

  useEffect(() => {

    if(Number(shopping) > 5000){

      setSuggestion(
        "🛍 Shopping expenses are high. Try reducing shopping this month."
      );
    }

    else if(Number(travel) > 4000){

      setSuggestion(
        "✈ Travel expenses are increasing."
      );
    }

    else if(Number(food) > 3000){

      setSuggestion(
        "🍔 Food expenses are slightly high."
      );
    }

    else if(balance < 0){

      setSuggestion(
        "⚠ Expenses exceeded income."
      );
    }

    else{

      setSuggestion(
        "✅ Your expenses are under control."
      );
    }

  }, [
    food,
    travel,
    shopping,
    entertainment,
    balance
  ]);

  /* ALERTS */

  useEffect(() => {

    if(totalCategoryExpense > 10000){

      setAlertMessage(
        "⚠ Alert : Monthly expenses are too high!"
      );
    }

    else if(balance < 0){

      setAlertMessage(
        "🚨 Warning : Expense exceeded income!"
      );
    }

    else{

      setAlertMessage(
        "✅ Financial status is good."
      );
    }

  }, [
    totalCategoryExpense,
    balance
  ]);

  /* VALIDATION */

  function handleIncome(e){

    const value = e.target.value;

    setTotalIncome(value);

    if(value === ""){

      setIncomeError(
        "Please enter income"
      );

      setSuccessMessage("");
    }

    else if(value <= 0){

      setIncomeError(
        "Income must be greater than 0"
      );

      setSuccessMessage("");
    }

    else{

      setIncomeError("");

      setSuccessMessage(
        "Income added successfully"
      );
    }
  }

  function handleExpense(e){

    const value = e.target.value;

    setTotalExpense(value);

    if(value === ""){

      setExpenseError(
        "Please enter expense"
      );

      setSuccessMessage("");
    }

    else if(value <= 0){

      setExpenseError(
        "Expense must be greater than 0"
      );

      setSuccessMessage("");
    }

    else if(
      Number(value)
      >
      Number(totalIncome)
    ){

      setExpenseError(
        "Expense exceeds income"
      );

      setSuccessMessage("");
    }

    else{

      setExpenseError("");

      setSuccessMessage(
        "Expense added successfully"
      );
    }
  }

  /* ADD TRANSACTION */

  function addTransaction(){

    if(
      food === "" &&
      travel === "" &&
      shopping === "" &&
      entertainment === ""
    ){

      alert(
        "Please fill expense details"
      );

      return;
    }

    const newTransaction = {

      id: Date.now(),

      food,
      travel,
      shopping,
      entertainment
    };

    setTransactions([
      ...transactions,
      newTransaction
    ]);

    alert(
      "✅ Expense Added Successfully"
    );
  }

  /* DELETE */

  function deleteTransaction(id){

    const filteredData =
    transactions.filter(
      (item) =>
      item.id !== id
    );

    setTransactions(filteredData);

    alert(
      "🗑 Expense Deleted"
    );
  }

  /* EDIT */

  function editTransaction(item){

    setFood(item.food);

    setTravel(item.travel);

    setShopping(item.shopping);

    setEntertainment(
      item.entertainment
    );

    setEditId(item.id);
  }

  /* UPDATE */

  function updateTransaction(){

    const updatedData =
    transactions.map(
      (item) => {

        if(item.id === editId){

          return {

            ...item,

            food,
            travel,
            shopping,
            entertainment
          };
        }

        return item;
      }
    );

    setTransactions(updatedData);
    console.log("updated successfully");

    setEditId(null);

    alert(
      "✏ Expense Updated Successfully"
    );
  }

  return (

    <div id="mainLayout">

      {/* SIDEBAR */}

      <div id="sidebar">

        <h2>
          💸 ExpenseAI
        </h2>

        <ul>

          <li>🏠 Dashboard</li>

          <li>💰 Income</li>

          <li>💸 Expenses</li>

          <li>📊 Analytics</li>

          <li>🎯 Savings</li>

          <li>🤖 AI Tips</li>

          <li>🚨 Alerts</li>

        </ul>

      </div>

      {/* CONTENT */}

      <div id="content">

        <Navbar />

        <Hero />

        {/* FEATURES */}

        <section id="topFeatures">

          <div className="topFeatureCard">

            <span>💰</span>

            <h3>
              Budget Tracking
            </h3>

            <p>
              Track income and expenses easily.
            </p>

          </div>

          <div className="topFeatureCard">

            <span>📊</span>

            <h3>
              Smart Analytics
            </h3>

            <p>
              Analyze your spending smartly.
            </p>

          </div>

          <div className="topFeatureCard">

            <span>🎯</span>

            <h3>
              Savings Goal
            </h3>

            <p>
              Monitor monthly savings progress.
            </p>

          </div>

          <div className="topFeatureCard">

            <span>🤖</span>

            <h3>
              AI Suggestions
            </h3>

            <p>
              Smart suggestions based on spending.
            </p>

          </div>

        </section>

        {/* BALANCE */}

        <section id="balanceSection">

          <div className="balanceCard">

            <h3>Total Income</h3>

            <p>₹{totalIncome || 0}</p>

          </div>

          <div className="balanceCard">

            <h3>Total Expense</h3>

            <p>₹{totalExpense || 0}</p>

          </div>

          <div className="balanceCard">

            <h3>Balance</h3>

            <p>₹{balance}</p>

          </div>

        </section>

        {/* FORM */}

        <section id="formSection">

          <h2>
            Update Budget
          </h2>

          <input
            type="number"
            placeholder="Enter Income"
            value={totalIncome}
            onChange={handleIncome}
          />

          {
            incomeError &&

            <p className="error">
              {incomeError}
            </p>
          }

          <input
            type="number"
            placeholder="Enter Expense"
            value={totalExpense}
            onChange={handleExpense}
          />

          {
            expenseError &&

            <p className="error">
              {expenseError}
            </p>
          }

          <input
            type="number"
            placeholder="Food Expense"
            value={food}
            onChange={(e) =>
              setFood(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Travel Expense"
            value={travel}
            onChange={(e) =>
              setTravel(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Shopping Expense"
            value={shopping}
            onChange={(e) =>
              setShopping(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Entertainment Expense"
            value={entertainment}
            onChange={(e) =>
              setEntertainment(
                e.target.value
              )
            }
          />

          {
            successMessage &&

            <p className="success">
              {successMessage}
            </p>
          }

          {/* BUTTONS */}

          <div id="buttonGroup">

            <button
              onClick={addTransaction}
            >
              Add
            </button>

            <button
              onClick={updateTransaction}
            >
              Update
            </button>

          </div>

        </section>

        {/* ALERTS */}

        <section id="alertSection">

          <h2>
            Alerts
          </h2>

          <div id="alertBox">

            <p>
              {alertMessage}
            </p>

          </div>

        </section>

        {/* CATEGORY */}

        <section id="categorySection">

          <h2>
            Expense Categories
          </h2>

          <div id="cards">

            <div className="card">

              <h3>🍔 Food</h3>

              <p>₹{food || 0}</p>

            </div>

            <div className="card">

              <h3>✈ Travel</h3>

              <p>₹{travel || 0}</p>

            </div>

            <div className="card">

              <h3>🛍 Shopping</h3>

              <p>₹{shopping || 0}</p>

            </div>

            <div className="card">

              <h3>🎬 Entertainment</h3>

              <p>₹{entertainment || 0}</p>

            </div>

          </div>

        </section>

        {/* TRANSACTION TABLE */}

        <section id="transactionSection">

          <h2>
            Expense Details
          </h2>

          <table>

            <thead>

              <tr>

                <th>Food</th>

                <th>Travel</th>

                <th>Shopping</th>

                <th>Entertainment</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {
                transactions.map(
                  (item) => (

                  <tr key={item.id}>

                    <td>
                      ₹{item.food}
                    </td>

                    <td>
                      ₹{item.travel}
                    </td>

                    <td>
                      ₹{item.shopping}
                    </td>

                    <td>
                      ₹{item.entertainment}
                    </td>

                    <td>

                      <button
                        className="editBtn"
                        onClick={() =>
                          editTransaction(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="deleteBtn"
                        onClick={() =>
                          deleteTransaction(
                            item.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </section>

        {/* ANALYTICS */}

        <section id="analyticsSection">

          <h2>
            Expense Analytics
          </h2>

          <table>

            <tbody>

              <tr>

                <th>Category</th>

                <th>Status</th>

              </tr>

              <tr>

                <td>Food</td>

                <td>

                  {
                    Number(food) > 3000
                    ?
                    "High"
                    :
                    "Normal"
                  }

                </td>

              </tr>

              <tr>

                <td>Travel</td>

                <td>

                  {
                    Number(travel) > 4000
                    ?
                    "High"
                    :
                    "Normal"
                  }

                </td>

              </tr>

              <tr>

                <td>Shopping</td>

                <td>

                  {
                    Number(shopping) > 5000
                    ?
                    "High"
                    :
                    "Normal"
                  }

                </td>

              </tr>

              <tr>

                <td>Entertainment</td>

                <td>

                  {
                    Number(entertainment) > 3000
                    ?
                    "High"
                    :
                    "Normal"
                  }

                </td>

              </tr>

            </tbody>

          </table>

        </section>

        {/* SAVINGS */}

        <section id="goalSection">

          <h2>
            Monthly Savings Goal
          </h2>

          <div id="goalBox">

            <p>
              Goal : ₹50,000
            </p>

            <p>
              Saved : ₹{balance}
            </p>

            <progress
              value={balance}
              max="50000"
            ></progress>

          </div>

        </section>

        {/* LIMIT */}

        <section id="limitSection">

          <h2>
            Daily Expense Limit
          </h2>

          <div id="limitBox">

            <p>
              Daily Limit : ₹2000
            </p>

            <p>
              Today's Expense :
              ₹{totalCategoryExpense}
            </p>

            <button>

              {
                totalCategoryExpense > 2000

                ?

                "Limit Exceeded"

                :

                "Within Limit"
              }

            </button>

          </div>

        </section>

        {/* REWARDS */}

        <section id="rewardSection">

          <h2>
            Savings Rewards
          </h2>

          <div id="rewardBox">

            <p>
              🎉 You saved ₹{balance}
            </p>

            <p>

              {
                balance > 20000

                ?

                "🏆 Gold Saver"

                :

                "🥈 Silver Saver"
              }

            </p>

            <p>
              ⭐ Points :
              {Math.floor(balance / 100)}
            </p>

          </div>

        </section>

        {/* AI */}

        <section id="suggestionSection">

          <h2>
            Smart Suggestions
          </h2>

          <div id="suggestionBox">

            <p>
              {suggestion}
            </p>

          </div>

        </section>

        <Footer />

      </div>

    </div>
  );
}

export default App;