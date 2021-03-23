var app = new Vue({
    data() {
        return {
            navig: 'this_all_com',
            all_com: []
        }
    },

    components: {
        this_all_com: {
            template: `
            <div>
            <div
              v-for="(com, index) in data"
              :key="index"
            >
                <div class="my-cont">
                <div class="col s12 m5">
                    <div class="card-panel teal">
                    <h5 class="card-title">Comment id: {{com.id}}</h5>
                    <br>
                    <div class="flex">
                        <span class="white-text over">TEXT: {{com.сomment}}
                        </span>
                        <span class="white-text over"> WORDS: {{com.key_words}}
                        </span>
                        <span class="white-text over"> LETTERS: {{com.key_letters}}
                        </span>
                    </div>
                        <button class="btn waves-effect waves-light red" type="submit" @click="del(index)">delete</button>   
                    </div>
                </div>
                </div>
                </div>
                </div>

            `,
            props: {
                data: {
                    type: Array,
                    default () {
                        return [];
                    },
                }
            },
            methods: {
                del(index) {
                    const requestOptions = {
                        method: "DELETE"
                        // body: formData
                    };
                    fetch("http://coment/public/api/delete/" + this.data[index].id, requestOptions)
                        .then((response) => response.json())
                    location.reload()
                }
            },
        },
        new_com: {
            data() {
                return {
                    text_com: ''
                }
            },
            template: `
                <div>
                    <h2>Создать</h2>
                    <hr/>
                    <textarea
                    v-model="text_com"
                    placeholder="текст"
                  ></textarea>
                     <button class="btn waves-effect waves-light" type="submit" @click="send">send</button>   
                     
                </div>`,

            methods: {
                send: function () {
                    var formData = new FormData();
                    formData.append("text", this.text_com);
                    axios
                        .post("/public/api/comment", formData)
                        .then((response) => {
                            if (response.data) {
                                location.reload();
                            }
                        });
                }
            }

        },
        found: {
            template: `
            <div>
            <input class="my_input" v-model="com_id" placeholder="id" type="number" min="0">
            <div
              v-for="(com, index) in data"
              :key="index"
            >
                <div v-if="com.id == com_id" class="my-cont">
                <div class="col s12 m5">
                    <div class="card-panel teal">
                    <h5 class="card-title">Comment id: {{com.id}}</h5>
                    <br>
                    <div class="flex">
                        <span class="white-text over">TEXT: {{com.сomment}}
                        </span>
                        <span class="white-text over"> WORDS: {{com.key_words}}
                        </span>
                        <span class="white-text over"> LETTERS: {{com.key_letters}}
                        </span>
                    </div>
                        <button class="btn waves-effect waves-light red" type="submit" @click="del(index)">delete</button>   
                    </div>
                </div>
                </div>
                </div>
                </div>

            `,
            data() {
                return {
                    com_id: ''
                }
            },
            props: {
                data: {
                    type: Array,
                    default () {
                        return [];
                    },
                }
            },

        }
    },
    methods: {
        all: function () {
            const requestOptions = {
                method: "GET"
            };
            fetch("http://coment/public/api/comments", requestOptions)
                .then((response) => response.json())
                .then(data => {
                    this.all_com = data
                });
        },
        switch_child(nav) {
            this.navig = nav;
        }

    },
    created() {
        this.all();
    }


}).$mount('#app');
