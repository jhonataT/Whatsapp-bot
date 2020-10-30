const Instagram = require('instagram-web-api')
const fs = require('fs');
const mime = require('mime-types');
const { username, password } = process.env
 
const client = new Instagram({ username: 'licobot', password: 'T7zkWA6pfDc924un'});
 
(async () => {
    await client.login()
    const profile = await client.getProfile()
   
    // console.log(profile)
  })()

const tag = client.getMediaFeedByHashtag({ hashtag: 'unicorn' })

console.log(tag);
 
