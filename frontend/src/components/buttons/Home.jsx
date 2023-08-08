import { Link } from "react-router-dom";

function Home() {
  return (
    <Link to="/">
      <button className="btn btn-outline-secondary btn-sm " type="button">
        Return to Home
      </button>
    </Link>
  );
}
export default Home;
