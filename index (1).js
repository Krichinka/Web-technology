console.log("Задача 1");

let username = "my name";
let bonusBalance = 1000;

console.log("Пользователь " + username);
console.log("Баланс " + bonusBalance);

let bonusForPurchase = 50;
let burnPerDay = 3;
let days = 7;

for (let day = 1; day <= days; day++) {
  if (day == 1 || day == 3 || day == 5 || day == 7) {
    bonusBalance = bonusBalance + bonusForPurchase;
  }

  bonusBalance = bonusBalance - burnPerDay;
}

console.log("Баланс через 7 дней: " + bonusBalance);


console.log("");
console.log("Задача 2");

let messages = [
  "Пойдем гулять в парк?",
  "Кажется, дождь собирается. Лучше пойдем в кино!",
  "Давай, сегодня как раз вышел новый фильм.",
  "Встречаемся через час у кинотеатра."
];

for (let i = 0; i < messages.length; i++) {
  if (i % 2 == 0) {
    console.log("Друг: " + messages[i]);
  } else {
    console.log("Вы: " + messages[i]);
  }
}

console.log("");
console.log("Поиск по сообщениям");

let searchText = "кино";

for (let i = 0; i < messages.length; i++) {
  if (messages[i].includes(searchText)) {
    if (i % 2 == 0) {
      console.log("Друг: " + messages[i]);
    } else {
      console.log("Вы: " + messages[i]);
    }
  }
}