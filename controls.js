class Controls {
  constructor(){
    this.forward=false
    this.left=false
    this.right=false
    this.reverse=false
    this.space=false

    this.#addListeners()
  }

  // Hashtag means its private
  #addListeners(){
    // On key down
    document.onkeydown= (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left=true
          break;
          
        case "ArrowUp":
          this.forward=true
          break;
          
        case "ArrowDown":
          this.reverse=true
          break;
          
        case "ArrowRight":
          this.right=true
          break;
        
        case " ":
          this.space=true
          break;
      }
    }

    // On key up
    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left=false
          break;

        case "ArrowUp":
          this.forward=false
          break;

        case "ArrowDown":
          this.reverse=false
          break;

        case "ArrowRight":
          this.right=false
          break;
        case "SpaceBar":
          this.space=false
          break;
      }
    }
  }
}
