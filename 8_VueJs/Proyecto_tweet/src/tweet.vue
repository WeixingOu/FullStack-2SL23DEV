<script>
    export default {
        data() {
            return {
                currenTweet: '',
                tweets: [],
            }
        },
        created() {
            const storedTweets = localStorage.getItem('tweets');
            if (storedTweets) {
                this.tweets = JSON.parse(storedTweets);
            }
        },
        methods: {
            handleySubmit() {
                if (this.currenTweet !== '') {
                    const tweetObj = {
                        id: Date.now(),
                        text: this.currenTweet,
                    };
                    this.tweets.push(tweetObj);
                    this.currenTweet = '';
                    localStorage.setItem('tweets', JSON.stringify(this.tweets));
                }
            },
            detele(id) {
                this.tweets = this.tweets.filter(tweet => tweet.id !== id);
                localStorage.setItem('tweets', JSON.stringify(this.tweets));
            }
        },
    }
</script>

<template>
    <div class="tweetContainer">
        <div class="div">
            <label for="tweet">Tweet:</label>
            <form id="formulario" @submit.prevent="handleySubmit">
                    <label for="tweet"></label>
                    <textarea class="u-full-width" v-model="currenTweet"></textarea>
                    <input type="submit" class="u-full-width" value="Agregar">
            </form>
        </div>
        <div class="div">
            <h2>Mis Tweets</h2>
            <ul id="lista-tweets">
                <li v-for="tweet in tweets" :key="tweet.id">
                {{ tweet.text }} <a @click="detele(tweet.id)">X</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.tweetContainer {
    display: flex;
    gap: 5rem;
}
.div {
    width: 48%;
    float: left;
}
.u-full-width {
    width: 100%;
}
textarea {
    height: 38px;
    background-color: rgb(255, 255, 255);
    box-shadow: none;
    padding: 6px 10px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(209, 209, 209);
    border-image: initial;
    border-radius: 4px;
}
</style>