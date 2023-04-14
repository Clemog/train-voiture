import React from 'react'
import styled from 'styled-components'

import CheckBox from './CheckBox'

const Wrapper = styled.div`
  margin-bottom: 1rem;

  input {
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
    cursor: pointer;
  }
`
const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.5rem 0.5rem 0.75rem;
  color: ${(props) => (props.checked ? 'white' : 'black')};
  line-height: 1.2;
  background-color: ${(props) => (props.checked ? 'black' : 'transparent')};
  border: 0.075rem solid;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 300ms ease-out;
`
export default function RadioInput(props) {
  return (
    <Wrapper>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <Label htmlFor={props.id} checked={props.checked}>
        <CheckBox checked={props.checked} /> {props.label}
      </Label>
    </Wrapper>
  )
}
