import FormatAmtWithCommas from "../components/format/FormatAmtWithCommas";

function CashBalance({ income, expense }) {
  const cashBalance = income - expense;
  if (cashBalance < 0) {
    return (
      <span className="negative">
        ₱ <FormatAmtWithCommas number={cashBalance} />
      </span>
    );
  }
  return (
    <>
      ₱ <FormatAmtWithCommas number={cashBalance} />
    </>
  );
}

export default CashBalance;
