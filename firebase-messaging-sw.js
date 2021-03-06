importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyBNuNe299xTdXQ3w82c7obYg1glVW5_TXw",
  authDomain: "webpush-7e61e.firebaseapp.com",
  projectId: "webpush-7e61e",
  storageBucket: "webpush-7e61e.appspot.com",
  messagingSenderId: "292806384921",
  appId: "1:292806384921:web:e4c67afb82fd538a1bf988",
  measurementId: "G-8M0H86P37Y"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  // Copy data object to get parameters in the click handler
  payload.notification = JSON.parse(JSON.stringify(payload.notification));
  console.log(payload)

  return self.registration.showNotification(payload.notification.title, payload.notification);
});

self.addEventListener('notificationclick', function(event) {
  const target = event.notification.data.url || '/';
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // clientList always is empty?!
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === target && 'focus' in client) {
        return client.focus();
      }
    }

    return clients.openWindow(target);
  }));
});
