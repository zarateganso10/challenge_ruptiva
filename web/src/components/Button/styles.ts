import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
  background: #bf4d7e;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  height: 56px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.3, '#BF4D7E')};
  }
`
