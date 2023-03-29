const startPractice = {
  schema: {},
  init() {
    const scoreUi = document.getElementById('score-title')
    const collectibles = document.querySelectorAll('#collectible')

    const getRandomInt = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    }

    this.el.addEventListener('click', (e) => {
      // turn on score display
      scoreUi.style.display = 'block'
      collectibles.forEach((collectible) => {
        // make each collectible clickable
        collectible.setAttribute('class', 'collidible')
        // send each in a random direction
        collectible.setAttribute('animation__move', {
          property: 'position',
          to: {
            x: getRandomInt(-10, 10),
            y: getRandomInt(0, 20),
            z: getRandomInt(-20, -6),
          },
          dir: 'alternate',
          loop: true,
          easing: 'easeInOutQuad',
        })
      })
    })
  },
}
export { startPractice }
