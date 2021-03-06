const downloader = require('./Downloader.js');
const py = require('./PyExec.js');
const fileDisplay = require('../view/DisplayFile.js');
const guildReqeusts = require('./GuildHttpsRequest.js');
const export_command = require('./Export.js');
const admin_command = require('./AdminCommands');
const import_command = require('./Import.js');
const confirmation = require('../view/Confirmation.js');
<<<<<<< HEAD
const winston = require('winston');
=======
const metric = require('./Metric.js');
>>>>>>> cc4ee31d622658843929af164d36cd3db7d986e1

module.exports = {
    commandSwitch: async function commandSwitch(msg){
        var args = msg.content.substring(1).split(" ");
        switch(args[0]){
            case "ping":
                await ping(msg);
                break;
            case "test":
                await test(msg);
                break;
            case "import":
                await importConfiguration(msg);
                break;
            case "export":
                await exportConfiguration(msg);
                break;
            case "graph":
                await doGraphStuff(msg);
                break;
            case "metric":
                await metric.cmdParse(msg, args);
                break;
            case "warn":
                await warn(msg);
                break;
            default:
                msg.channel.send("This is not a valid command.");
        }//END SWITCH
    }
}

var options = {
    file: {
        level: 'info',
        name: 'file.info',
        filename: `../view/log.txt`,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
let logger = winston.createLogger({
    transports: [
        new (winston.transports.Console)(options.console),
        new (winston.transports.File)(options.file)
    ]
})

async function ping(msg){
    logger.log('ping command used by ${message.author.tag} ID: ${message.author.id} Time: ${Date()} Guild: ${guild}')
    msg.channel.send("Pong!");
}

async function doGraphStuff(msg) {
    msg.channel.send("Graphing...");
    var nums = msg.content.split(" ").map(Number);
    var imgpath = "cache/metrics/img/graph.png";
    var csvpath = "cache/metrics/data.csv";
    nums.shift();
    py.run("graphgen.py", [csvpath, '-o', imgpath, '-yl', 'Population']);
    msg.channel.send("Done, check dir");
}

async function test(msg){
    msg.channel.createWebhook("GittyBoi", null)
    .then(console.log("Webhook created"));
}

async function warn(msg) {
    msg.channel.send('working on it')
    admin_command.warn(msg.author);
}

async function exportConfiguration(msg){
    msg.channel.send(`Exporting Configuration. Executor - ${msg.author.username}`)
    console.log(`Exporting Configuration. Executor - ${msg.author.username}`);
    let guildID = msg.guild.id;
    let channel_data = await guildReqeusts.requestChannels(guildID);
    let filtered_channel_data = await export_command.filterChannelInformation(channel_data);
    let role_data = await guildReqeusts.requestRoles(guildID);
    let filtered_role_data = await export_command.filterRoleData(role_data);
    let webHookData = await export_command.getWebHooks(msg.guild);
    let merged_data = await export_command.mergeJsonData(
            filtered_channel_data,
            filtered_role_data,
            webHookData
        );
    await downloader.saveJsonFile("current_configuration.json", merged_data);
    msg.channel.send(`${msg.author} - Here is the current configuration`, { files: ["./cache/temp/file/current_configuration.json"] });
}

async function importConfiguration(msg){
    msg.channel.send(`Importing Configuration. Executor - ${msg.author.username}`)
    console.log(`Importing Configuration. Executor - ${msg.author.username}`);
    var author = msg.author.id;
    let url = msg.attachments.first().url;
    let downloadedFile = await downloader.download(author, url);
    await import_command.importConfiguration(msg.guild, downloadedFile)    
}
