import React, { FunctionComponent, HTMLAttributes, useEffect, useState } from "react"
import { icons } from "assets"
import Typography from "elements/Typography"

interface Props extends HTMLAttributes<HTMLDivElement> {
  readonly onClose: VoidFunction
  readonly title?: string
  readonly titleIcon?: string
}

const Modal: FunctionComponent<Props> = ({ 
  children, 
  title, 
  titleIcon,
  onClose, 
  style,
  ...rest
}) => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setOpacity(1)
  }, [])

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
        backgroundColor: "rgba(0,0,0,0.25)",
        transition: "opacity 0.25s ease-out",
        fontFamily: "Arial",
        opacity,
      }} 
      {...rest}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          backgroundColor: "white", 
          borderRadius: "0.75rem", 
          padding: "1.25rem", 
          width: "100%",
          maxWidth: "24rem",
          ...style,
        }}
      >
        <div 
          style={{ 
            display: "flex", 
            flexDirection: "row",
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "1rem",
            padding: "0 0.5rem",
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
              <img 
                src={titleIcon} 
                style={{ width: 36, height: 36, marginRight: "1rem" }}
              />

              <Typography 
                style={{ 
                  fontSize: "24px", 
                  fontWeight: 600, 
                  textTransform: "capitalize", 
                }}
              >
                {title}
              </Typography>
            </div>
          ) : (
            <>
              <div />

              <Typography style={{ fontSize: "24px", fontWeight: 600 }}>
                {title}
              </Typography>
            </>
          )}
        
          <img 
            style={{ cursor: "pointer" }}
            src={icons.close} 
            onClick={onClose} 
          />
        </div>

        {children}
      </div>
    </div>
  )
}

export default Modal