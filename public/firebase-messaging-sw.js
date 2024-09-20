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

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});