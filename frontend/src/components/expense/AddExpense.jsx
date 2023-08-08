import Form from "../form/Form";
import expenseData from "./expenseData";

function AddExpense() {
  return (
    <div>
      <h2 className="h2 text-center">Add Expense</h2>
      <Form data={expenseData} />
    </div>
  );
}

export default AddExpense;
