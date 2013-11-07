Gam = Gam || {};
Gam.Engine = Gam.Engine || {};

Gam.Engine.GameMessages = {
    messages: [],

    add: function (message) {
        if (this.messages.length > 50) {
            this.messages.shift();
        }
        this.messages.push(message);
    }
};