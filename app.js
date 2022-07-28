// gameboard

const Gameboard = (function () {
    let _board = new Array(9)
   
    const getBox = (num) => board[num]

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
    let _player1 = Player(null, null, null)
    let _player2 = Player(null, null, null)
    const playerSelection = document.querySelectorAll('.player-character')
    const p1options = document.querySelector('[data-poption="p1-op"')
    const p2options = document.querySelector('[data-poption="p2-op"')


    playerSelection.forEach(sel => {
        sel.addEventListener('click', () => {
            if (sel.classList.contains('pc-active')) {
                _unselectAllOptions(sel.parentElement)
                sel.classList.remove('pc-active')
                sel.classList.add('pchover')
                _assignPlayerIcon(sel)
            } else {
                sel.classList.add('pc-active')
                sel.classList.remove('pchover')
            }
        })
    })

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
            _player1.setImage(sel.getAttribute('data-player'))
            console.log(sel.getAttribute('data-player'))
         } else if (sel.parentElement === p2options) _player2.setImage(sel.getAttribute('data-plyaer'))
    }
})()

const GameController = (function() {
    let player1 = Player('X')
    let player2 = Player('O')
})





