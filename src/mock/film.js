import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";
import {EMOJIS} from "../utils/const.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateName = () => {
  const name = [
    `The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `Santa Claus Conquers the Martians`,
    `Popeye the Sailor Meets Sindbad the Sailor`
  ];

  const randomIndex = getRandomInteger(0, name.length - 1);

  return name[randomIndex];
};

const generateProducer = () => {
  const producer = [
    `Baldwin McCarthy`,
    `James Hardy`,
    `John Warner`
  ];

  const randomIndex = getRandomInteger(0, producer.length - 1);

  return producer[randomIndex];
};

const generateScreenwriters = () => {
  const screenwriters = [
    `Joseph Moody`,
    `Robert Wells`,
    `Steven Bridges`,
    `Brian Campbell`
  ];

  const numberOfScreenwriters = (getRandomInteger(1, 4));

  const screenwritersList = [];
  for (let i = 0; i < numberOfScreenwriters; i++) {
    let randomIndex = getRandomInteger(0, screenwriters.length - 1);

    screenwritersList.push(screenwriters[randomIndex]);
  }
  return screenwritersList.join(`, `);
};

const generateCast = () => {
  const cast = [
    `Joseph Moody`,
    `Robert Wells`,
    `Steven Bridges`,
    `Brian Campbell`
  ];

  const numberOfCast = (getRandomInteger(1, 4));

  const castList = [];
  for (let i = 0; i < numberOfCast; i++) {
    let randomIndex = getRandomInteger(0, cast.length - 1);

    castList.push(cast[randomIndex]);
  }
  return castList.join(`, `);
};

const generateCountry = () => {
  const country = [
    `USA`,
    `Russia`,
    `Italy`,
    `France`,
    `Finland`
  ];

  const randomIndex = getRandomInteger(0, country.length - 1);

  return country[randomIndex];
};

const generateAgeRating = () => {
  const ageRating = [
    `6+`,
    `12+`,
    `16+`,
    `18+`,
    `21+`
  ];

  const randomIndex = getRandomInteger(0, ageRating.length - 1);

  return ageRating[randomIndex];
};

const generateDate = () => {
  const maxYearsGap = 50;
  const yearGap = getRandomInteger(-maxYearsGap, 0);

  return dayjs().add(yearGap, `year`).toDate();
};


const generateViewingTime = () => {
  // const maxHoursGap = 3;
  // const hoursGap = getRandomInteger(1, maxHoursGap);
  // const maxHours = dayjs().add(hoursGap, `h`).format(`h`);

  // const maxMinutesGap = 59;
  // const minutesGap = getRandomInteger(-maxMinutesGap, 0);
  // const maxMinutes = dayjs().add(minutesGap, `m`).format(`m`);


  // return (maxHours + `h ` + maxMinutes + `m`);

  const viewingTime = [
    `115`,
    `70`,
    `146`,
    `150`,
    `99`,
    `55`
  ];

  const randomIndex = getRandomInteger(0, viewingTime.length - 1);

  return viewingTime[randomIndex];
};

const generatePoster = () => {
  const poster = [
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/popeye-meets-sinbad.png`
  ];

  const randomIndex = getRandomInteger(0, poster.length - 1);

  return poster[randomIndex];
};

const generateGenre = () => {
  const genre = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`
  ];

  const randomIndex = getRandomInteger(0, genre.length - 1);

  return genre[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];


  const numberOfDescriptions = (getRandomInteger(1, 5));

  const descriptionsList = [];
  for (let i = 0; i < numberOfDescriptions; i++) {
    let randomIndex = getRandomInteger(0, descriptions.length - 1);

    descriptionsList.push(descriptions[randomIndex] + ` `);
  }
  return descriptionsList.join(``);
};

export const generateFilm = () => {
  const numberOfComments = (getRandomInteger(1, 5));

  return {
    id: generateId(),
    poster: generatePoster(),
    isAddToWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorite: Boolean(getRandomInteger()),
    name: generateName(),
    rating: getRandomInteger(0, 100) / 10,
    originalName: generateName(),
    producer: generateProducer(),
    screenwriters: generateScreenwriters(),
    cast: generateCast(),
    releaseDate: generateDate(),
    viewingTime: generateViewingTime(),
    country: generateCountry(),
    genre: generateGenre(),
    description: generateDescription(),
    comments: numberOfComments,
    addedEmoji: EMOJIS[0],
    addedComment: `Select reaction below and write comment here`,
    ageRating: generateAgeRating()
  };
};

