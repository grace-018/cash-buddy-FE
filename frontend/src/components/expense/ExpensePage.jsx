import React, { useContext } from "react";
import ScrollToTop from "../buttons/ScrollToTop";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import TransactionContext from "../../context/TransactionContext";
import FormatAmtWithCommas from "../format/FormatAmtWithCommas";
import Footer from "../footer/Footer";
import expenseData from "./expenseData";

function ExpensePage() {
  const contextData = useContext(TransactionContext);

  return (
    <div>
      <h2 className="h2 text-center">Expense Transactions</h2>
      <h5 className="h5">
        Total Expense: ₱{" "}
        <FormatAmtWithCommas number={contextData.totalExpense} />
      </h5>
      <ExpenseForm data={expenseData} userData={contextData.userData} />
      <ExpenseTable info={contextData.expData} />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default ExpensePage;
