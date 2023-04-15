import React, { ComponentPropsWithoutRef } from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";

interface Props extends ComponentPropsWithoutRef<"button"> {
  readonly iconLeft?: string
  readonly iconRight?: string
  readonly isFullWidth?: boolean
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-width: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  font-size: 1rem;
  font-family: Arial;
  color: #333;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1)
  }
`
const Button: FunctionComponent<Props> = ({ 
  iconLeft,
  iconRight, 
  isFullWidth = false, 
  children, 
  style,
  ...rest
}) => {
  return (
    <StyledButton 
      style={{ 
        width: isFullWidth ? "100%" : undefined, 
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ...style,
      }} 
      {...rest}
    >
      {!!iconLeft && (
        <img 
          src={iconLeft} 
          style={{ 
            marginRight: "0.5rem", 
            width: 32, 
            height: 32,
          }} 
        />
      )}

      {children}

      {!!iconRight && (
        <img 
          src={iconRight} 
          style={{ 
            marginLeft: "auto", 
            width: 32, 
            height: 32,
          }} 
        />
      )}
    </StyledButton>
  )
}
  
export default Button