// import logo from "./logo.svg";
import "./variables.scss";
import { Hero } from "./views/Hero/Hero";
import { Projects } from "./views/Projects/Projects";
import { Container } from "./components/Container/Container";

function App() {
  return (
    <div className="App">
      <Hero />
      <Projects />
      <section>
        <Container>
          <h2>About</h2>
        </Container>
      </section>
      <section>
        <Container>
          <h2>Contacts</h2>
        </Container>
      </section>
    </div>
  );
}

export default App;
