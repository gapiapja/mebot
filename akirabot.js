//Credit By Akira
//Roy
//Riu
//Sofyan AMV
//Agung
//Bambang
//MhankBarBar
//LolHuman
//Itsmeiky
//Vhtear
//Credit Jangan dihapus Anjenk!!!

//wa connection
const {
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal") 
const moment = require("moment-timezone") 
const fs = require("fs") 
const imageToBase64 = require('image-to-base64')
const axios = require('axios')
const { color, bgcolor } = require('./akiraganz/color')
const { help } = require('./akiraganz/help')
const { listsurah } = require('./akiraganz/listsurah')
const { donasi } = require('./akiraganz/donasi')
const { fetchJson } = require('./akiraganz/fetcher')
const { recognize } = require('./akiraganz/ocr')
const { exec } = require("child_process")
const ffmpeg = require('fluent-ffmpeg')
const imgbb = require('imgbb-uploader')
const cd = 4.32e+7
const { removeBackgroundFromImageFile } = require('remove.bg')
const { ind } = require('./akira')

//apikey
const namabot = 'Stock Bot'

//kontak
const vcard = 'BEGIN:VCARD\n'  //Jangan diganti,Ntar error
            + 'VERSION:3.0\n'  //Jangan diganti,Ntar error
            + 'FN:Akira\n'  // Ganti jadi namamu
            + 'ORG:Pengembang ${namabot};\n'  // Ganti jadi namamu/Botmu
            + 'TEL;type=CELL;type=VOICE;waid=6282158549899:+6282158549899\n'  // Ganti jadi nomormu, tapi jangan ubah polanya
            + 'END:VCARD' // Jangan diganti,Ntar Error
            
//settings            
prefix = '#'
blocked = []   
limitawal = '2' //Terserah Mo Ganti apa kgk
limitikan = '5'
memberlimit = 1 //Terserah Mo Ganti apa kgk
cr = '*Stock Bot By Gapiapja*'
vr = '*Thx for using my bot @Gapiapja*'

//owner number
const ownerNumber = ["6282324659136@s.whatsapp.net"]  //Ganti Jadi Nomormu

//file json
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _ikan = JSON.parse(fs.readFileSync('./database/user/ikan.json'))
const uang = JSON.parse(fs.readFileSync('./database/user/uang.json'))

//function
        const getLimit = (sender) => {
        	let position = false
              Object.keys(limit).forEach ((i) => {
              	if (limit[position].id === sender) {
              	   position = i
                  }
              })
             if (position !== false) {
                return limit[position].limit
            }
        }
        
        const getLimitikan= (sender) => {
        	let position = false
              Object.keys(ikan).forEach ((i) => {
              	if (ikan[position].id === sender) {
              	   position = i
                  }
              })
             if (position !== false) {
                return limit[position].limit
            }
        }
             
         const getRegisteredRandomId = () => {
            return _registered[Math.floor(Math.random() * _registered.length)].id
        }

        const addRegisteredUser = (userid, sender, age, time, serials) => {
            const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
            _registered.push(obj)
            fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_registered))
        }

        const createSerial = (size) => {
            return crypto.randomBytes(size).toString('hex').slice(0, size)
        }

        const checkRegisteredUser = (sender) => {
            let status = false
            Object.keys(_registered).forEach((i) => {
                if (_registered[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        
        const addATM = (sender) => {
        	const obj = {id: sender, uang : 0}
            uang.push(obj)
            fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
        }
        
        const addKoinUser = (sender, amount) => {
            let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang += amount
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
            }
        }
        
        const checkATMuser = (sender) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return uang[position].uang
            }
        }
        
        const bayarLimit = (sender, amount) => {
        	let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit -= amount
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            }
        }
        
        const bayarLimitikan = (sender, amount) => {
        	let position = false
            Object.keys(_ikan).forEach((i) => {
                if (_ikan[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _ikan[position].limit -= amount
                fs.writeFileSync('./database/user/ikan.json', JSON.stringify(_ikan))
            }
        }
        	
        const confirmATM = (sender, amount) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang -= amount
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
            }
        }
        
            const limitAdd = (sender) => {
             let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id == sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit += 1
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            }
        }
        
        const ikanAdd = (sender) => {
             let position = false
            Object.keys(_ikan).forEach((i) => {
                if (_ikan[i].id == sender) {
                    position = i
                }
            })
            if (position !== false) {
                _ikan[position].limit += 1
                fs.writeFileSync('./database/user/ikan.json', JSON.stringify(_ikan))
            }
        }


        
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}
/********** FUNCTION ***************/

const akira = new WAConnection()
   akira.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(color('[','aqua'),color('AkiRa','white'),color(']','aqua'),color('SQAN QR CODE DI WHATSAPP WEB!!','aqua'),color('You','white'),color('Tube','red'),color('AkiRa','yellow'))
}) 

akira.on('credentials-updated', () => {
	const authInfo = akira.base64EncodedAuthInfo()
   console.log(`credentials updated!`)
   fs.writeFileSync('./stockbot.json', JSON.stringify(authInfo, null, '\t'))
})
fs.existsSync('./stockbot.json') && akira.loadAuthInfo('./stockbot.json')
akira.connect();


	akira.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	akira.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const timi = moment.tz('Asia/Jakarta').add(30, 'days').calendar();
			const timu = moment.tz('Asia/Jakarta').add(20, 'days').calendar();
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			var tas = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const mesejAnti = tas.slice(0).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = akira.user.jid
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = akira.contacts[sender] != undefined ? akira.contacts[sender].vname || akira.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await akira.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            
            /************** SCURITY FEATURE ************/
            const isRegistered = checkRegisteredUser(sender)
            const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				akira.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				akira.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? akira.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : akira.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const sendImage = (teks) => {
		    akira.sendMessage(from, teks, image, {quoted:mek})
		    }
		    const costum = (pesan, tipe, target, target2) => {
			akira.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
		    const sendPtt = (teks) => {
		    akira.sendMessage(from, audio, mp3, {quoted:mek})
		    }
	        /*****************END SCURITY FEATURE ********/

			
			
	        //function leveling
            if (isGroup && isRegistered && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    await reply(ind.levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel))
                }
            } catch (err) {
                console.error(err)
            }
        }
          //function check limit
          const checkLimit = (sender) => {
          	let found = false
                    for (let lmt of _limit) {
                        if (lmt.id === sender) {
                            let limitCounts = limitawal - lmt.limit
                            if (limitCounts <= 0) return akira.sendMessage(from,`Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, text,{ quoted: mek})
                            akira.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                            found = true
                        }
                    }
                    if (found === false) {
                        let obj = { id: sender, limit: 1 }
                        _limit.push(obj)
                        fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
                        akira.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                    }
				}
				
			//funtion limit
           const isLimit = (sender) =>{ 
		      let position = false
              for (let i of _limit) {
              if (i.id === sender) {
              	let limits = i.limit
              if (limits >= limitawal ) {
              	  position = true
                    akira.sendMessage(from, ind.limitend(pushname), text, {quoted: mek})
                    return true
              } else {
              	_limit
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
           	const obj = { id: sender, limit: 1 }
                _limit.push(obj)
                fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit))
           return false
       }
     }
     
     // fuction cek ikan
     
     const checkIkan = (sender) => {
          	let found = false
                    for (let lmt of _ikan) {
                        if (lmt.id === sender) {
                            let limitCounts = limitawal - lmt.limit
                            if (limitCounts <= 0) return akira.sendMessage(from,`Ikan habis silahkan restok`, text,{ quoted: mek})
                            akira.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                            found = true
                        }
                    }
                    if (found === false) {
                        let obj = { id: sender, limit: 1 }
                        _ikan.push(obj)
                        fs.writeFileSync('./database/user/ikan.json', JSON.stringify(_ikan))
                        akira.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                    }
				}
				
			//funtion limited
           const isIkan = (sender) =>{ 
		      let position = false
              for (let i of _ikan) {
              if (i.id === sender) {
              	let limits = i.limit
              if (limits >= limitawal ) {
              	  position = true
                    akira.sendMessage(from, ind.limitend(pushname), text, {quoted: mek})
                    return true
              } else {
              	_ikan
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
           	const obj = { id: sender, limit: 1 }
                _ikan.push(obj)
                fs.writeFileSync('./database/user/ikan.json',JSON.stringify(_ikan))
           return false
       }
     }
     	
        
      
            //function balance
            if (isRegistered && isGroup ) {
            const checkATM = checkATMuser(sender)
            try {
                if (checkATM === undefined) addATM(sender)
                const uangsaku = Math.floor(Math.random() * 10) + 90
                addKoinUser(sender, uangsaku)
            } catch (err) {
                console.error(err)
            }
        }
          
// ANTI LINK GRUP
		  
//ANTI VIRTEX 


           		  //kolor
			colors = ['red','white','black','blue','yellow','green']
			
			//detector media
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
			//private chat message
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', [time], '[\x1b[1;32mPRIVATE\x1b[1;37m]=', color([command]), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', [time], '[\x1b[1;31mLOL\x1b[1;37m]=', ('[\x1b[1;31mEMROR\x1b[1;37m]'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			
			//group message
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', [time], '[\x1b[1;32mGROUP\x1b[1;37m]=', color([command]), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', [time], '[\x1b[1;31mLOL\x1b[1;37m]=', ('[\x1b[1;31mEMROR\x1b[1;37m]'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			switch(command) {
				//New Fiture
				
				    case 'setlimit':
		            case 'addlimit':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
					if (isNaN(args[0])) return reply('limit harus angka')
                    limitawal = args[0]
					reply(`*Limit berhasil di ubah menjadi* : ${limitawal}`)
					break 	
                    break
                case 'transfer':
				if (!isRegistered) return reply(ind.noregis())
		if (isBanned) return reply(ind.baned())
				if (!q.includes('|')) return  reply(ind.wrongf())
                const tujuan = q.substring(0, q.indexOf('|') - 1)
                const jumblah = q.substring(q.lastIndexOf('|') + 1)
                if(isNaN(jumblah)) return await reply('jumlah harus berupa angka!!')
                if (jumblah < 100 ) return reply(`minimal transfer 100`)
                if (checkATMuser(sender) < jumblah) return reply(`uang mu tidak mencukupi untuk melakukan transfer`)
                const tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
                fee = 0.005 *  jumblah
                hasiltf = jumblah - fee
                addKoinUser(tujuantf, hasiltf)
                confirmATM(sender, jumblah)
                addKoinUser('6282158549899@s.whatsapp.net', fee)
                reply(`*「 SUKSES 」*\n\npengiriman uang telah sukses\ndari : +${sender.split("@")[0]}\nke : +${tujuan}\njumblah transfer : ${jumblah}\npajak : ${fee}`)
                break
				case 'limit':
				   if (!isRegistered) return reply(ind.noregis())
		if (isBanned) return reply(ind.baned())
				   checkLimit(sender)
					break
                    case 'ban':
					if (!isOwner) return reply(ind.ownerb())
					bnnd = body.slice(6)
					ban.push(`${bnnd}@s.whatsapp.net`)
					fs.writeFileSync('./database/user/banned.json', JSON.stringify(ban))
					reply(`Nomor wa.me/${bnnd} telah dibanned !`)
					break
				case 'unban':
					if (!isOwner) return reply(ind.ownerb())
					bnnd = body.slice(8)
					ban.splice(`${bnnd}@s.whatsapp.net`, 1)
					fs.writeFileSync('./database/user/banned.json', JSON.stringify(ban))
					reply(`Nomor wa.me/${bnnd} telah di unban!`)
					break
                case 'mining':
                      if (!isRegistered) return reply(ind.noregis())
		if (isBanned) return reply(ind.baned())
                      if (isLimit(sender)) return reply(ind.limitend(pushname))
                  //    if (!isEventon) return reply(`maaf ${pushname} event mining tidak di aktifkan oleh owner`)
                      if (isOwner) {
                      const one = 999999999
                    //  addLevelingXp(sender, one)
                  //    addLevelingLevel(sender, 99)
                      reply(`Nih Untukmu Owner♥ ${one}Xp `)
                      }else{
                      const mining = Math.ceil(Math.random() * 10000)
                    //  addLevelingXp(sender, mining)
                      await reply(`*selamat* ${pushname} kamu mendapatkan *${mining}Xp*`)
                      }
                    await limitAdd(sender)
					break
			    case 'ikan':
			    if (isIkan(sender)) return reply(ind.limitend(pushname))
			    await reply(`*selamat* ${pushname} kamu mendapatkan *${mining}Xp*`)
			    
			    await ikanAdd(sender)
                case 'buylimit':
				if (!isRegistered) return reply(ind.noregis())
		if (isBanned) return reply(ind.baned())
				payout = body.slice(10)
				const koinPerlimit = 1000
				const total = koinPerlimit * payout
				if ( checkATMuser(sender) <= total) return reply(`maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`)
				if ( checkATMuser(sender) >= total ) {
					confirmATM(sender, total)
					bayarLimit(sender, payout)
					await reply(`*「 PEMBAYARAN BERHASIL 」*\n\n*pengirim* : Admin\n*penerima* : ${pushname}\n*nominal pembelian* : ${payout} \n *harga limit* : ${koinPerlimit}/limit\n *sisa uang mu* : ${checkATMuser(sender)}\n\nproses berhasil dengan nomer pembayaran\n${createSerial(15)}`)
				} 
				break
               case 'daftar':
                if (isRegistered) return  reply(ind.rediregis())
                if (!q.includes('|')) return  reply(ind.wrongf())
                const namaUser = q.substring(0, q.indexOf('|') - 0)
                const umurUser = q.substring(q.lastIndexOf('|') + 1)
                const serialUser = createSerial(20)
                if(isNaN(umurUser)) return await reply('*Umur harus berupa angka!*')       
                if (namaUser.length >= 30) return reply(`*why is your name so long it's a name or a train*`)
                if (umurUser > 20) return reply(`*UMUR KAMU TERLALU TUA*`)
                if (umurUser < 10) return reply(`*UMUR KAMU TERLALU MUDA*`)
                pp_user = await getBuffer(`https://i.ibb.co/zbS493t/20210403-184336.jpg`)
                veri = sender
                if (isGroup) {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await akira.sendMessage(from, pp_user, image, {quoted: mek, caption: ind.registered(namaUser, umurUser, serialUser, time, sender)})
                    reply('Terima Kasih Sudah Absen')
		    addATM(sender)
                    addLevelingId(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
                } else {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await akira.sendMessage(from, pp_user, image, {quoted: mek, caption: ind.registered(namaUser, umurUser, serialUser, time, sender)})
		    reply('Terima Kasih Sudah Daftar')
                    addATM(sender)
                    addLevelingId(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
                }
					break
                case 'help': 
               			case 'help': 
               			case 'menu':
                 if (!isRegistered) return reply( ind.noregis())
				if (isBanned) return reply(ind.baned())
					const reqXp  = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
					const uangku = checkATMuser(sender)
                    wew = fs.readFileSync(`./akiraganz/logo.jpg`)
                    databaseuhy = `
╭══─⊱ ❰ *_User ${namabot}_* ❱ ⊰─═
├➤ ɴᴀᴍᴀ : ${pushname}
├➤ ɴᴏᴍᴏʀ : wa.me/${sender.split("@")[0]}
├➤ ᴜᴀɴɢ : Rp${uangku}
├➤ xᴘ : 
├➤ ʟᴇᴠᴇʟ :
├➤ ᴜsᴇʀ ʀᴇɢɪsᴛᴇʀ : ${_registered.length}
╰──── ⸨ *_${namabot}_* ⸩ ⊰─═══

◪ ɪɴғᴏ ᴀᴋɪʀᴀ
❏ *ɴᴀᴍᴀ:* 
Akira ( Reihan S ) 
❏ *ᴡᴇʙ:* 
https://akirainfo.site/ (  Sedang dalam Perbaikan  )
❏ *ᴡᴇʙ ᴀᴘɪ:* 
https://akirainfo.site/ (  Sedang dalam Perbaikan  )
❏ *ɪɴsᴛᴀɢʀᴀᴍ:* 
https://instagram.com/akirashopreal
❏ *ᴋᴏɴᴛᴀᴋ ᴀᴋɪʀᴀ:* 
Wa.me/6282158549899
❏ *ɢʀᴜʙ ʙᴏᴛ ᴡᴀ:* 
https://chat.whatsapp.com/J4HbJAqQuaAJsGovcuUNV4
❏ *ᴄʜᴀɴɴᴇʟ ʏᴏᴜᴛᴜʙᴇ:* 
https://m.youtube.com/channel/UCvVd-kAsrJUjg0bwKqxUPeg
  ----------------------------------
╔═════════════════❍
║⸨𝐑𝐮𝐥𝐞𝐬 - 𝐒𝐢𝐦𝐩𝐥𝒆⸩
║▬▭▬▭▬▭▬▭▬▭
║⧐ ⸨ *sᴘᴀᴍ ᴀᴜᴛᴏ ʙʟᴏᴄᴋ!* ⸩
║⧐ ⸨ *ʙᴇʀɪ ᴊᴇᴅᴀ 6 ᴅᴇᴛɪᴋ!* ⸩
║⧐ ⸨ *ᴇʀʀᴏʀ ʜᴜʙᴜɴɢɪ ᴏᴡɴᴇʀ!* ⸩
║⧐ ⸨ *ᴊᴀɴɢᴀɴ ʙᴀɴᴅɪɴɢᴋᴀɴ ʙᴏᴛ* ⸩
║⧐ ⸨ *ᴋᴇᴛɪᴋ ${prefix}ʜᴇʟᴘ* ⸩
║⧐ ⸨ *ᴊᴀɴɢᴀɴ ᴠᴄ/ᴄᴀʟʟ!* ⸩
║⧐ ⸨ *ɢᴜɴᴀᴋᴀɴ ᴅᴇɴɢᴀɴ ʀᴀᴍᴀʜ* ⸩
║▬▭▬▭▬▭▬▭▬▭
╚═════════════════❍
╔═════════════════❍
║⸨*ɢᴜɴᴀᴋᴀɴ ʙᴏᴛ ᴅᴇɴɢᴀɴ ʙᴀɪᴋ!*⸩
║▬▭▬▭▬▭▬▭▬▭
║⧐ ⸨ *ᴘʀᴇғɪx sᴀᴀᴛ ɪɴɪ ${prefix}* ⸩
║⧐ ⸨ *ᴋᴇᴛɪᴋ ${prefix}rules* ⸩
║⧐ ⸨ *кᴇᴛɪᴋ ${prefix}info* ⸩
║▬▭▬▭▬▭▬▭▬▭
╠═════════════════❍
║⧐ ɪɴɢɪɴ sᴇᴡᴀ ʙᴏᴛ? *${prefix}sewabot*
╠═════════════════════
║      ╔╦╦╦═╦╗╔═╦═╦══╦═╗
║      ║║║║╩╣╚╣═╣║║║║║╩╣
║      ╚══╩═╩═╩═╩═╩╩╩╩═╝
╠═══════════════════❍
╠═════════════════════
║> *_Menu ${namabot}_*
╠═════════════════════
║┏━━⊱*「 𝗢𝗧𝗛𝗘𝗥 𝗠𝗘𝗡𝗨 」* 
║┃
║┣❏ *${prefix}info*
║┣❏ *${prefix}rules*
` 
                    akira.sendMessage(from, wew, image, { quoted: mek, caption: databaseuhy })  
					break
				case 'stiker': 
				case 'sticker':
				case 's':
				    if (!isRegistered) return reply(ind.noregis())
		if (isBanned) return reply(ind.baned())
				    if (isLimit(sender)) return reply(ind.limitend(pusname))
                    await limitAdd(sender)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await akira.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(ind.stikga())
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								akira.sendMessage(from, buffer, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await akira.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(ind.wait())
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(ind.stikga())
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								akira.sendMessage(from, buffer, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							} else {
						reply(`Kirim gambar/video/gif dengan caption \n${prefix}sticker (durasi sticker video 1-9 detik)`)
					}
					break
				case 'tts':
				if (!isRegistered) return reply(ind.noregis())
		if (isBanned) return reply(ind.baned())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (args.length < 1) return akira.sendMessage(from, 'Diperlukan kode bahasa!!', text, {quoted: mek})
					const gtts = require('./akiraganz/gtts')(args[0])
					if (args.length < 2) return akira.sendMessage(from, 'Mana teks yang ma di jadiin suara? suara saya kah:v?', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 300
					? reply('lah teks nya kepanjangan bambang😤')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buffer = fs.readFileSync(rano)
							if (err) return reply(ind.stikga())
							akira.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					await limitAdd(sender)
					break
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
					prefix = args[0]
					reply(`Prefix berhasil di ubah menjadi : ${prefix}`)
					break 
				case 'bc': 
					if (!isOwner) return reply(ind.ownerb()) 
					if (args.length < 1) return reply('.......')
					anu = await akira.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await akira.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							akira.sendMessage(_.jid, buff, image, {caption: `❮ 𝙋𝙀𝙎𝘼?? 𝘽??𝙊𝘼𝘿𝘾𝘼𝙎𝙏 ❯\n\n${body.slice(4)}`})
						}
						reply('*_succes broadcast_* ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 BROADCAST BOT 」*\n\n${body.slice(4)}`)
						}
						reply('*_succes broadcast_* ')
					}
					break
			   	case 'setpp': 
                        if (!isGroup) return reply(ind.groupo())
                       if (!isGroupAdmins) return reply(ind.admin())
                        if (!isBotGroupAdmins) return reply(ind.badmin())
                       media = await akira.downloadAndSaveMediaMessage(mek)
                         await akira.updateProfilePicture (from, media)
                        reply('[SUKSES] Mengganti icon grub')
					break						
					case 'grup':
					case 'group':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'buka') {
					    reply(`*BERHASIL MEMBUKA GROUP*`)
						akira.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`*BERHASIL MENUTUP GROUP`)
						akira.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break      
		break    
           	case 'setname':
                if (!isGroup) return reply(ind.groupo())
			    if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
                akira.groupUpdateSubject(from, `${body.slice(9)}`)
                akira.sendMessage(from, 'Succes, Ganti Nama Grup', text, {quoted: mek})
					break
		            case 'setnamabot':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
                    namabot = args[0]
					reply(`*Nama Bot berhasil di ubah menjadi* : ${namabot}`)
					break 		 		
					
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(ind.wait())
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await akira.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							akira.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply(ind.ocron())
					}
					await limitAdd(sender)
					break
				default:
			if (budy.includes(`assalamualaikum`)) {
                  reply(`Waalaikumsalam`)
                  }

		if (budy.includes(`Assalamualaikum`)) {
                  reply(`Waalaikumsalam`)
                  }

		if (budy.includes(`Ngentod`)) {
                  reply(`Jaga Omongan😡`)
                  }

		if (budy.includes(`Thanks`)) {
                  reply(`Sama Sama Kak😁`)
                  }

		if (budy.includes(`Makasih`)) {
                  reply(`Sama Sama Kak😁`)
                  }

         if (body.startsWith(`${prefix}${command}`)) {

                  reply(`*${pushname}*, Command *${prefix}${command}* Tidak Ada Di Dalam *${prefix}menu ${namabot}*`)
		const none = fs.readFileSync('./mp3/ara.mp3');
		akira.sendMessage(from, none, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

			  }
			if (!isGroup && !isCmd) {
                        await akira.updatePresence(from, Presence.composing)
                        simi = await fetchJson(`http://api.lolhuman.xyz/api/simi?apikey=${lolhuman}&text=${budy}`)
                        reply(simi.result)
                    }
            }
			if (isGroup && !isCmd && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
					} else {
						console.log(color('[Gapiapja Bot]','yellow'), ('Command Tidak Ditemukan!!','red'), color(sender.split('@')[0]))
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
