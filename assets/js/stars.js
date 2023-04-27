const glowingStars = {
  schema: {
    count: { default: 50 },
  },
  init: function () {
    const count = this.data.count
    const colors = ['#ffffff', '#ffff00', '#00ffff']

    for (let i = 0; i < count; i++) {
      const star = document.createElement('a-sphere')
      star.setAttribute('position', {
        x: Math.floor(Math.random() * (40 - -20 + 1) + -40),
        y: Math.floor(Math.random() * (40 - 20 + 1) + 20),
        z: Math.floor(Math.random() * (-10 - -50 + 1) + -50),
      })
      star.setAttribute('radius', 0.01 + Math.random() * 0.1)
      star.setAttribute(
        'color',
        colors[Math.floor(Math.random() * colors.length)]
      )

      star.setAttribute('material', 'shader: pulse;')

      this.el.appendChild(star)
    }
  },
}
export { glowingStars }
