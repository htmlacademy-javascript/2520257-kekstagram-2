const bigPicture = document.querySelector('.big-picture');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCommentsItem = bigPicture.querySelector('.social__comment');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');

//Колличество комментарией добавляемое по кнопке

const COMMENTS_COUNT = 5;

//Количество загруженных коментариев

let commentsShown = 0;
let commentsData = [];

//Функция загрузки комменатриев при нажатии кнопки


//Наполнение для полноэкранных изображений

const renderComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const newComments = commentsData.slice(commentsShown, commentsShown + COMMENTS_COUNT);
  const newCommentsLength = newComments.length + commentsShown;

  newComments.forEach(({avatar, name, message}) => {
    const commentElement = socialCommentsItem.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    socialCommentsFragment.appendChild(commentElement);
  });

  socialCommentsList.appendChild(socialCommentsFragment);
  socialCommentsCount.firstChild.textContent = newCommentsLength;
  socialCommentsCount.querySelector('.social__comment-total-count').textContent = commentsData.length;

  socialCommentsLoader.classList.toggle('hidden', newCommentsLength >= commentsData.length);

  commentsShown += COMMENTS_COUNT;
};

const onSocialCommentsLoaderClick = () => renderComments();

const clearComments = () => {
  commentsShown = 0;
  socialCommentsList.innerHTML = '';
  socialCommentsLoader.classList.remove('hidden');
  socialCommentsLoader.removeEventListener('click', onSocialCommentsLoaderClick);
};

const showComments = (photoComments) => {
  commentsData = photoComments;
  clearComments();
  renderComments();
  socialCommentsLoader.addEventListener('click', onSocialCommentsLoaderClick);
};

export { showComments, clearComments };
