let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLBAB_Xl4_YJOFgDrqV63LFPiBRs30Ek-DShh2DSGh5DBvIK6M1WL4b8hlRvh32am5KCZEcca2hpOkqi5l4YLa8",
   "privateKey": "yYwNfP8YNPo-ct95V6_2bq81RhWm4nUP7hNJAFO1E4c"
};
 
webPush.setVapidDetails(
   'mailto:r3ndydinar@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dkQS1ruPGsY:APA91bEDDFNy3IcosxeDj_D5DEX1DPjcLNObGsS8MlVVbCRbZ06EUBpMVjRiWttghHn_03N31UnYNWghocDC1IiT40rydby7HjUwgqpubAKEVp7ZptO_j1on-tY74YcepceUpowtUiwk",
   "keys": {
       "p256dh": "BNjg6k/j2LIMvTB9FvEp6vHu7Wnhr2z6QarUfNtXGnggTfEFNHqjrtYD92F5U45sYaxyBuvn+vJEl2p7OYDFxyM=",
       "auth": "f/cUeh64hDafSdPWbXqrhw=="
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi dari Layanan Server Firebase Cloud Messaging !';
 
let options = {
   gcmAPIKey: '898218638421',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);

