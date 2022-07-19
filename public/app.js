document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

document.addEventListener('click', event => {
    if (event.target.dataset.type === 'update') {
        const id = event.target.dataset.id
        const li = event.target.closest('li')
        const res = prompt('Введите новое название')
        if (res) {
            update(id, res).then(() => {
                li.firstChild.remove()
                li.prepend(res)
            })
        }
    }
})
async function update(id, title) {
    await fetch(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
}