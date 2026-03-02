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

const handleFiles = (files) => {
  [...files].forEach((file) => {
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) return;
    stagedMedia.push({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image',
    });
  });
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

const setMediaGrid = (container, mediaItems) => {
  const visible = mediaItems.slice(0, 4);
  const hiddenCount = Math.max(mediaItems.length - 4, 0);

  if (visible.length === 1) container.style.gridTemplateColumns = '1fr';
  if (visible.length === 2) container.style.gridTemplateColumns = '1fr 1fr';
  if (visible.length >= 3) container.style.gridTemplateColumns = '1fr 1fr';

  visible.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'media-item';

    if (visible.length === 3 && index === 0) {
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
  clone.querySelector('.copy').textContent = content || ' '; // keeps LinkedIn-like spacing
  const mediaContainer = clone.querySelector('.media');

  if (stagedMedia.length > 0) {
    setMediaGrid(mediaContainer, stagedMedia);
  } else {
    mediaContainer.remove();
  }

  feed.prepend(clone);
  postText.value = '';
  stagedMedia = [];
  renderMediaList();
};

dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (event) => handleFiles(event.target.files));

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

dropZone.addEventListener('drop', (event) => {
  handleFiles(event.dataTransfer.files);
});

dropZone.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    fileInput.click();
  }
});

submitPost.addEventListener('click', buildPost);
