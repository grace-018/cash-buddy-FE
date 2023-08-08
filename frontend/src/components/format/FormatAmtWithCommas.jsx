function FormatAmtWithCommas({ number }) {
  const formattedAmt = number.toLocaleString();
  return <span>{formattedAmt}</span>;
}

export default FormatAmtWithCommas;
