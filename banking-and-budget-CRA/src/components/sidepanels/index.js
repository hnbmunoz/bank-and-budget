const SidePanel = () => {
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
      {/* Inner nav  */}
      <div className="inner-nav hide">
        <ul className="inner-nav-list">
          <li className="inner-nav-items">
            <button className="btn btn-inner-nav">Home</button>
          </li>
          <li className="inner-nav-items">
            <button className="btn btn-inner-nav">Withdraw</button>
          </li>
          <li className="inner-nav-items">
            <button className="btn btn-inner-nav">Deposit</button>
          </li>
          <li className="inner-nav-items">
            <button className="btn btn-inner-nav">Savings</button>
          </li>
        </ul>
      </div>

      {/* NAVBAR */}
      <nav className="nav-bar flex-column">
        <ul className="nav-list flex-column">
          <li className="nav-items">
            <button className="btn btn-nav-links">Home</button>
          </li>
          <li className="nav-items">
            <button className="btn btn-nav-links">Transactions</button>
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
