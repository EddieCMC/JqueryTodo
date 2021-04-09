var todos = []
var id = 1

function setData(){
    window.localStorage.setItem('todoapp', JSON.stringify(todos))
}

$(document).ready(function() {
    const todoData = window.localStorage.getItem('todoapp')
    if (todoData) {
        todos = JSON.parse(todoData)
        for(var i=0; i<todos.length; i++){
            $('.list').append(
                `<div class="list-item ${todos[i].isComplete ? 'uncompleted' : ''}" data-id="${todos[i].id}">
                    <div class="list-item__state">${todos[i].isCompleted ? 'O' : 'X'}</div>
                    <div class="list-item__content">${todos[i].text}</div>
                    <div class="list-item__action">
                    <button class="list-item__delete">delete</button>
                    <button class="list-item__mark">${todos[i].isCompleted ? '標示成未完成' : '標示成已完成'}</button>
                    </div>
                </div>`
            )
        }
        id = todos[todos.length - 1].id + 1
    }

    $('.add-todo').click(function(){
        const text = $('input[name=todo]').val()
        todos.push({
            text: text,
            isCompleted: false,
            id: id
        })
        setData()
        $('.list').append(
            `<div class="list-item uncompleted" data-id="${id}">
                <div class="list-item__state">X</div>
                <div class="list-item__content">${text}</div>
                <div class="list-item__action">
                <button class="list-item__delete">delete</button>
                <button class="list-item__mark">標示成已完成</button>
                </div>
            </div>`
        )
        $('input[name=todo]').val('');
        id++
    })
    $('.list').on('click', '.list-item__mark', function(e) {
        const $item = $(e.target)
        const state = $item.parent().parent().find('.list-item__state').text()
        const id = Number($item.parent().parent().attr("data-id"))

        if (state === 'O'){
            $item.parent().parent().find('.list-item__state').text('X')
            $item.parent().parent().addClass('uncompleted')
            $item.text('標示成已完成')
        }
        else{
            $item.parent().parent().find('.list-item__state').text('O')
            $item.parent().parent().removeClass('uncompleted')
            $item.text('標示成未完成')
        }

        todos = todos.map(todo => {
            if (todo.id !== id) {
                return todo}

            return {
                ...todo,
                isCompleted: !todo.isCompleted
            }
        })
        setData()
        
    })
    $('.list').on('click', '.list-item__delete', function(e) {
        const id = $(e.target).parent().parent().attr('data-id')
        todos = todos.filter(todo => todo.id !== Number(id))
        $(e.target).parent().parent().remove();
        setData();
    })

    $('.filters__all').click(function(){
        $('.list-item').show()
    })

    $('.filters__completed').click(function(){
        $('.list-item').hide()
        $('.list-item.uncompleted').show()
    })
    
})