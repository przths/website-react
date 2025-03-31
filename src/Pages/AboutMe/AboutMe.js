import { useEffect } from "react";
import PageHeader from "../../Components/PageHeader";

const AboutMePage = () => {
  useEffect(() => {
    document.title = "About Me";
  }, []);

  return (
    <PageHeader>
      <h1>About Me</h1>
      <p>This is the about me page.</p>
    </PageHeader>
  );
}

export default AboutMePage;
