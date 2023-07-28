<script setup>
    import inputView from './inputView.vue';
    import { reactive } from 'vue';
    let boards = reactive([]);

    function handleNewItem(text, board) {
        board.items.push({
            id: crypto.randomUUID(),
            title: text.value
        })
    }

    function handleNewBoard() {
        const name = prompt('Name of the board: ');
        if (!!name) {
            boards.push({
                id: crypto.randomUUID(),
                name: name,
                items: [],
            })
        }
    }

    function startDrag(e, board, item) {
        e.dataTransfer.setData('text/plain', JSON.stringify({boardId: board.id, itemId: item.id}));
    }

    function onDrop(e, dest) {
        const {boardId, itemId} = JSON.parse(e.dataTransfer.getData('text/plain'));

        const originBoard = boards.find(item => item.id === boardId);
        const originItem = originBoard.items.find(item => item.id === itemId);

        dest.items.push({...originItem});
        originBoard.items = originBoard.items.filter(item => item !== originItem);
    }
</script>

<template>
    <div class="ul-container">
        <ul>
            <li><a href="#" @click.prevent="handleNewBoard">Create board</a></li>
        </ul>
    </div>

    <div class="boards-container">
        <div class="boards" @drop="onDrop($event, board)" @dragover.prevent @dragenter.prevent v-for="board in boards" :key="board.id">
            <div>
                {{ board.name }}
            </div>
            <inputView @on-new-item="( text ) => handleNewItem(text, board)" />
            <div class="items">
                <div class="item" draggable="true" @dragstart="startDrag($event, board, item)" v-for="item in board.items" :key="item.id">
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .ul-container {
        display: flex;
        justify-content: center;
        margin: 10px auto;
    }
    .ul-container li a {
        color: cadetblue;
        font-size: xx-large;
    }
    .boards-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
    }
    .boards {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .board {
        background: #efefefef;
        padding: 10px;
    }
    .items{
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .item {
        background: #f7f7f7;
        padding: 10px;
    }
</style>