import Form from "../form/Form";
import incomeData from "./incomeData";

function AddIncome() {
  return (
    <div>
      <h2 className="h2 text-center">Add Income</h2>
      <Form data={incomeData} />
    </div>
  );
}

export default AddIncome;
