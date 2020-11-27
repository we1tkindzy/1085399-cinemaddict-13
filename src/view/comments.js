import dayjs from "dayjs";

const createCommentItemTemplate = (comment) => {
  const {emoji, commentDate, author, message} = comment;

  const date = commentDate !== null ? dayjs(commentDate).format(`MM/DD/YYYY h:mm`) : ``;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export const createCommentsListTemplate = (commentItems) => {
  const commentItemsTemplate = commentItems
    .map((x) => createCommentItemTemplate(x))
    .join(``);

  return `<ul class="film-details__comments-list">

    ${commentItemsTemplate}

  </ul>`;
};
