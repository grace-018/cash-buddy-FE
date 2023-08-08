import React, { useState, useEffect } from "react";
import AppRouter from "./router/AppRouter";
import TransactionProvider from "./context/TransactionProvider";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [transactionProviderKey, setTransactionProviderKey] = useState(0);

  useEffect(() => {
    //Reset the Transaction Provider key when logged out
    if (!loggedIn) {
      setTransactionProviderKey((prevKey) => prevKey + 1);
    }
  }, [loggedIn]);

  return (
    <>
      {loggedIn ? (
        <TransactionProvider key={transactionProviderKey}>
          <AppRouter loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </TransactionProvider>
      ) : (
        <AppRouter loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}
    </>
  );
}

export default App;
