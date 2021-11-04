const app = new Vue({
    el: "#root",

    data: {
        currentData: dayjs().format('DD/MM/YYYY H:mm:ss'),
        menuClicked: "",
        clicked: "false",
        activeClass: "",
        pointer: 0,
        messageText: "",
        newMessage: {
            date: '',
            text: '',
            status: 'sent'
        },
        newMessageReceived: {
            date: '',
            text: '',
            status: 'received'
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
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
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
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
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
                        status: 'sent'
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
                        status: 'sent'
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
        showChat(index) {
            this.pointer = index;
        },

        addNewMessage() {
            //console.log(this.newMessage.text);
            let currentData = dayjs().format('DD/MM/YYYY H:mm:ss')
            this.newMessage.date = currentData
            this.newMessage.text = this.messageText
            //console.log(this.newMessage);

            this.contacts[this.pointer].messages.push(this.newMessage)
            this.messageText = ""

            setTimeout(function () {
                //console.log(this);
                let newcurrentData = dayjs().format('DD/MM/YYYY H:mm:ss')
                app.newMessageReceived.date = newcurrentData
                app.newMessageReceived.text = "Ok"

                app.contacts[app.pointer].messages.push(app.newMessageReceived)
            }, 1000)
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

    },

})