// firebase-messaging-sw.js
// 处理 App 在背景（没打开）时收到的推播通知
// Handles push notifications that arrive while the app is in the background

importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCH6KWeqZtoDn0rhKdF3-HnTAuq838MJIE",
  authDomain: "lowandfum.firebaseapp.com",
  projectId: "lowandfum",
  storageBucket: "lowandfum.firebasestorage.app",
  messagingSenderId: "746398053899",
  appId: "1:746398053899:web:e4005aac24c5e5c472f90e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification.title || '两人的空间';
  const options = {
    body: payload.notification.body || '',
    icon: 'icon-180.png',
    badge: 'icon-180.png'
  };
  self.registration.showNotification(title, options);
});
