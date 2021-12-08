import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyPileTitle = ({ pile }) => {
  const [pileTitle, setPileTitle] = useState(pile.title);
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div>
      <h1>Copying to the clipboard</h1>
      <CopyToClipboard text={pileTitle} onCopy={() => setIsCopied(true)}>
        Copy Title
      </CopyToClipboard>
      {/* {isCopied ? <h4 style={{ color: "red" }}>Copied</h4> : null} */}
    </div>
  );
};

export default CopyPileTitle;
