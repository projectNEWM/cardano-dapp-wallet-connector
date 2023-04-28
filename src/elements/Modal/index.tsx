import React, { CSSProperties, FunctionComponent, useEffect, useState } from "react";
import { icons } from "assets";
import { Typography } from "elements";
import { ModalProps } from "./types";

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  children,
  title,
  titleIcon,
  onClose,
  isInverted,
  style = {},
  headerStyle = {},
  backgroundOpacity = 0.5,
  ...rest
}) => {
  const [opacity, setOpacity] = useState(0);

  const titleStyle = {
    fontSize: "22px",
    fontWeight: 600,
    textTransform: "capitalize",
    color: isInverted ? "#FFF" : undefined,
  } as CSSProperties;

  useEffect(() => {
    setOpacity(1);
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: `rgba(0,0,0,${backgroundOpacity})`,
        transition: "opacity 0.25s ease-out",
        opacity,
      }}
      {...rest}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "24rem",
          maxHeight: "90vh",
          borderRadius: "0.75rem",
          backgroundColor: "#FFF",
          overflowX: "hidden",
          overflowY: "auto",
          ...style,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            borderTopLeftRadius: "0.75rem",
            borderTopRightRadius: "0.75rem",
            borderBottom: `1px solid ${isInverted ? "#121214" : "#EEE"}`,
            ...headerStyle,
          }}
        >
          {titleIcon ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img src={titleIcon} style={{ width: 36, height: 36, marginRight: "1rem" }} />

              <Typography style={titleStyle}>{title}</Typography>
            </div>
          ) : (
            <>
              <div />

              <Typography style={titleStyle}>{title}</Typography>
            </>
          )}

          <div style={{ cursor: "pointer" }} onClick={onClose}>
            <icons.Close stroke={isInverted ? "#FFF" : "#333"} />
          </div>
        </div>

        <div
          style={{
            padding: "1rem",
            borderBottomLeftRadius: "0.75rem",
            borderBottomRightRadius: "0.75rem",
            overflowY: "scroll",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
