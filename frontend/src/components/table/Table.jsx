import React from "react";

const Table = ({ info }) => {
  //filter Amt so only categories can be shown
  const filterAmt = info.filter((item) => item.amount !== 0);

  // sort data base on decreasing order of the amount
  const sortedData = filterAmt.sort((a, b) => b.amount - a.amount);

  // calculate total amount in data

  const totalAmount = info.reduce((sum, transaction) => {
    return sum + transaction.amount;
  }, 0);

  // calculate the Percentage
  const calculatePercentage = (amount, total) => {
    return ((amount / total) * 100).toFixed(2);
  };

  return (
    <table className="table table-striped table-hover align-middle">
      <thead>
        <tr>
          <td className="fw-bold">Category</td>
          <td className="fw-bold">%</td>
          <td className="fw-bold">Amount</td>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => {
          const percentage = calculatePercentage(item.amount, totalAmount);
          return (
            <tr key={item.id}>
              <td>
                <img src={item.imageLink} alt={item.category} />
                <span>{item.category}</span>
              </td>
              <td>{percentage}</td>
              <td>{item.amount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
