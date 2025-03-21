// Возможные форматы изображений для загрузки

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

// Элементы загрузки изображения

const imageUpload = document.querySelector('.img-upload');
const uploadFile = imageUpload.querySelector('#upload-file');
const imagePreview = imageUpload.querySelector('.img-upload__preview img');
const effectsPreview = imageUpload.querySelectorAll('.effects__preview');

// Добавляем обработчики для смены картинки

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreview.src}')`;
    });
  }
});
