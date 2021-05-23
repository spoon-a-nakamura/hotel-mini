// https://codepen.io/inlet/pen/VwLLYme
console.clear()

const {
  Stage,
  PixiComponent,
  Container,
  AnimatedSprite: ReactPixiAnimatedSprite,
  useApp,
  useTick,
} = ReactPixi

const [width, height] = [500, 500]
const spritesheet =
  'https://pixijs.io/examples/examples/assets/spritesheet/fighter.json'

const AnimatedSprite = React.memo(({ isPlaying, ...props }) => {
  const animationSprite = React.useRef()

  React.useEffect(() => {
    const sprite = animationSprite.current
    sprite[isPlaying ? 'gotoAndPlay' : 'gotoAndStop'](sprite.currentFrame)
  }, [isPlaying])

  return <ReactPixiAnimatedSprite ref={animationSprite} {...props} />
})

const JetFighter = () => {
  const [frames, setFrames] = React.useState([])
  const [rot, setRot] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const app = useApp()

  useTick((delta) => setRot((r) => r + 0.01 * delta))

  // load
  React.useEffect(() => {
    app.loader.add(spritesheet).load((_, resource) => {
      setFrames(
        Object.keys(resource[spritesheet].data.frames).map((frame) =>
          PIXI.Texture.from(frame)
        )
      )
    })
  }, [])

  if (frames.length === 0) {
    return null
  }

  return (
    <Container
      rotation={rot}
      x={width / 2}
      y={height / 2}
      interactive={true}
      pointerdown={() => setIsPlaying((isPlaying) => !isPlaying)}
    >
      <AnimatedSprite
        animationSpeed={0.5}
        isPlaying={isPlaying}
        textures={frames}
        anchor={0.5}
      />
    </Container>
  )
}

const App = () => (
  <Stage width={width} height={height}>
    <JetFighter />
  </Stage>
)

ReactDOM.render(<App />, document.getElementById('root'))
