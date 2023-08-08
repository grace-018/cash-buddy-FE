import TransactionContext from "./TransactionContext";
import { useState, useEffect } from "react";
import baseURL from "../api/fetch";

const TransactionProvider = ({ children }) => {
  const [expData, setExpData] = useState([]);
  const [incData, setIncData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchTransactionData();
  }, [refreshFlag]);

  const fetchTransactionData = async () => {
    try {
      const token = window.localStorage.getItem("token").replace(/"/g, "");
      const userDataResponse = await fetch(`${baseURL}/protected`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const user = await userDataResponse.json();

      const userInfo = {
        id: user.data[0]._id,
        email: user.data[0].email,
        username: user.data[0].username,
      };

      setUserData(userInfo);

      const userDataId = user.data[0]._id;

      if (userDataId) {
        const expenseResponse = await fetch(
          `${baseURL}/api/v1/expense?transactionType=false`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        const expenses = await expenseResponse.json();

        if (expenses.data) {
          setExpData(expenses.data);
        }

        const incomeResponse = await fetch(
          `${baseURL}/api/v1/income?transactionType=true`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const income = await incomeResponse.json();

        if (income.data) {
          setIncData(income.data);
        }
      }
    } catch (error) {
      console.error("Error fetching data", error.message);
    }
  };

  const refreshData = () => {
    setRefreshFlag(!refreshFlag);
  };

  //calculate total expenses
  useEffect(() => {
    const expenditure = expData.reduce(
      (accum, expense) => accum + expense.amount,
      0
    );
    setTotalExpense(expenditure);
  }, [expData]);

  useEffect(() => {
    const revenue = incData.reduce((total, income) => total + income.amount, 0);
    setTotalIncome(revenue);
  }, [incData]);

  const clearData = () => {
    setExpData([]);
    setIncData([]);
    setTotalIncome(0);
    setTotalExpense(0);
  };

  const sharedData = {
    expData: expData,
    incData: incData,
    totalIncome: totalIncome,
    totalExpense: totalExpense,
    userData: userData,
    refreshData: refreshData,
    clearData: clearData,
  };

  return (
    <TransactionContext.Provider value={sharedData}>
      {children}
    </TransactionContext.Provider>
  );
};
export default TransactionProvider;
