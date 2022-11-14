import "./Card.css";

const Card = (props) => {
  const classes = `card ${props.className} hideThisCard`;
  return <div className={classes}>{props.children}</div>;
};

export default Card;
