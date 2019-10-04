'use strict';
import Demineur, {Mine, Num} from './Demineur.js';

const demineur = new Demineur();

const app = new Vue({
  el: '#demineur',
  data: {
    grid: demineur.grid,
    textInfo: '',
    endOfTheGame: false,
  },
  methods:{
    revealedCase: function (x,y) {
      if (!this.endOfTheGame){
      demineur.click(x,y);
      this.endOfTheGame = false;
        if (demineur.isLose){
          this.textInfo = "PERDU";
          this.endOfTheGame = true;
        }
        else if (demineur.isGameOver){
          this.textInfo = "GAGNER";
          this.endOfTheGame = true;
        }
      }
    },
    flagCase: function (x,y) {
      document.oncontextmenu = new Function("return false");
      demineur.flag(x,y);
    }
  }
});
