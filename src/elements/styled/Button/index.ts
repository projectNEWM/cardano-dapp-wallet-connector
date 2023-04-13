import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-width: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem 0.5rem 0.5rem;
  font-size: 1rem;
  color: #333;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1)
  }
`

export default Button