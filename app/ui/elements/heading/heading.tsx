import "./heading.scss";

interface Heading {
  text: string;
}

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <h2 className="pt-6">{children}</h2>
      <hr className="w-15 border-none h-0.5 mb-5" />
    </div>
  );
};

export default Heading;
