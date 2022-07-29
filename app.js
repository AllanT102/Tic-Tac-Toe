// gameboard

const Gameboard = (function () {
    let _board = new Array(9)
   
    const getBox = (num) => _board[num]

    const setValue = (num, player) => {
        const htmlField = document.querySelector(`.game-grid:nth-child(${num + 1})`)
        htmlField.textContent = player.getSign()
        getBox(num) = player.getSign()
    }

    const resetBoard = () => {
        _board.forEach(box => box = '')
    }

    return {
        getBox,
        setValue,
        resetBoard
    }
})()

//player

const Player = (sign, name, image) => {
    let _sign = sign
    let _name = name
    let _image = image
    const getSign = () => _sign
    const setSign = (sign) => _sign = sign
    const getName = () => _name
    const setName = (name) => _name = name
    const getImage = () => _image
    const setImage = (image) => _image = image

    return {
        getSign,
        setSign,
        getName,
        setName,
        getImage,
        setImage
    }
}

const GameMenu = (function() {
    let _player1 = Player(null, "Player 1", null)
    let _player2 = Player(null, "Player 2", null)
    const playerSelection = document.querySelectorAll('.player-character')
    const p1options = document.querySelector('[data-poption="p1-op"')
    const p2options = document.querySelector('[data-poption="p2-op"')
    const p1name = document.querySelector('#p1-name')
    const p2name = document.querySelector('#p2-name')
    const playBtn = document.querySelector('.play-button')
    const gameDisplay = document.querySelector('#game-display')


    playerSelection.forEach(sel => {
        sel.addEventListener('click', () => {
            if (sel.classList.contains('pc-active')) {
                _unselectAllOptions(sel.parentElement)
                sel.classList.remove('pc-active')
                sel.classList.add('pchover')
            } else {
                _unselectAllOptions(sel.parentElement)
                sel.classList.add('pc-active')
                sel.classList.remove('pchover')
                _assignPlayerIcon(sel)
            }
        })
    })

    playBtn.addEventListener('click', _switchDisplays)

    function _unselectAllOptions(parent) {
        const children = parent.getElementsByTagName("img")
        for (let child of children) {
            if (child.classList.contains('pc-active')) {
                child.classList.remove('pc-active')
            }
        }
    }

    function _assignPlayerIcon(sel) {
        if (sel.parentElement === p1options) {
            _player1.setImage(sel.getAttribute('src'))
         } else if (sel.parentElement === p2options) _player2.setImage(sel.getAttribute('src'))
    }

    function _checkPlayersReady() {
        return _player1.getImage() != null && _player2.getImage() != null ? true : false
    }

    function _switchDisplays() {
        if (_checkPlayersReady()) {
            _setPlayerInfo()
            const pregameDisplay = document.querySelector('.pregame-screen')
            pregameDisplay.style.animation = "1s ease-out zoom-out"
            setTimeout(function() {
                pregameDisplay.style.visibility = "hidden" 
                gameDisplay.style.animation = "1s ease-out load-zoom"
                gameDisplay.style.visibility = "visible"

                const p1image = document.querySelector('[data-img="p1-img"')
                const p2image = document.querySelector('[data-img="p2-img"')
                p1image.src = _player1.getImage()
                p2image.src = _player2.getImage()
            }, 1000)
        }
    }

    function _setPlayerInfo() {
        let rand = Math.random(2)
        rand === 1
        _player1.setName(p1name.value)
        _player2.setName(p2name.value)
    }

    function getPlayers() {
        let players = []
        players.push(_player1)
        players.push(_player2)
        return players
    }

    return {
        getPlayers
    }
})()

const GameController = (function() {
    let player1 = Player('X')
    let player2 = Player('O')
})





