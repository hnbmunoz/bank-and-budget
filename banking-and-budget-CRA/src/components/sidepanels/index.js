const SidePanel = ({ transactionButton }) => {
  const handleClick = () => {
    const sidePanel = document.querySelector(".nav-bar");
    const innerSidePanel = document.querySelector(".inner-nav");

    sidePanel.classList.toggle("hide");
    innerSidePanel.classList.toggle("hide");

    // innerSidePanel.contains("hide")
    //   ? sidePanel.classList.add("hide")
    //   : sidePanel.classList.remove("hide");
  };
  return (
    <div className="side-panel">
      <button className="side-panel-btn__toggle" onClick={handleClick}>
        Toggle
      </button>
      {/* NAVBAR */}
      <nav className="nav-bar flex-column">
        <ul className="nav-list flex-column">
          <li className="nav-items">
            <button className="btn btn-nav-links">Home</button>
          </li>
          <li className="nav-items">
            <button className="btn btn-nav-links" onClick={transactionButton}>
              Transactions
            </button>
          </li>
          <li className="nav-items">
            <button className="btn btn-nav-links">Accounts</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidePanel;
