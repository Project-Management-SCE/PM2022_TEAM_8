import React from "react";
import "../Style/utilsIconContainer.css";

type iconProps = {
  image: string;
  width: number;
  height: number;
  backgroundColor?: string;
  border?: boolean;
  borderColor?: string;
  onPress?: () => void;
  imageDimensions?: any;
  title?: string;
};

const IconContainer = (props: iconProps) => {
  const buttonStyle = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    backgroundColor: props.backgroundColor,
    border: props.border ? `1px solid ${props.borderColor}` : "none",
    margin: ".3rem .5rem",
  };

  return (
    <button
      style={buttonStyle}
      className="btnCont"
      onClick={props.onPress}
      title={props.title}
    >
      <img
        src={props.image}
        alt={props.image}
        style={{
          width: `${props.imageDimensions.width}px`,
          height: `${props.imageDimensions.height}px`,
        }}
      />
    </button>
  );
};

export default IconContainer;

IconContainer.defaultProps = {
  imageDimensions: {
    width: 10,
    height: 10,
  },
};
