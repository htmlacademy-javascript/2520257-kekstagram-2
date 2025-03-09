const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const socialCommentsList = bigPicture.querySelector('.social__comments');
const socialCommentsItem = bigPicture.querySelector('.social__comment');
//const socialCommentsShown = bigPicture.querySelector('.social__comment-shown-count');
//const socialCommentsTotal = bigPicture.querySelector('.social__comment-total-count');
//const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.comments-loader');

const renderComments = (photo) => {
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  socialCommentsList.innerHTML = '';

  photo.comments.forEach((comment) => {
    const commentElement = socialCommentsItem.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(commentElement);
  });

  socialCommentsList.appendChild(socialCommentsFragment);
  socialCommentsCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');
};

export { renderComments };
