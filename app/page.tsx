import "./ui/home.scss";
import Heading from "./ui/elements/heading/heading";
export default function Home() {
  return (
    <div className="container home">
      <h1>De lekkerste gerechten op één plek</h1>

      <Heading text="Lunches" />
    </div>
  );
}
