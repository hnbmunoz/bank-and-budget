const SidePanel = ({
  transactionButton,
  homeButton,
  accountsButton,
  navButton,
}) => {
  //Toggle Nav
  // const handleClick = () => {
  //   const sidePanel = document.querySelector(".nav-bar");
  //   const overLay = document.querySelector(".over-lay");
  //   sidePanel.classList.toggle("hide");
  //   overLay.classList.toggle("hide");
  // };

  return (
    <div className="side-panel">
      <button className="side-panel-btn__toggle" onClick={navButton}>
        Toggle
      </button>
      {/* NAVBAR */}
      <nav className="nav-bar flex-column hide">
        <ul className="nav-list flex-column " onClick={navButton}>
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
      <div className="over-lay hide" onClick={navButton}></div>
    </div>
  );
};

export default SidePanel;
