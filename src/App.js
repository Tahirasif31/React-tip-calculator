import { useState } from "react";

function App() {
  const [rating, setRating] = useState("");
  const [friendRating, setFriendRating] = useState("");
  const [bill, setBill] = useState("");

  const needReset = rating || bill || friendRating;

  let average;

  function calculateTipAverage() {
    average = (rating + friendRating) / 2;
    console.log(average);
  }

  calculateTipAverage();

  return (
    <div className="App">
      <div className="container">
        <BillInput bill={bill} onAddBill={setBill} />
        <ServiceRatingInput rating={rating} onAddRating={setRating}>
          How did you like the service?
        </ServiceRatingInput>
        <ServiceRatingInput rating={friendRating} onAddRating={setFriendRating}>
          How did your friend like the service?
        </ServiceRatingInput>
        <BillCalculator bill={bill} average={average} />
        {needReset && (
          <Reset
            onAddBill={setBill}
            onAddRating={setRating}
            onAddFriendRating={setFriendRating}
          />
        )}
      </div>
    </div>
  );
}

function BillInput({ bill, onAddBill }) {
  return (
    <div className="bill-input">
      <p>How much was the bill?</p>
      <input
        type="text"
        className="input"
        value={bill}
        onChange={(e) => onAddBill(Number(e.target.value))}
      />
    </div>
  );
}

function ServiceRatingInput({ children, rating, onAddRating }) {
  return (
    <div className="service-rating-input">
      <p>{children}</p>
      <select
        value={rating}
        onChange={(e) => onAddRating(Number(e.target.value))}
        className="service"
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing (20%)</option>
      </select>
    </div>
  );
}

function BillCalculator({ bill, average }) {
  return (
    <div className="final-bill">
      <span>{`Your total bill is $ ${bill + average}`}</span> <br />
      <span>{`($${bill} bill + $${average} tip)`}</span>
    </div>
  );
}

function Reset({ onAddBill, onAddRating, onAddFriendRating }) {
  function resetAll() {
    onAddBill("");
    onAddRating("");
    onAddFriendRating("");
  }

  return (
    <button onClick={resetAll} className="btn">
      Reset
    </button>
  );
}

export default App;
