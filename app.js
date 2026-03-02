const brandName = document.getElementById('brandName');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const mediaList = document.getElementById('mediaList');
const postText = document.getElementById('postText');
const submitPost = document.getElementById('submitPost');
const feed = document.getElementById('feed');
const postTemplate = document.getElementById('postTemplate');

let stagedMedia = [];

const formatSize = (bytes) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const power = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** power;
  return `${value.toFixed(value > 10 ? 0 : 1)} ${units[power]}`;
};

const getImageRatio = (url) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth / img.naturalHeight);
    img.onerror = () => resolve(null);
    img.src = url;
  });

const handleFiles = async (files) => {
  for (const file of [...files]) {
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) continue;

    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('video/') ? 'video' : 'image';
    const ratio = type === 'image' ? await getImageRatio(url) : null;

    stagedMedia.push({
      id: crypto.randomUUID(),
      file,
      url,
      type,
      ratio,
    });
  }

  renderMediaList();
};

const removeMedia = (id) => {
  const item = stagedMedia.find((entry) => entry.id === id);
  if (item) URL.revokeObjectURL(item.url);
  stagedMedia = stagedMedia.filter((entry) => entry.id !== id);
  renderMediaList();
};

const renderMediaList = () => {
  mediaList.innerHTML = '';
  stagedMedia.forEach(({ id, file, type }) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${type === 'video' ? '🎬' : '🖼️'} ${file.name} (${formatSize(file.size)})</span>`;
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeMedia(id));
    li.appendChild(removeButton);
    mediaList.appendChild(li);
  });
};

const canUsePortraitCollage = (mediaItems) => {
  if (mediaItems.length < 4) return false;
  return mediaItems.every(
    (item) => item.type === 'image' && item.ratio && item.ratio > 0.74 && item.ratio < 0.86
  );
};

const setMediaGrid = (container, mediaItems) => {
  const visible = mediaItems.slice(0, 4);
  const hiddenCount = Math.max(mediaItems.length - 4, 0);
  const portraitCollage = canUsePortraitCollage(mediaItems);

  container.classList.add(`layout-${visible.length}`);

  if (portraitCollage) {
    container.classList.add('portrait-collage');
  } else if (visible.length === 1) {
    container.style.gridTemplateColumns = '1fr';
  } else {
    container.style.gridTemplateColumns = '1fr 1fr';
  }

  visible.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'media-item';

    if (!portraitCollage && visible.length === 3 && index === 0) {
      wrapper.style.gridRow = 'span 2';
      wrapper.style.minHeight = '360px';
    }

    const mediaEl = document.createElement(item.type === 'video' ? 'video' : 'img');

    if (item.type === 'video') {
      mediaEl.src = item.url;
      mediaEl.controls = true;
      mediaEl.preload = 'metadata';
    } else {
      mediaEl.src = item.url;
      mediaEl.alt = 'Post media preview';
    }

    wrapper.appendChild(mediaEl);

    if (index === 3 && hiddenCount > 0) {
      const overflow = document.createElement('div');
      overflow.className = 'overflow-indicator';
      overflow.textContent = `+${hiddenCount}`;
      wrapper.appendChild(overflow);
    }

    container.appendChild(wrapper);
  });
};

const buildPost = () => {
  const content = postText.value.trim();
  if (!content && stagedMedia.length === 0) return;

  const clone = postTemplate.content.cloneNode(true);
  const pickedName = brandName.value.trim() || 'Brand Name';

  clone.querySelector('.name').textContent = pickedName;
  clone.querySelector('.avatar').textContent = pickedName.charAt(0).toUpperCase();
  clone.querySelector('.copy').textContent = content || ' ';

  const mediaContainer = clone.querySelector('.media');
  if (stagedMedia.length > 0) {
    setMediaGrid(mediaContainer, stagedMedia);
  } else {
    mediaContainer.remove();
  }

  feed.prepend(clone);
  postText.value = '';
  fileInput.value = '';
  stagedMedia = [];
  renderMediaList();
};

dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', async (event) => handleFiles(event.target.files));

['dragenter', 'dragover'].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add('drag-over');
  });
});

['dragleave', 'drop'].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove('drag-over');
  });
});

dropZone.addEventListener('drop', async (event) => {
  await handleFiles(event.dataTransfer.files);
});

dropZone.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    fileInput.click();
  }
});

submitPost.addEventListener('click', buildPost);
