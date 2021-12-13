new Vue({
    el: "#app",
    data: {
        myGuess: "",
        message: "Guess a letter",
        usedLetters: [],
        target: "pirate",
        displayWord: "",
        strikes: 0,
        gameOver: false,
    },
    methods: {
        addItem() {
            if (this.gameOver != true) {
                this.myGuess = this.myGuess.toLowerCase();
                if (/[a-z]/.test(this.myGuess)) {
                    if (!this.usedLetters.includes(this.myGuess)) {
                        this.usedLetters.push(this.myGuess);
                        this.usedLetters.sort();
                        if (!this.target.includes(this.myGuess)) {
                            ++this.strikes;
                        }
                    }
                    this.updateWord(this.myGuess);
                } else {
                    this.message = "Your guess was not a letter, try again";
                }

                //check for loss
                if (this.strikes === 6) {
                    this.message = `Sorry, you've lost, the word was: ${this.target}. Please try again!`;
                    this.gameOver = true;
                }

                //check for win
                if (!this.displayWord.includes("-")) {
                    this.message = "You've won, Congrats!!";
                    this.gameOver = true;
                }

                console.log("Strinkes: ", this.strikes);
            }
            this.myGuess = "";
        },

        updateWord(letter) {
            let toUpdate = "";
            for (let i = 0; i < this.target.length; ++i) {
                if (this.target[i] === letter) {
                    toUpdate = toUpdate + letter;
                } else if (this.displayWord[i] != "-") {
                    toUpdate = toUpdate + this.displayWord[i];
                } else {
                    toUpdate = toUpdate + "-";
                }
            }
            this.displayWord = toUpdate;
        },

        genDisplay() {
            this.displayWord = "";
            for (let i = 0; i < this.target.length; ++i) {
                this.displayWord = this.displayWord + "-";
            }
        },

        async getList(url) {
            const reply = await fetch(url).then((response) => {
                let data = response.json();
                return data;
            });
            return reply;
        },

        async gatherList() {
            let url = "./static/JSON/words.JSON";
            let data = await this.getList(url);
            return data;
        },

        async chooseWord() {
            let wordList = await this.gatherList();
            let choice = Math.round(Math.random() * wordList.length-1);
            this.target = wordList[choice];
            // console.log(choice);
            console.log(this.target);
            this.genDisplay();
        },

        reset() {
            this.message = "Guess a letter";
            this.usedLetters = [];
            this.strikes = 0;
            this.gameOver = false;
            this.chooseWord();
        },
    },
    beforeMount() {
        this.chooseWord();
    },
});
