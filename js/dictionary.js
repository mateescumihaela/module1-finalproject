class Dictionary {

    constructor() {
      this.words = ["word1", "word2", "word3"]
    }
  
    randomWord() {
      const randomIdx = Math.floor(Math.random() * this.words.length)
      return this.words[randomIdx]
    }
    
  }