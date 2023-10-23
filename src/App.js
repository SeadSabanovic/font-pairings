import { Typography } from "@mui/material";
import "./App.scss";
import { pairings } from "./constants";
import FontSection from "./FontSection";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import FakeFont from "./FakeFont";

function getUniqueFonts(pairings) {
  const uniqueFonts = new Set();
  pairings.forEach((pair) => {
    uniqueFonts.add(pair.font_title);
    uniqueFonts.add(pair.font_paragraph);
  });
  return Array.from(uniqueFonts);
}

const uniqueFonts = getUniqueFonts(pairings);

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Check if fonts are not loaded
    WebFont.load({
      google: {
        families: uniqueFonts,
      },
      active: () => {
        setFontsLoaded(true);
        console.log("loaded fonts");
      },
    });
  }, []);

  return (
    <div className="App">
      <header className="header ">
        <div className="container">
          <Typography variant="h2">Top 50 Google Font Pairings</Typography>
          <Typography variant="h6">[Handpicked by Pro Designers]</Typography>
          <Typography variant="h6">
            <a href="https://www.pagecloud.com/blog/best-google-fonts-pairings">
              Article
            </a>{" "}
            by Philip Westfall
          </Typography>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="introduction">
            <p>
              The fonts you decide to use on your website can make or break your
              design.
            </p>
            <p>
              However, with thousands of free fonts available online, choosing
              the perfect combinations can be a time consuming exercise, even
              for experienced designers.
            </p>
            <p>
              In this article, we showcase the most beautiful font pairings from
              Google that can easily be added to your website.
            </p>
            <p>
              Note: because font choices are subjective, our design team has
              handpicked their tops fonts based on legibility, design
              flexibility, and overall aesthetic. To help you make your
              decision, we’ve sorted the fonts by style: classic, elegant,
              modern, creative, and minimalist.
            </p>
          </div>
          {!fontsLoaded && <FakeFont />}
          {fontsLoaded &&
            pairings.map((pair, index) => {
              return <FontSection pair={pair} key={index} index={index} />;
            })}
        </div>
      </main>
    </div>
  );
}

export default App;
