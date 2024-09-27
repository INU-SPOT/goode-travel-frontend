self.addEventListener('install', function (e) {
  self.skipWaiting(); // 즉시 활성화
});

self.addEventListener('activate', function (e) {
  return self.clients.claim();
});

self.addEventListener("push", function (e) {
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

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {  
  const postId = event.notification.data.postId;
  
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
