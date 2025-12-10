import "./heading.scss";
interface Heading {
  text: string;
}

const Heading: React.FC<Heading> = ({ text }) => {
  return <h2>{text}</h2>;
};

export default Heading;
