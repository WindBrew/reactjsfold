import { useState } from "react";

function TextOnPage(props) {
  const ResetClk = () => {
    if (text.toLowerCase() === "enter text here") {
      setText("");
    }
  };
  const [text, setText] = useState("Enter text here");
  const handleChange = (event) => {
    console.log("onChange");
    setText(event.target.value);
    ResetClk();
  };
  const handleUppcs = () => {
    setText(text.toUpperCase());
  };
  const handleLows = () => {
    setText(text.toLowerCase());
  };
  /* use useState because variables do not update in re rendering and react resets to default with re render
  and useState stays */
  const resetIt = () => {
    setText("");
  };

  return (
    <div className="w-[85%] ml-[15%]">
      <div id="textBoxonPage">
        <textarea
          id="WriteHere"
          placeholder="Text here"
          className="shadow-md ml-4 dark:shadow-lg dark:shadow-slate-900 w-[80%] h-28 m-12 border-4 border-solid border-gray-300 ml-0 dark:bg-black dark:text-white"
          value={text}
          onChange={handleChange}
          onClick={ResetClk}
          // style={{ background: props.color, color: props.font }}
        ></textarea>
      </div>
      <div id="buttons" className="w-[75%]">
        <button
          className="ml-2 mt-2 text-white  box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
          id="ConvUp"
          style={{ background: props.colorBut }}
          onClick={handleUppcs}
        >
          UPPERCASE
        </button>
        <button
          className="ml-2  mt-2 text-white box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
          id="ConvLo"
          onClick={handleLows}
          style={{ background: props.colorBut }}
        >
          lowercase
        </button>
        <button
          onClick={resetIt}
          style={{ background: props.colorBut }}
          className="float-right mt-2 text-white box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
        >
          clear
        </button>
      </div>
      <div className="previewContainer mt-12 ml-4">
        <h4>
          {
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.replace(/\s/g, "").length} characters
        </h4>{" "}
        <h4>{(0.008 * text.split(" ").length).toFixed(2)} minutes read</h4>
        <h2>
          <strong>Preview</strong>
        </h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

TextOnPage.defaultProps = {
  colorBut: "blue",
};

export default TextOnPage;
