import styled from '@emotion/styled'
import { device } from '../components/MediaQuery'
import { Stage, AnimatedSprite } from '@inlet/react-pixi'
import { useState, useEffect } from 'react'

// アニメーションさせる画像を定義（Arrayの中にはファイル数量を記載）
const allImages = [...Array(90)].map(
  (_, index) => `/images/character/01/${index + 1}.png`
)

// アニメーションさせる画像数を半分にする
const checkIsOdd = (number) => number % 2 === 1
const filterOddArray = (array) => array.filter((_, index) => checkIsOdd(index))
const oddFilteredImages = filterOddArray(allImages)

const [width, height] = [632, 853]
const image = (images, speed) => (
  <Stage
    width={width / 2}
    height={height / 2}
    options={{
      autoDensity: true,
      backgroundAlpha: 0,
    }}
  >
    <AnimatedSprite
      anchor={0}
      images={images}
      isPlaying={true}
      initialFrame={0}
      animationSpeed={speed}
      width={width / 2}
      height={height / 2}
    />
  </Stage>
)
export default function Main() {
  const [isSpeed, setIsSpeed] = useState(0.4)

  // Pixiを描画するタイミングを調整しないといけないのだが、今はこれしか思い浮かばない
  useEffect(() => {
    setTimeout(() => {
      setIsSpeed(isSpeed + 0.1)
    }, 1000)
  }, [])

  console.log(isSpeed)

  return (
    <>
      <Wrapper>
        <Title>
          <Logo src='/images/others/logo.svg' alt='Hotel Mini' />
          <Hotel src='/images/others/hotel.svg' alt='' />
        </Title>
        <Characters onClick={() => setIsSpeed(isSpeed + 0.01)}>
          <List number='01'>{image(allImages, isSpeed)}</List>
          <List number='02'>{image(allImages, isSpeed)}</List>
          <List number='03'>{image(allImages, isSpeed)}</List>
          <List number='04'>{image(allImages, isSpeed)}</List>
          <List number='05'>{image(allImages, isSpeed)}</List>
          <List number='06'>{image(allImages, isSpeed)}</List>
        </Characters>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 50px;
  border: 5px solid #3a4796;
  &::before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(/images/others/texture.png) center / cover no-repeat;
    mix-blend-mode: multiply;
    pointer-events: none;
  }
  @media ${device.underMobileL} {
    height: auto;
    flex-direction: column;
    padding: 20px;
  }
`
const Title = styled.div`
  width: 30%;
  margin-right: 50px;
  @media ${device.underMobileL} {
    width: 100%;
    margin-right: 0;
    margin-bottom: 50px;
  }
`

const Logo = styled.img`
  width: 100%;
`

const Hotel = styled.img`
  width: 100%;
`
const Characters = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 60%;
  @media ${device.underMobileL} {
    width: 100%;
    justify-content: space-between;
  }
`
const List = styled.li`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 3%;
  background: ${({ number }) =>
    `url(/images/character/${number}.svg) center /98% no-repeat`};
  &:not(:nth-of-type(3n)) {
    margin-right: 3%;
  }
  @media ${device.underMobileL} {
    width: 48%;
    &:not(:nth-of-type(3n)) {
      margin-right: 0;
    }
  }
`
// const Character = styled.img`
//   width: 100%;
//   transform: scale(1.1);
// `
