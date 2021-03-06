const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios')
const Config = require('./config.json');

client.login(Config.token);
client.on('guildMemberAdd', member => {
   member.send({embed: {
     color: 0x49b86e,
     title: "Welcome to the server!",
     description: "Here are some of the important links to start using P3C, Send `help` to know more commands",
     fields: [{
       name: "P3C.io",
       value: "https://p3c.io/"
     },
     {
       name: "P3C.trade",
       value: "http://p3c.trade/"
     },
     {
       name: "Livestreaming P3C (P3C.tv)",
       value: "https://p3c.tv/"
     },
     {
       name: "Use P3C in Mobile",
       value: "https://forum.saturn.network/t/tutorial-how-to-recieve-a-p3c-io-airdrop-on-your-phone-5-minute-tutorial/4144"
     }]
   }
   }).catch(err => {
     console.log(err);
   });
});

client.on('message', (message) => {
  if(message.author.bot)
  return;
  if(message.channel.name === 'accountant-bot' || message.channel.type === "dm") {
    let tempArgs = message.content.split(/[\s!]+/)
    let args = message.content.toLowerCase().split(/[\s!]+/)
    if(args[0] === 'info') {
      axios.get('https://api.p3c.io/chart/info').then(res => {
        if(res.data) {
        message.channel.send({embed: {
          color: 0x49b86e,
          title: "Info Command",
          description: "This returns the current supply of P3C, the USD Price, the ETC Price, the ETC Market cap, the ETC market cap, and ETC price in USD.",
          fields: [{
            name: "Price ETC",
            value: res.data.PriceETC.toString()
          },
          {
            name: "Price USD",
            value: '$' + res.data.PriceUSD.toString()
          },
          {
            name: "Size ETC",
            value: res.data.SizeETC.toString()
          },
          {
            name: "Size USD",
            value: res.data.SizeUSD.toString()
          },
          {
            name: "P3C Supply",
            value: res.data.P3CSupply.toString()
          },
          {
            name: "ETC Price USD",
            value: '$' + res.data.ETCPriceUSD.toString()
          }]
        }
        }).catch(err => {
          console.log(err);
        });
      }}
      )
    }
    if(args[0] === 'change') {
      if(args[1] === 'channel' && args[2] && args[3] && args[4]) {
        axios.get('https://api.p3c.io/tv/use/' + tempArgs[2] + '/' + tempArgs[3] + '/' + tempArgs[4]).then(res => {
          if(res.data) {
          message.channel.send({embed: {
            color: 0x49b86e,
            title: "change channel Command",
            description: res.data.toString() + ' \n ' + ' Now you can go here https://p3c.tv',
          }
          }).catch(err => {
            console.log(err);
          });
        }}
        )
      } else {
        message.channel.send({embed: {
            color: 0x49b86e,
            title: 'Change Channel Command',
            fields:[{
              name: "change channel ... \n Example : change channel <youtube_watch_id_string> <Amount_Cents> <Crop_Address_Transfer_To>",
              value: 'change channel Agew5KGUEL4 2 0x340C3e860EFd1956D7E94D78724A1C5d8b0a2D2b'
            }]
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
    if(args[0] === 'crop') {
      if(args[1]) {
        console.log(tempArgs[1]);
        axios.get('https://api.p3c.io/price/crop/' + tempArgs[1]).then((res) => {
          if(res.data) {
          message.channel.send({embed: {
            color: 0x49b86e,
            title: "Crop Command",
            description: "Can be called on any crop. Returns the growth in ETC/USD over a 1 day, 7 day, and 30 day period.",
            fields: [{
              name: "ETC 1",
              value: res.data.etc1.toString()
            },
            {
              name: "USD 1",
              value: '$' + res.data.usd1.toString()
            },
            {
              name: "ETC 7",
              value: res.data.etc7.toString()
            },
            {
              name: "USD 7",
              value: '$' + res.data.usd7.toString()
            },
            {
              name: "ETC 30",
              value: res.data.etc30.toString()
            },
            {
              name: "USD 30",
              value: '$' + res.data.usd30.toString()
            }]
          }
          }).catch(err => {
            console.log(err);
          });
        }})
      } else {
        message.channel.send('You can see more commands by sending `help` to channel');
      }
    }
    if(args[0] === 'help') {
      if(args[1] === 'computer') {
        message.channel.send({embed: {
            color: 0x49b86e,
            title: 'Help computer command',
            fields:[{
              name: "Follow this youtube tutorial to setup P3C on your computer",
              value: 'https://www.youtube.com/watch?v=tBbl_nbp8_k&feature=youtu.be'
            }]
          }
        }).catch(err => {
          console.log(err);
        });
        return;
      }
      if(args[1] === 'saturn') {
        message.channel.send({embed: {
            color: 0x49b86e,
            title: 'Help saturn command',
            fields:[{
              name: "Follow this link to install Saturn in your browser",
              value: 'https://chrome.google.com/webstore/detail/saturn-wallet/nkddgncdjgjfcddamfgcmfnlhccnimig?hl=en'
            }]
          }
        }).catch(err => {
          console.log(err);
        });
        return;
      }
      if(args[1] === 'airdrop') {
        message.channel.send({embed: {
            color: 0x49b86e,
            title: 'Help airdrop command',
            fields:[{
              name: "A tutorial explaining how to claim your airdrop. Takes 3 minutes.",
              value: 'https://forum.saturn.network/t/tutorial-how-to-recieve-a-p3c-io-airdrop-on-your-phone-5-minute-tutorial/4144'
            }]
          }
        }).catch(err => {
          console.log(err);
        });
        return;
      }
      if(args[1] === 'change') {
        message.channel.send({embed: {
            color: 0x49b86e,
            title: 'Help change channel with tip command',
            fields:[{
              name: "change channel ... \n Example : change channel <youtube_watch_id_string> <Amount_Cents> <Crop_Address_Transfer_To>",
              value: 'change channel qK9OLRbAW30 2 0x340C3e860EFd1956D7E94D78724A1C5d8b0a2D2b'
            }]
          }
        }).catch(err => {
          console.log(err);
        });
        return;
      }
      if(args[1] === 'wiki') {
        message.channel.send({embed: {
            color: 0x49b86e,
            title: 'Help wiki command',
            fields:[{
              name: "The wiki contains the answers to P3C...",
              value: 'https://www.youtube.com/watch?v=PuQBHfKVF2I&feature=youtu.be'
            }]
          }
        }).catch(err => {
          console.log(err);
        });
        return;
      }
      if(args[1] === 'phone' || args[1] === 'mobile') {
        if (args[2] === 'android') {
          message.channel.send({embed: {
              color: 0x49b86e,
              title: 'Help phone android command',
              fields:[{
                name: "Install Trust Wallet from the Google Play store",
                value: 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp'
              }]
            }
          }).catch(err => {
            console.log(err);
          });
          return;
        }
        else if (args[2] === 'iphone') {
          message.channel.send({embed: {
              color: 0x49b86e,
              title: 'Help phone iphone command',
              fields:[{
                name: "Install Trust Wallet in the App store",
                value: 'https://itunes.apple.com/us/app/trust-ethereum-wallet/id1288339409'
              }]
            }
          }).catch(err => {
            console.log(err);
          });
          return;
        }
        else {
          message.channel.send({embed: {
              color: 0x49b86e,
              title: 'Help phone/mobile command',
              fields:[{
                name: "Follow this youtube tutorial to setup P3C on your phone.Works on Android and iPhone.",
                value: 'https://www.youtube.com/watch?v=PuQBHfKVF2I&feature=youtu.be'
              }]
            }
          }).catch(err => {
            console.log(err);
          });
          return;
        }
      }
      else {
        message.channel.send({embed: {
          color: 0x49b86e,
          title: "Help Command",
          description: "This can be called to know the list of available comands can be used in `accountant-bot` channel in p3c or in this private channel",
          fields: [{
            name: "info",
            value: "`info` returns the current supply of P3C, the USD Price, the ETC Price, the ETC Market cap, the ETC market cap, and ETC price in USD"
          },
          {
            name: "crop <address>",
            value: "example: `crop 0xB751eb15542D3fba12065A63f87E0b059c04091C`, Can be called on any crop. Returns the growth in ETC/USD over a 1 day, 7 day, and 30 day period."
          },
          {
            name: "help computer",
            value: "Return Youtube tutorial link to setup P3C on your computer"
          },
          {
            name: "help saturn",
            value: "Return Link to install Saturn in your browser"
          },
          {
            name: "help phone",
            value: "Return youtube tutorial to setup P3C on your phone.Works on Android and iPhone."
          },
          {
            name: "help phone android `or` iphone",
            value: "Return link to Install Trust Wallet app"
          },
          {
            name: "help airdrop",
            value: "Return a link of a tutorial explaining how to claim your airdrop. Takes 3 minutes."
          },
          {
            name: "help wiki",
            value: "Return a link of the wiki contains the answers to P3C.."
          },
          {
            name: "change channel ... \n Example : change channel <youtube_watch_id_string> <Amount_Cents> <Crop_Address_Transfer_To>",
            value: 'change channel Agew5KGUEL4 2 0x340C3e860EFd1956D7E94D78724A1C5d8b0a2D2b'
          }]
        }}).catch(err => {
          console.log(err);
        });
      }
    }
  } else {
    return;
  }
});
