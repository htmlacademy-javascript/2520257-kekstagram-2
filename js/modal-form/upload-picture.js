const imageUpload = document.querySelector('.img-upload');
const uploadFile = imageUpload.querySelector('#upload-file');
const imagePreview = imageUpload.querySelector('.img-upload__preview img');
const effectsPreview = imageUpload.querySelectorAll('.effects__preview');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];

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
