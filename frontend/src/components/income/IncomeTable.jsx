import React from "react";
import FormatAmtWithCommas from "../format/FormatAmtWithCommas";

const IncomeTable = ({ info }) => {
  //   sort data base on date
  const sortedInc = info.sort((a, b) => new Date(b.date) - new Date(a.date));

  // // calculate the Percentage
  // const calculatePercentage = (amount, total) => {
  //   return ((amount / total) * 100).toFixed(2);
  // };

  return (
    <table className="table table-striped table-hover align-middle">
      <thead>
        <tr>
          <th className="text-startr">Date</th>
          <th className="text-center">Category</th>
          <th className="text-center">Amount</th>
        </tr>
      </thead>
      <tbody>
        {sortedInc.map((item) => {
          return (
            <tr key={item._id}>
              <td className="text-start">{item.date}</td>
              <td className="text-center">
                <img src={item.categoryImageLink} alt={item.categoryName} />
                <span>{item.categoryName}</span>
              </td>
              <td className="text-center text-wrap text-break">
                <FormatAmtWithCommas number={item.amount} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default IncomeTable;
