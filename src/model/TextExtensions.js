const code_extensions = require("../../res/file_extensions/ascii.json")

class TextExtensions {
    constructor(){
        this.extensions = [];
        code_extensions.extensions.forEach(element => {
            this.extensions.push(element);
        });
    }

    contains(extension){
        let contains = false;
        this.extensions.forEach(element => {
            if(element === extension) contains = true;
        });
        return contains
    }
}

module.exports = {
    TextExtensions: TextExtensions
}
