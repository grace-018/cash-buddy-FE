function Cancel({ handle }) {
  return (
    <span className="d-grid gap-2 col-6 mx-auto">
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={handle}
      >
        Cancel
      </button>
    </span>
  );
}

export default Cancel;
