const app = new Vue({
    el: "#root",

    data: {
        lastAccess: dayjs().format('H:mm'),
        pointer: 0,
        menuClicked: "",
        clicked: false,
        activeClass: "",
        messageText: "",
        vocalClicked: false,

        newMessageReceived: {
            date: '',
            text: '',
            status: 'received',

        },
        searchInput: "",
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                        readClass: "read"

                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                        readClass: "read"
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent',
                        readClass: "read"

                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent',
                        readClass: "read"
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',
                        readClass: "read"
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent',
                        readClass: "read"
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],

    },

    methods: {

        addNewMessage() {
            //console.log(this.newMessage.text);
            let currentData = dayjs().format('DD/MM/YYYY H:mm:ss')
            let lastAcces = dayjs().format('H:mm')
            let newMessage = {
                date: '',
                text: '',
                status: 'sent',
                readClass: "unread"
            }
            newMessage.date = currentData
            newMessage.text = this.messageText
            this.lastAccess = lastAcces
            //console.log(this.newMessage);

            this.contacts[this.pointer].messages.push(newMessage)
            this.messageText = ""

            setTimeout(function () {
                app.contacts[app.pointer].messages[app.contacts[app.pointer].messages.length - 1].readClass = "read"
            }, 2000)

            setTimeout(function () {
                //console.log(this);
                let newcurrentData = dayjs().format('DD/MM/YYYY H:mm:ss')
                app.newMessageReceived.date = newcurrentData
                app.newMessageReceived.text = "Ok"

                app.contacts[app.pointer].messages.push(app.newMessageReceived)
            }, 4000)


        },

        showMenu(index) {
            if (!this.clicked) {
                this.clicked = true
                this.activeClass = "active"
                this.menuClicked = index
                //console.log(index);
            } else {
                this.clicked = false
                this.activeClass = ""
            }

        },

        deleteMessage(index) {
            this.contacts[this.pointer].messages.splice(index, 1)
            this.clicked = false;
            //console.log(index);
        },

        vocalMessage() {

            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                const mediaRecorder = new MediaRecorder(stream)
                mediaRecorder.start()
                const audioChunks = [];
                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    let newMessage = {
                        date: '',
                        text: '',
                        status: 'sent',
                        readClass: "unread",
                        vocal: audioUrl
                    }

                    this.contacts[this.pointer].messages.push(newMessage)

                    // console.log(newMessage);
                    // console.log(audioUrl);

                    // const audio = `<audio controls preload="auto" src="${audioUrl}"></audio>`
                    // document.querySelector(".chat").insertAdjacentHTML("beforeend", `<li class="message_sent"><div class="message_text">${audio}</div></li>`)

                });

                setTimeout(() => {
                    mediaRecorder.stop();
                }, 4 * 1000);

            })


        },



    },

})