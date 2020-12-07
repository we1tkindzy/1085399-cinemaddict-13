import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";

const generateEmoji = () => {
  const emoji = [
    `./images/emoji/sleeping.png`,
    `./images/emoji/smile.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/angry.png`,
  ];

  const randomIndex = getRandomInteger(0, emoji.length - 1);

  return emoji[randomIndex];
};

const generateDate = () => {
  const maxDaysGap = 7;
  const dayGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(dayGap, `day`).toDate();
};

const generateAuthor = () => {
  const author = [
    `John Doe`,
    `Mark Conley`,
    `Roland Jefferson`,
    `Junior Miller `,
    `Wilfrid Little`
  ];

  const randomIndex = getRandomInteger(0, author.length - 1);

  return author[randomIndex];
};

const generateMessage = () => {
  const message = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const randomIndex = getRandomInteger(0, message.length - 1);

  return message[randomIndex];
};

export const generateComment = () => {
  const commentDate = generateDate();

  return {
    emoji: generateEmoji(),
    commentDate,
    author: generateAuthor(),
    message: generateMessage()
  };
};
