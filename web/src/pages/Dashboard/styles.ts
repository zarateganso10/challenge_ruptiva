import styled from 'styled-components'
import { shade } from 'polished'

import dashboardBackground from '../../assets/dashboardBackground.jpg'

export const Header = styled.header`
  height: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${dashboardBackground}) no-repeat;
  background-size: cover;

  > div {
    display: flex;
    width: 100%;
    margin-bottom: 280px;

    button {
      border: 0 transparent;
      background-color: transparent;
      display: flex;
      align-items: center;
      color: #bf4d7e;
      transition: color 0.2s;

      span {
        font-size: 24px;
      }

      &:hover {
        color: ${shade(0.3, '#BF4D7E')};
      }
    }
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 60px;

    div {
      margin-right: 10px;
    }

    button {
      margin-top: 2px;
    }
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Card = styled.div`
  margin-top: 50px;
  width: 40%;
  height: 150px;
  padding: 24px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s;

  button {
    width: 30px;
    background-color: transparent;
    border: 0 transparent;
    margin-top: -100px;
    margin-right: -15px;

    img {
      height: 15px;
      width: 15px;
    }
  }

  strong {
    font-size: 24px;
    font-weight: bold;
    margin-right: 10px;
  }

  span {
    font-size: 50px;
  }

  div {
    width: 100%;
    height: 100%;
  }

  &:hover {
    background: ${shade(0.3, '#FFF')};
  }
`
