import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function LoadingSpinner() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return (
        <div className="sweet-loading">
            <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
            <input
                value={color}
                onChange={(input) => setColor(input.target.value)}
                placeholder="Color of the loader"
            />
            <ClipLoader color={color} loading={loading} css={override} size={150} />
        </div>
    );
}

export default LoadingSpinner;
