var app = new Vue({
    data() {
        return {
            navig: "this_all_com",
            all_com: [],
        };
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
                    default() {
                        return [];
                    },
                },
            },
            methods: {
                del(index) {
                    const requestOptions = {
                        method: "DELETE",
                        // body: formData
                    };
                    fetch(
                        "http://coment/public/api/delete/" +
                            this.data[index].id,
                        requestOptions
                    ).then((response) => response.json());
                    location.reload();
                },
            },
        },
        new_com: {
            data() {
                return {
                    text_com: "",
                };
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
                },
            },
        },
        found: {
            template: `
            <div>
            <input @keypress.enter="get_com" class="my_input" v-model="com_text" placeholder="text" type="text">
            <div v-if="found_com.length !== 0">
                <div class="my-cont">
                <div class="col s12 m5">
                    <div class="card-panel teal">
                    <h5 class="card-title">Comment id: {{found_com.id}}</h5>
                    <br>
                    <div class="flex">
                        <span class="white-text over">TEXT: {{found_com.сomment}}
                        </span>
                        <span class="white-text over"> WORDS: {{found_com.key_words}}
                        </span>
                        <span class="white-text over"> LETTERS: {{found_com.key_letters}}
                        </span>
                    </div>
                        <button class="btn waves-effect waves-light red" type="submit" @click="del(index)">delete</button>   
                    </div>
                </div>
                </div>
                </div>
                <div v-if='nof'>
                    <h5>Ничего не найдено </h5>
                </div>
                </div>

            `,
            data() {
                return {
                    com_text: "",
                    found_com: [],
                    nof: false,
                };
            },
            methods: {
                get_com() {
                    this.found_com = [];
                    var formData = new FormData();
                    formData.append("text", this.com_text);
                    axios
                        .post("/public/api/comment/find", formData)
                        .then((response) => {
                            if (response.data) {
                                this.nof = false;
                                this.found_com = response.data;
                            } else {
                                this.nof = true;
                            }
                        });
                },
                del(index) {
                    const requestOptions = {
                        method: "DELETE",
                        // body: formData
                    };
                    fetch(
                        "http://coment/public/api/delete/" +
                            this.data.idindex,
                        requestOptions
                    ).then((response) => response.json());
                    location.reload();
                },
            },
        },
    },
    methods: {
        all: function () {
            const requestOptions = {
                method: "GET",
            };
            fetch("/public/api/comments", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    let res = data.sort((a, b) => b.id - a.id);
                    this.all_com = res;
                });
        },
        switch_child(nav) {
            this.navig = nav;
        },
    },
    created() {
        this.all();
    },
}).$mount("#app");
