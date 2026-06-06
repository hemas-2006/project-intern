import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

import { useState, useEffect } from "react";

import axios from "axios";

function App() {

  const [totalIncome, setTotalIncome] = useState("");
  const [totalExpense, setTotalExpense] = useState("");

  const [food, setFood] = useState("");
  const [travel, setTravel] = useState("");
  const [shopping, setShopping] = useState("");
  const [entertainment, setEntertainment] = useState("");

  const [transactions, setTransactions] = useState([]);

  const [editId, setEditId] = useState(null);

  const balance =
    (Number(totalIncome) || 0) -
    (Number(totalExpense) || 0);

  useEffect(() => {

    fetchExpenses();

  }, []);

  async function fetchExpenses() {

    try {

      const response =
      await axios.get(
        "http://localhost:5000/api/expenses"
      );

      setTransactions(response.data);

    }

    catch (error) {

      console.log(error);
    }
  }

  async function addTransaction() {

    try {

      const newExpense = {

        title: "Expense",
        amount: totalExpense,
        category: "General",
        type: "Expense",
        date: new Date()

      };

      const response =
      await axios.post(

        "http://localhost:5000/api/expenses",

        newExpense
      );

      setTransactions([
        ...transactions,
        response.data.data
      ]);

      alert("Expense Added");

    }

    catch (error) {

      console.log(error);
    }
  }

  async function deleteTransaction(id) {

    try {

      await axios.delete(
        `http://localhost:5000/api/expenses/${id}`
      );

      const filteredData =
      transactions.filter(
        (item) => item._id !== id
      );

      setTransactions(filteredData);

    }

    catch (error) {

      console.log(error);
    }
  }

  async function updateTransaction() {

    try {

      const updatedExpense = {

        title: "Updated Expense",
        amount: totalExpense,
        category: "General",
        type: "Expense",
        date: new Date()

      };

      await axios.put(

        `http://localhost:5000/api/expenses/${editId}`,

        updatedExpense
      );

      fetchExpenses();

      alert("Updated Successfully");

    }

    catch (error) {

      console.log(error);
    }
  }

  return (

    <div id="mainLayout">

      <div id="sidebar">

        <h2>💸 ExpenseAI</h2>

      </div>

      <div id="content">

        <Navbar />

        <Hero />

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

        <section id="formSection">

          <h2>Expense Form</h2>

          <input
            type="number"
            placeholder="Income"
            value={totalIncome}
            onChange={(e)=>
              setTotalIncome(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Expense"
            value={totalExpense}
            onChange={(e)=>
              setTotalExpense(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Food"
            value={food}
            onChange={(e)=>
              setFood(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Travel"
            value={travel}
            onChange={(e)=>
              setTravel(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Shopping"
            value={shopping}
            onChange={(e)=>
              setShopping(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Entertainment"
            value={entertainment}
            onChange={(e)=>
              setEntertainment(e.target.value)
            }
          />

          <div id="buttonGroup">

            <button onClick={addTransaction}>
              Add
            </button>

            <button onClick={updateTransaction}>
              Update
            </button>

          </div>

        </section>

        <section id="transactionSection">

          <h2>Expense Table</h2>

          <table>

            <thead>

              <tr>

                <th>Amount</th>

                <th>Category</th>

                <th>Type</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {
                transactions.map((item)=>(

                  <tr key={item._id}>

                    <td>₹{item.amount}</td>

                    <td>{item.category}</td>

                    <td>{item.type}</td>

                    <td>

                      <button
                      className="editBtn"
                      onClick={()=>
                        setEditId(item._id)
                      }>
                        Edit
                      </button>

                      <button
                      className="deleteBtn"
                      onClick={()=>
                        deleteTransaction(item._id)
                      }>
                        Delete
                      </button>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </section>

        <Footer />

      </div>

    </div>
  );
}

export default App;