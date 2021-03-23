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
                    <span class="card-title">Comment id: {{com.id}}</span>
                    <br>
                    <span class="white-text">text: {{com.сomment}}
                    <br>
                    </span>
                    <span class="white-text over">KEY WORDS: {{com.key_words}}
                    </span>
                    <br>
                    <span class="white-text over">key letters: {{com.key_letters}}
                    </span>
                    <br>
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
                    <h2>Добавить</h2>
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

        }
    },
    methods: {
        all: function () {
            // let formData = {
            //     'phone': this.phone,
            //     'password': this.password
            // }
            const requestOptions = {
                method: "GET"
                // body: formData
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
