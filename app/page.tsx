import Category from "./ui/elements/category/category";

export default function Home() {
  return (
    <div className="container home">
      <h1>De lekkerste gerechten op één plek</h1>
      <Category isHomePage={true} />
    </div>
  );
}
