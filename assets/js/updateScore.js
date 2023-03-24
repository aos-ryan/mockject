const updateScore = {
  schema: {
    score: { type: 'number', default: 0 },
  },

  init() {
    // attached to the scene, listens for event emitted by the collectible components and adds their
    // value to the score
    this.el.addEventListener('item-collected', (e) => {
      this.el.setAttribute(
        'score',
        (this.data.score += e.detail.collectedWorth)
      )
      document.getElementById('score').innerHTML = this.data.score
    })
  },
}

export { updateScore }
