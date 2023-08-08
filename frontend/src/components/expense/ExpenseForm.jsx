import Add from "../buttons/Add";
import Cancel from "../buttons/Cancel";
import { useState, useContext } from "react";
import TransactionContext from "../../context/TransactionContext";
import baseURL from "../../api/fetch.js";

function ExpenseForm({ data, userData }) {
  const { refreshData } = useContext(TransactionContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [date, setDate] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const userDataId = userData.id;

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleCategorySelection = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleAmtChange = (event) => {
    const input = event.target.value;
    if (input === "" || (/^\d{1,15}$/.test(input) && Number(input) >= 0)) {
      setNewAmount(input);
    }
  };

  const imageLink = () => {
    const expense = data.find(
      (expense) => expense.category === selectedCategory
    );
    return expense ? expense.imageLink : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = window.localStorage.getItem("token").replace(/"/g, "");
      const response = await fetch(`${baseURL}/api/v1/addtransaction`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userDataId,
          categoryName: selectedCategory,
          categoryImageLink: imageLink(),
          transactionType: 0,
          amount: newAmount,
          date: date,
        }),
      });

      if (!response.ok) {
        alert("Failed to add expense");
      }

      if (response.ok) {
        alert("Transaction added");
        refreshData();
      }
    } catch (error) {
      alert("An error occured", error.message);
    }
    setSelectedCategory("");
    setNewAmount("");
    setDate("");
  };

  const handleClick = (event) => {
    event.preventDefault();
    setSelectedCategory("");
    setNewAmount("");
    setIsFormOpen(!isFormOpen);
    setDate("");
  };

  return (
    <>
      <button
        className="btn btn-primary btn-sm"
        type="button"
        onClick={toggleForm}
      >
        Add Transaction
      </button>
      {isFormOpen && (
        <form
          className="row mb-3 d-grid gap-2 col-10 mx-auto card card-body"
          onSubmit={handleSubmit}
        >
          <select
            className="form-select"
            value={selectedCategory}
            onChange={handleCategorySelection}
          >
            {/*Add category */}
            <option value="">Select a Category</option>
            {data.map((item) => (
              <option key={item.id} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
          {/*Add date */}
          <label className="col-form-label" htmlFor="date">
            Date
          </label>
          <input
            className="form-control"
            value={date}
            onChange={handleDateChange}
            type="date"
            id="date"
            name="date"
            required
          ></input>
          {/*Add Amount */}
          <label className="col-form-label" htmlFor="amount">
            Enter Amount
          </label>
          <input
            className="form-control"
            value={newAmount}
            onChange={handleAmtChange}
            type="number"
            id="amount"
            placeholder="Amount"
            required
          />
          <span>
            <Add />
          </span>
          <span>
            <Cancel handle={handleClick} />
          </span>
        </form>
      )}
    </>
  );
}

export default ExpenseForm;
