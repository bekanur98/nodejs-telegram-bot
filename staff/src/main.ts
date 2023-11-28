import TelegramBot from "node-telegram-bot-api";
import { load } from 'ts-dotenv';

const env = load({
    TOKEN: String,
});


export class Staff {
    private staffIds: Map<string, number>;
    private bot: TelegramBot;
    constructor() {
        this.staffIds = new Map<string, number>();
        this.bot = new TelegramBot(env.TOKEN, {polling: true});
    }

    async execute() {
        this.bot.on("message", async (msg: TelegramBot.Message) => {
            switch (msg.text) {
                case "/start": 
                    await this.startStaff(msg);
                    break;
                case "/stop":
                    await this.stoptStaff(msg);
                    break;
                case "/set_staff_id":
                    this.setStaffId(msg.from?.username || "", 250)
                    break;
                case "/get_staff_id":
                    this.bot.sendMessage(msg.chat.id, `Your current staff is ${this.getStaffId(msg.from?.username || "")}`)
                    break;
                default:
                    this.sayHello(msg);
            }
            // bot.sendMessage(msg.chat.id, "Hi")
        });
    }

    async startStaff(msg: TelegramBot.Message) {
        // const staffId = this.getStaffId(msg.from?.username || "")
        const staffId = 250
        const nowDate = new Date(); 
        const date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
        let message = `You started at ${date} `;

        if (!staffId) {
            this.bot.sendMessage(msg.chat.id, "First set staff id")
        } else {
            fetch(
                `https://crm.growave.io/staff/ajax_request.php?command=start_dev_log&staff_id=${staffId}`
            )
            .then((response) => response.text())
            .then((body) => {
                message += body;
                this.bot.sendMessage(msg.chat.id, message)
        });
        }
    } 

    async stoptStaff(msg: TelegramBot.Message) {
        // const staffId = this.getStaffId(msg.from?.username || "")
        const staffId = 250
        const nowDate = new Date(); 
        const date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
        let message = `You stopped at ${date} `;
        if (!staffId) {
            this.bot.sendMessage(msg.chat.id, "First set staff id")
        } else {
            fetch(
                `https://crm.growave.io/staff/ajax_request.php?command=stop_dev_log&staff_id=${staffId}`
            )
            .then((response) => response.text())
            .then((body) => {
                message += body;
                this.bot.sendMessage(msg.chat.id, message)
        });
        }
    }

    sayHello(msg: TelegramBot.Message) {
        this.bot.sendMessage(msg.chat.id, "Hi")
    }

    setStaffId(username: string, staffId: number): void {
        this.staffIds.set(username, staffId);
    }

    getStaffId(username: string): number {
        if (username === "") {
            return 0;
        }
        return this.staffIds.get(username) || 0;
    }
}