import CashBalance from "../../computations/CashBalance";
import TransactionContext from "../../context/TransactionContext";
import { useContext } from "react";
import FormatAmtWithCommas from "../format/FormatAmtWithCommas";
import Footer from "../footer/Footer";

function IncExpReport() {
  const { totalIncome, totalExpense } = useContext(TransactionContext);
  const expensePercentage = ((totalExpense / totalIncome) * 100).toFixed(2);
  const balPercentage = (
    ((totalIncome - totalExpense) / totalIncome) *
    100
  ).toFixed(2);

  const displayPercentage =
    !isNaN(expensePercentage) &&
    !isNaN(balPercentage) &&
    isFinite(expensePercentage);

  return (
    <div>
      <h2 className="h2 text-center">Income and Expense Report</h2>
      <table className="table table-sm table-striped table-hover align-middle">
        <thead>
          <tr>
            <th></th>
            {displayPercentage && <th className="text-center">Percentage</th>}
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <td className="fw-medium">Income</td>
            {displayPercentage && <td className="text-center">100.00</td>}
            <td className="text-center">
              <FormatAmtWithCommas number={totalIncome} />
            </td>
          </tr>
          <tr>
            <td className="fw-medium">Expense</td>
            {displayPercentage && (
              <td className="text-center">{expensePercentage}</td>
            )}

            <td className="text-center">
              <FormatAmtWithCommas number={totalExpense} />
            </td>
          </tr>
          <tr className="table-group-divider">
            <td className="fw-medium">Total</td>
            {displayPercentage && (
              <td className="fw-medium text-center">{balPercentage}</td>
            )}
            <td className="fw-medium text-center ">
              <CashBalance income={totalIncome} expense={totalExpense} />
            </td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default IncExpReport;
