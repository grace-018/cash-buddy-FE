function ScrollToTop() {
  function handleScroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="scroll-to-top">
      <img
        className="button"
        onClick={handleScroll}
        src="./assets/scroll-up.png"
        alt="scroll-up"
      />
    </div>
  );
}

export default ScrollToTop;
