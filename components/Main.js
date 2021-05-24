import styled from '@emotion/styled'
import { device } from '../components/MediaQuery'
import { Stage, AnimatedSprite } from '@inlet/react-pixi'
import React, { useState, useEffect, useRef } from 'react'
import { sppx, pcpx, pcfz } from './Util'
import { characters } from './characters'

// characterImageLengthには対象となる画像枚数を。directoryIdは対象ディレクトリ名称を
const allImages = (characterImageLength, directoryId) =>
  [...Array(characterImageLength)].map(
    (_, index) => `/images/character/${directoryId}/${index + 1}.png`
  )

// アニメーションさせる画像数を半分にする
// const checkIsOdd = (number) => number % 2 === 1
// const filterOddArray = (array) => array.filter((_, index) => checkIsOdd(index))
// const oddFilteredImages = (characterImageLength, directoryId) =>
//   filterOddArray(allImages(characterImageLength, directoryId))

const [width, height] = [632, 853]

const MemoAnimatedSprite = React.memo(({ isPlaying, ...props }) => {
  console.log('memo')
  const animationSprite = useRef()
  useEffect(() => {
    const sprite = animationSprite.current
    sprite[isPlaying ? 'gotoAndPlay' : 'gotoAndStop'](sprite.currentFrame)
  }, [isPlaying])
  return <AnimatedSprite ref={animationSprite} {...props} />
})

const image = (imageLength, imageSize, isPlaying) => {
  console.log('render image')
  return (
    <Stage
      width={width / imageSize}
      height={height / imageSize}
      options={{
        autoDensity: true,
        backgroundAlpha: 0,
      }}
    >
      <MemoAnimatedSprite
        anchor={0}
        images={imageLength}
        isPlaying={isPlaying}
        initialFrame={0}
        animationSpeed={0.5}
        width={width / imageSize}
        height={height / imageSize}
      />
    </Stage>
  )
}
export default function Main() {
  const [isShowModal, setIsShowModal] = useState(
    [...Array(characters.length)].fill(false)
  )
  const [isPlaying, setIsPlaying] = useState(
    [...Array(characters.length)].fill(false)
  )

  const updateIsPlayingState = (index) => {
    setIsPlaying((currentPlayingState) => {
      const newPlayingState = currentPlayingState.map((state, innerIndex) =>
        index === innerIndex ? !state : state
      )
      return newPlayingState
    })
  }
  const playInModal = (index) => {
    console.log(isPlaying[index])
    setTimeout(() => {
      console.log(isPlaying[index])
      setIsPlaying((currentPlayingState) => {
        const newPlayingState = currentPlayingState.map((_, innerIndex) =>
          index === innerIndex ? true : false
        )
        return newPlayingState
      })
    }, 100)
  }
  const updateIsShowModalState = (index) => {
    setIsShowModal((currentShowModalState) => {
      const newShowModalState = currentShowModalState.map((state, innerIndex) =>
        index === innerIndex ? !state : state
      )
      return newShowModalState
    })
  }
  const hideModal = () => {
    setIsShowModal([...Array(characters.length)].fill(false))
  }
  const stopAll = () => {
    setIsPlaying([...Array(characters.length)].fill(false))
  }
  return (
    <>
      <Wrapper isShowModal={isShowModal.some((value) => value)}>
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
                <Image
                  onClick={() => {
                    updateIsPlayingState(index)
                  }}
                >
                  {image(
                    allImages(character.length, character.id),
                    1.65,
                    isPlaying[index]
                  )}
                  <Star01 />
                  <Star02 />
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
          } else {
            return null
          }
        })}
        <Close
          onClick={() => {
            hideModal(), stopAll()
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
  /* &::before,
  &::after {
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
  } */
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
  &:nth-of-type(4) {
    canvas {
      margin-top: ${sppx(15)};
    }
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
  transition: all ease-in-out 0.3s;
  pointer-events: ${({ isShowModal }) => (isShowModal ? 'initial' : 'none')};
  opacity: ${({ isShowModal }) => (isShowModal ? '1' : '0')};
  /* &::before {
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
  } */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 61.3%;
    width: 110%;
    height: 110%;
    background: #3a4796;
    z-index: -1;
    /* animation: movingBg 3s ease-in-out forwards;
    animation-name: ${({ isShowModal }) =>
      isShowModal ? 'movingBg' : 'none'}; */
  }
  @media ${device.underMobileL} {
    background: #3a4796;
    &::after {
      top: 30%;
      background: #ce4833;
    }
  }
  @keyframes movingBg {
    0% {
      transform: translateY(-170%);
    }
    50% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
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
  position: relative;
  cursor: pointer;
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
  margin-top: ${pcpx(-20)};
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
    font-size: 16vw;
  }
`
const En = styled.span`
  @media ${device.underMobileL} {
    display: block;
    margin-bottom: ${sppx(-25)};
  }
`
const Ja = styled.span`
  font-size: ${pcfz(22)};
  font-weight: bold;
  @media ${device.underMobileL} {
    position: relative;
    top: ${sppx(-10)};
  }
`
const Introduction = styled.p`
  line-height: 2;
  margin-top: ${pcpx(-23)};
  font-size: ${pcfz(20)};
  max-width: ${pcpx(400)};
  @media ${device.underMobileL} {
    margin-top: ${sppx(-23)};
    max-width: 90%;
  }
`
const Border = styled.div`
  margin-top: ${pcpx(30)};
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
  top: ${pcpx(50)};
  right: ${pcpx(50)};
  width: ${pcpx(28)};
  height: ${pcpx(28)};
  background: url(/images/others/close.svg) center / contain no-repeat;
  cursor: pointer;
  @media ${device.underMobileL} {
    top: ${sppx(20)};
    right: ${sppx(20)};
    width: ${sppx(20)};
    height: ${sppx(20)};
  }
`
const Star01 = styled.div`
  position: absolute;
  top: ${pcpx(147)};
  right: ${pcpx(127)};
  width: ${pcpx(24.38)};
  height: ${pcpx(33.6)};
  background: url(/images/others/star01.svg) center / contain no-repeat;
  @media ${device.underMobileL} {
    top: ${sppx(230)};
    right: ${sppx(60)};
    width: ${sppx(19.19)};
    height: ${sppx(26.43)};
  }
`
const Star02 = styled.div`
  position: absolute;
  top: ${pcpx(110)};
  right: ${pcpx(80)};
  width: ${pcpx(44.57)};
  height: ${pcpx(61.41)};
  background: url(/images/others/star02.svg) center / contain no-repeat;
  @media ${device.underMobileL} {
    top: ${sppx(200)};
    right: ${sppx(20)};
    width: ${sppx(35.07)};
    height: ${sppx(48.32)};
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
