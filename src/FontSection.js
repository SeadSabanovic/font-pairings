import React from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { useCallback } from "react";
import { Snackbar } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

export default function FontSection({ pair, index }) {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const sectionRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleEnter = useCallback(() => {
    document.documentElement.style.setProperty("--text-color", pair.text_color);

    gsap.to(document.body, {
      background: pair.background_color,
      ease: "power2.inOut",
      duration: 0.2,
    });
  }, [pair.background_color, pair.text_color]);

  function rgbToHex(rgb) {
    // Expecting the RGB format: 'rgb(r, g, b)'
    const [r, g, b] = rgb.match(/\d+/g); // Extract the numeric values
    const hex = `#${parseInt(r, 10).toString(16).padStart(2, "0")}${parseInt(
      g,
      10
    )
      .toString(16)
      .padStart(2, "0")}${parseInt(b, 10).toString(16).padStart(2, "0")}`;
    return hex;
  }

  const handleCopyColor = (color) => {
    let hex = rgbToHex(color);
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = hex;

    // Append the input element to the DOM
    document.body.appendChild(tempInput);

    // Select the input's value
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element from the DOM
    document.body.removeChild(tempInput);
    // After successful copy, set open to true to show the Snackbar
    setMessage(`Copied Color: ${hex}`);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const sectionElement = sectionRef.current;

    const handleLeave = () => {
      if (index === 0) {
        gsap.to(document.body, {
          background: "#fff",
          ease: "power2.inOut",
          duration: 0.3,
        });

        document.documentElement.style.setProperty("--text-color", "#000");
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: sectionElement,
      start: "top center",
      end: "center+=10% center",
      onEnter: handleEnter,
      onEnterBack: handleEnter,
      onLeaveBack: handleLeave,
    });

    // Ensure to kill the trigger when the component unmounts to prevent memory leaks
    return () => {
      if (trigger) {
        trigger.kill();
      }
    };
  }, [index, handleEnter]);

  return (
    <div className="font-section" ref={sectionRef}>
      <div className="font-section__index">
        {index + 1 > 9 ? index + 1 : `0${index + 1}`}
      </div>
      <h2
        className="font-section__title"
        ref={titleRef}
        style={{
          fontStyle: pair.font_style ? pair.font_style : "",
          fontFamily: pair.font_title,
        }}
      >
        {pair.font_title} {pair.font_style ? pair.font_style : ""} & <br />
        {pair.font_paragraph}
      </h2>
      <p
        className="font-section__paragraph"
        ref={paragraphRef}
        style={{ fontFamily: pair.font_paragraph }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nisl
        diam, eleifend vitae eros sed, malesuada venenatis quam. Duis tincidunt
        iaculis lacus sit amet dictum. Integer sit amet auctor urna, sit amet
        lacinia turpis. Duis auctor elementum justo vel laoreet. Donec ac neque
        urna. Maecenas consectetur risus a placerat iaculis. Vivamus in urna eu
        turpis eleifend viverra sit amet aliquam nulla. Proin non pulvinar
        magna. Etiam imperdiet ex posuere, fringilla neque non, vestibulum
        libero. Mauris mi lacus, faucibus vel quam eget, cursus dignissim nisl.
      </p>
      <div className="font-section__details">
        <p className="font-section__details__style">__ {pair.style}</p>
        <div className="font-section__details__colors">
          <p>__ colors</p>
          <div className="font-section__details__colors__inner">
            <div
              className="font-section__details__colors__color"
              style={{ background: pair.background_color }}
              onClick={() => handleCopyColor(pair.background_color)}
            ></div>
            <div
              className="font-section__details__colors__color"
              style={{ background: pair.text_color }}
              onClick={() => handleCopyColor(pair.text_color)}
            ></div>
          </div>
        </div>
        <div className="font-section__details__colors">
          <p>__ additional</p>
          <div className="font-section__details__colors__inner">
            {pair.additional_colors.map((color, index) => {
              return (
                <div
                  key={index}
                  className="font-section__details__colors__color"
                  style={{ background: color }}
                  onClick={() => handleCopyColor(color)}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
