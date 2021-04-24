const deleteBtn = document.querySelectorAll('.delete-btn')
const charSelect = document.querySelectorAll('.character-card span')
const charSelectActive = document.querySelectorAll('.character-card span.active-char')

Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteChar)
})

Array.from(charSelect).forEach((el) => {
    el.addEventListener('click', toggleActiveChar)
})

Array.from(charSelectActive).forEach((el) => {
    el.addEventListener('click', undoToggleActiveChar)
})

async function deleteChar() {
    const charText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('deleteChar', {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'targetText': charText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function toggleActiveChar() {
    const charText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('toggleActiveChar', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'targetText': charText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function undoToggleActiveChar() {
    const charText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('undoToggleActiveChar', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'targetText': charText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}