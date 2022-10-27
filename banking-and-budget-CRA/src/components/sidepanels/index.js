const SidePanel = ({ transactionButton, homeButton, accountsButton }) => {
  const handleClick = () => {
    const sidePanel = document.querySelector(".nav-bar");
    const overLay = document.querySelector(".over-lay");
    sidePanel.classList.toggle("hide");
    overLay.classList.toggle("hide");
  };

  return (
    <div className="side-panel">
      <button className="side-panel-btn__toggle" onClick={handleClick}>
        Toggle
      </button>
      {/* NAVBAR */}
      <nav className="nav-bar flex-column hide">
        <ul className="nav-list flex-column">
          <li className="nav-items">
            <button
              className="btn btn-nav-links"
              data-id="0"
              onClick={(e) => {
                homeButton(e);
              }}
            >
              Home
            </button>
          </li>

          <li className="nav-items">
            <button
              className="btn btn-nav-links"
              data-id="1"
              onClick={(e) => {
                transactionButton(e);
              }}
            >
              Transactions
            </button>
          </li>

          <li className="nav-items">
            <button
              className="btn btn-nav-links"
              data-id="2"
              onClick={(e) => {
                accountsButton(e);
              }}
            >
              Accounts
            </button>
          </li>
        </ul>
      </nav>
      <div className="over-lay hide" onClick={handleClick}></div>
    </div>
  );
};

export default SidePanel;
