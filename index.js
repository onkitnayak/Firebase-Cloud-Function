const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// const token;

// exports.newOrder = functions.database.ref('/USERS/{uid}/Orders/{userId}').onCreate((snapShot, context) => {

//     const message = snapShot.val();
//     const token = "f50McpR92sY:APA91bFTuX4bhVOgCPjLYy3HjFr9h8TAge4dkSLWODp6FWG7IZLEY9mPNk9PLbk7Pd0K1og39KdfcP5YOFnqtwqqXnYRc-AlG2e9P3fnrmWVsEU9pwBoHmeoLyGFrF2nUWLVMAfNksYw";
//     const payload = {
//         notification: {
//             title: 'New Order!🛎',
//             body: `You have received new order from ${message.name}.`,
//             sound: 'default'
//         }
//     };

//     return admin.messaging().sendToDevice(token, payload)
//         .then(response => {
//             console.log('Notification sent successfully:', response);
//             return null;
//         })
//         .catch(error => {
//             console.log('Notification sent failed:', error);
//         });

// });

exports.cancleOrder = functions.database.ref('/USERS/{uid}/Orders/{pushId}').onCreate((snapShot, context) => {

    var tokenId;
    const message = snapShot.val();
    //const uid = context.auth.uid;

    var ref = admin.database().ref('/USERS/2HVUr3chnfculcMoKGAOcLG4Lji1/TOKEN');
    ref.on('value', snapshot => {
        tokenId = snapshot.val();
        console.log('Id', tokenId);
    });

    const payload = {
        notification: {
            title: 'Order Placed!🛎',
            body: `Your order has been canclled from ${message.name}`,
            sound: 'default'
        }
    };

    if (tokenId === "") {
        console.log('failed:', 'Nt received');
        return;
    } else {
        return admin.messaging().sendToDevice(tokenId, payload)
        .then((response) => {
            return console.log('Notification sent successfully:', response);
        })
        .catch((error) => {
            return console.log('Notification sent failed:', error);
        });
    }

    


});


// exports.updateOrder = functions.database.ref('/USERS/{uid}/Orders/{userId}/TOKEN').onUpdate((snapShot, context) => {

//     token = snapShot.after.val();
//     //const token = "f50McpR92sY:APA91bFTuX4bhVOgCPjLYy3HjFr9h8TAge4dkSLWODp6FWG7IZLEY9mPNk9PLbk7Pd0K1og39KdfcP5YOFnqtwqqXnYRc-AlG2e9P3fnrmWVsEU9pwBoHmeoLyGFrF2nUWLVMAfNksYw";
//     var ref = firebase.database().ref('/USERS/{uid}/Orders/{userId}');
//     ref.once("value")
//         .then(function (snapshot) {
//             var key = snapshot.key; // "ada"
//             var childKey = snapshot.child("name/last").key; // "last"
//             console.log(key + childKey);
//             return null;
//         }).catch( error => {
//             console.log('id');
//         });


// });
