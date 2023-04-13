import React, { FunctionComponent, ReactNode, useEffect, useState } from "react"
import { icons } from "assets"

interface Props {
  readonly onClose: VoidFunction
  readonly title?: string
  readonly children: ReactNode
}

const Modal: FunctionComponent<Props> = ({ 
  children, 
  title, 
  onClose, 
  ...rest
}) => {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setOpacity(1)
  }, [])

  return (
    <div 
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
        backgroundColor: "rgba(0,0,0,0.15)",
        transition: "opacity 0.25s ease-out",
        opacity,
      }} 
      {...rest}
    >
      <div style={{ 
        backgroundColor: "white", 
        borderRadius: "0.75rem", 
        padding: "1rem", 
      }}>
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "0.5rem",
          }}
        >
          <div />

          {title || <div />}
        
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