// self.addEventListener('install', function (e) {
//   console.log('fcm sw install..');
//   self.skipWaiting(); // 즉시 활성화
// });

// self.addEventListener('activate', function (e) {
//   console.log('fcm sw activate..');
//   return self.clients.claim(); // 활성화 후 즉시 제어권 가져오기
// });


// self.addEventListener("push", function (e) {
//   console.log("push: ", e.data.json());
//   if (!e.data.json()) return;

//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.body,
//     icon: resultData.image,
//     tag: resultData.tag,
//     ...resultData,
//   };
//   console.log("push: ", { resultData, notificationTitle, notificationOptions });

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// self.addEventListener("notificationclick", function (event) {
//   console.log("notification click");
//   const url = "/";
//   event.notification.close();
//   event.waitUntil(clients.openWindow(url));
// });

self.addEventListener('install', function (e) {
  console.log('fcm sw install..');
  self.skipWaiting(); // 즉시 활성화
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
  return self.clients.claim(); // 활성화 후 즉시 제어권 가져오기
});

self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json();
  const notificationTitle = resultData.notification.title;
  const notificationOptions = {
    body: resultData.notification.body,
    icon: resultData.notification.image,
    tag: resultData.notification.tag,
    data: { postId: resultData.data.postId },
    ...resultData.notification,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  
  // Retrieve postId from the notification data
  const postId = event.notification.data.postId;
  
  // Construct the URL using the postId
  const url = `/post/${postId}`;

  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      // If there is already an open window, focus it, otherwise open a new one
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
