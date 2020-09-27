import styled from 'styled-components'
import { shade } from 'polished'

import signUpBackground from '../../assets/signUpBackground.jpg'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  margin-bottom: -50px;
`

export const Background = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  background: url(${signUpBackground}) no-repeat;
  background-size: cover;

  h1 {
    color: #fff;
    margin-top: 150px;
    font-family: Ranchers;
    font-size: 100px;
    text-shadow: 0 0 4px #000;
    -moz-text-shadow: 0 0 4px #000;
    -webkit-text-shadow: 0 0 4px #000;
  }

  p {
    color: #fff;
    font-size: 24px;
    text-shadow: 0 0 4px #000;
    -moz-text-shadow: 0 0 4px #000;
    -webkit-text-shadow: 0 0 4px #000;
  }
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 800px;

  h2 {
    font-size: 64px;
  }

  form {
    margin: 80px 0 50px 0;
    width: 340px;
    text-align: center;

    > div {
      margin-bottom: 8px;
    }
  }

  p {
    font-size: 18px;
    a {
      text-decoration: none;
      color: #bf4d7e;

      &:hover {
        color: ${shade(0.3, '#BF4D7E')};
      }
    }
  }
`
