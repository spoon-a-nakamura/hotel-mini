import styled from '@emotion/styled'
import { device } from '../components/MediaQuery'
import { Stage, AnimatedSprite } from '@inlet/react-pixi'
import { useState, useEffect } from 'react'
import { sppx, pcpx, pcfz } from './Util'
import { characters } from './characters'

// characterSizeには対象となる画像枚数を。directoryIdは対象ディレクトリ名称を
const allImages = (characterSize, directoryId) =>
  [...Array(characterSize)].map(
    (_, index) => `/images/character/${directoryId}/${index + 1}.png`
  )

// アニメーションさせる画像数を半分にする
// const checkIsOdd = (number) => number % 2 === 1
// const filterOddArray = (array) => array.filter((_, index) => checkIsOdd(index))
// const oddFilteredImages = (characterSize, directoryId) =>
//   filterOddArray(allImages(characterSize, directoryId))

const [width, height] = [632, 853]
const image = (imageLength, speed, imageSize, isPlaying) => (
  <Stage
    width={width / imageSize}
    height={height / imageSize}
    options={{
      autoDensity: true,
      backgroundAlpha: 0,
    }}
  >
    <AnimatedSprite
      anchor={0}
      images={imageLength}
      isPlaying={isPlaying}
      initialFrame={0}
      animationSpeed={speed}
      width={width / imageSize}
      height={height / imageSize}
    />
  </Stage>
)

export default function Main() {
  const [isSpeed, setIsSpeed] = useState(0.4)
  const [isShowModal, setIsShowModal] = useState(
    [...Array(characters.length)].fill(false)
  )
  const [isPlaying, setIsPlaying] = useState(
    [...Array(characters.length)].fill(false)
  )

  // Pixiを描画するタイミングを調整しないといけないのだが、今はこれしか思い浮かばない
  useEffect(() => {
    setTimeout(() => {
      setIsSpeed(isSpeed + 0.1)
    }, 5000)
  }, [])

  console.log(isSpeed)

  const updateIsPlayingState = (index) => {
    !isShowModal.some((value) => value) &&
      setIsPlaying((currentPlayingState) => {
        const newPlayingState = currentPlayingState.map((state, innerIndex) =>
          index === innerIndex ? !state : state
        )
        return newPlayingState
      })
  }
  const playInModal = (index) => {
    isShowModal.some((value) => value) &&
      setIsPlaying((currentPlayingState) => {
        const newPlayingState = currentPlayingState.map((innerIndex) =>
          index === innerIndex ? true : false
        )
        return newPlayingState
      })
  }
  const stopAll = () => {
    isShowModal.some((value) => value) &&
      setIsPlaying([...Array(characters.length)].fill(false))
  }
  const updateIsShowModalState = (index) => {
    setIsShowModal((currentShowModalState) => {
      const newShowModalState = currentShowModalState.map((state, innerIndex) =>
        index === innerIndex ? !state : state
      )
      return newShowModalState
    })
  }
  const disableAll = () => {
    setIsShowModal([...Array(characters.length)].fill(false))
  }
  return (
    <>
      <Wrapper>
        <Title>
          <Logo src='/images/others/logo.svg' alt='Hotel Mini' />
          <Hotel src='/images/others/hotel.svg' alt='' />
        </Title>
        <Character src='/images/others/ttl.svg' alt='Character' />
        <Characters>
          {characters.map((character, index) => {
            return (
              <List
                key={character.id}
                number={character.id}
                onClick={() => {
                  updateIsShowModalState(index), playInModal(index)
                }}
                onMouseEnter={() => updateIsPlayingState(index)}
                onMouseLeave={() => updateIsPlayingState(index)}
              >
                {image(
                  allImages(character.length, character.id),
                  isSpeed,
                  2,
                  isPlaying[index]
                )}
              </List>
            )
          })}
        </Characters>
      </Wrapper>
      <Modal isShowModal={isShowModal.some((value) => value)}>
        {characters.map((character, index) => {
          if (isShowModal.findIndex((value) => value) === index) {
            return (
              <Inner key={character.id}>
                <Image>
                  {image(
                    allImages(character.length, character.id),
                    isSpeed,
                    1.65,
                    isPlaying[index]
                  )}
                </Image>
                <Profile>
                  <Name>
                    <En>{character.en}</En>
                    <Ja>（{character.ja}）</Ja>
                  </Name>
                  <Introduction>{character.intro}</Introduction>
                  <Border />
                </Profile>
              </Inner>
            )
          }
        })}
        )
        <Close
          onClick={() => {
            disableAll(), stopAll()
          }}
        />
      </Modal>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
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
    padding: ${sppx(16)};
  }
`
const Title = styled.div`
  width: ${pcpx(339.95)};
  height: ${pcpx(603.88)};
  margin-right: ${pcpx(50)};
  @media ${device.underMobileL} {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: ${sppx(50)};
  }
`
const Logo = styled.img`
  width: 100%;
  margin-bottom: ${pcpx(50)};
  @media ${device.underMobileL} {
    width: ${sppx(192.98)};
    height: ${sppx(118.21)};
    margin: 0 auto ${sppx(50)};
    display: block;
  }
`
const Hotel = styled.img`
  width: 100%;
  @media ${device.underMobileL} {
    width: ${sppx(339.95)};
    height: ${sppx(349.93)};
    margin: 0 auto;
    display: block;
  }
`
const Character = styled.img`
  @media ${device.overMobileL} {
    display: none;
  }
`
const Characters = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: ${pcpx(914.68)};
  height: ${pcpx(700)};
  @media ${device.underMobileL} {
    width: 100%;
    height: auto;
    justify-content: space-between;
    margin-top: ${sppx(50)};
  }
`
const List = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: ${pcpx(20)};
  cursor: pointer;
  background: ${({ number }) =>
    `url(/images/character/pc/${number}.svg) center /contain no-repeat`};
  width: ${({ number }) =>
    number === '01'
      ? pcpx(311.36)
      : number === '02'
      ? pcpx(291.96)
      : number === '03'
      ? pcpx(311.36)
      : number === '04'
      ? pcpx(330.76)
      : number === '05'
      ? pcpx(272.56)
      : number === '06'
      ? pcpx(301.66)
      : 'initial'};
  height: ${pcpx(340)};
  &:last-child {
    margin-left: auto;
  }
  @media ${device.underMobileL} {
    background: ${({ number }) =>
      `url(/images/character/sp/${number}.svg) center /contain no-repeat`};
    width: ${({ number }) =>
      number === '01'
        ? sppx(169.45)
        : number === '02'
        ? sppx(159.2)
        : number === '03'
        ? sppx(170.01)
        : number === '04'
        ? sppx(158.49)
        : number === '05'
        ? sppx(158.74)
        : number === '06'
        ? sppx(169.45)
        : 'initial'};
    height: ${sppx(152.07)};
    &:nth-of-type(2n) {
      margin-left: auto;
    }
    &:nth-of-type(3) {
      margin-top: ${sppx(10)};
    }
    &:nth-of-type(4) {
      height: ${sppx(142.07)};
    }
    &:nth-of-type(5) {
      margin-top: ${sppx(10)};
    }
    &:nth-of-type(6) {
      height: ${sppx(162.07)};
    }
  }
  canvas {
    pointer-events: none;
    max-width: 70%;
    height: initial !important;
    object-fit: contain;
  }
`
const Modal = styled.div`
  position: fixed;
  background: #ce4833;
  border: 5px solid #3a4796;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: ${({ isShowModal }) => (isShowModal ? 'initial' : 'none')};
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 60%;
    width: 100%;
    height: 100%;
    background: #3a4796;
    z-index: -1;
  }
  opacity: ${({ isShowModal }) => (isShowModal ? '1' : '0')};
  @media ${device.underMobileL} {
    background: #3a4796;
    &::after {
      top: 30%;
      background: #ce4833;
    }
  }
`

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media ${device.underMobileL} {
    flex-direction: column;
  }
`
const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${pcpx(583.58)};
  height: ${pcpx(637.26)};
  margin-right: ${pcpx(100)};
  background: url(/images/character/sp/01.svg) center / contain no-repeat;
  canvas {
    width: ${pcpx(373.41)} !important;
    height: ${pcpx(515.87)} !important;
  }
  @media ${device.underMobileL} {
    width: ${sppx(316)};
    height: ${sppx(278.21)};
    margin-right: 0;
    canvas {
      width: ${sppx(169)} !important;
      height: ${sppx(234.1)} !important;
    }
  }
`
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-top: ${pcpx(-88)};
  @media ${device.underMobileL} {
    margin-top: ${sppx(50)};
    margin-right: auto;
    margin-left: 8vw;
  }
`

const Name = styled.h2`
  font-family: funkydori, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: ${pcfz(100)};
  @media ${device.underMobileL} {
    font-size: 18vw;
  }
`
const En = styled.span``
const Ja = styled.span`
  font-size: ${pcfz(22)};
  font-weight: bold;
`
const Introduction = styled.p`
  line-height: 2;
  margin-top: ${pcpx(-23)};
  font-size: ${pcfz(20)};
  max-width: ${pcpx(400)};
  @media ${device.underMobileL} {
    margin-top: ${sppx(-23)};
  }
`
const Border = styled.div`
  margin-top: ${pcpx(63)};
  width: ${pcpx(428.18)};
  height: ${pcpx(38.18)};
  background: url(/images/others/border.svg) center / contain no-repeat;
  @media ${device.underMobileL} {
    width: ${sppx(324)};
    height: ${sppx(28.18)};
    left: -5px;
    position: relative;
  }
`
const Close = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 28px;
  height: 28px;
  background: url(/images/others/close.svg) center / contain no-repeat;
  cursor: pointer;
  @media ${device.underMobileL} {
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
  }
`
const Pc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.underMobileL} {
    display: none;
  }
`
const Sp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${device.overMobileL} {
    display: none;
  }
`
