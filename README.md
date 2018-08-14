# DnDDiscordBot
Discord bot to help my friends and I play DnD and to learn node.js.

To get the bot working you'll need the following:

1. A `config.json` file in the project's root directory of the following format (fill in the <>'s with your own info)
```
{
    "prefix": "<prefix for all your commands>",
    "token": "<bot's token>",
    "dungeon_master": "<user id of the dungeon master>"
}
```

2. You'll need to add all of the enemy images to ./resources/imgs/

I've used https://discordjs.guide/#/ to get started and https://sirmuel.design/creating-a-nodejs-meme-generator-908fccd35b01 as a reference for the draw meme functionality.
