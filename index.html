diff --git a/app.js b/app.js
new file mode 100644
index 0000000000000000000000000000000000000000..003f0a8ced142c1fcbfcee922bca876b7834af3b
--- /dev/null
+++ b/app.js
@@ -0,0 +1,177 @@
+const brandName = document.getElementById('brandName');
+const dropZone = document.getElementById('dropZone');
+const fileInput = document.getElementById('fileInput');
+const mediaList = document.getElementById('mediaList');
+const postText = document.getElementById('postText');
+const submitPost = document.getElementById('submitPost');
+const feed = document.getElementById('feed');
+const postTemplate = document.getElementById('postTemplate');
+
+let stagedMedia = [];
+
+const formatSize = (bytes) => {
+  if (!bytes) return '0 B';
+  const units = ['B', 'KB', 'MB', 'GB'];
+  const power = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
+  const value = bytes / 1024 ** power;
+  return `${value.toFixed(value > 10 ? 0 : 1)} ${units[power]}`;
+};
+
+const getImageRatio = (url) =>
+  new Promise((resolve) => {
+    const img = new Image();
+    img.onload = () => resolve(img.naturalWidth / img.naturalHeight);
+    img.onerror = () => resolve(null);
+    img.src = url;
+  });
+
+const handleFiles = async (files) => {
+  for (const file of [...files]) {
+    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) continue;
+
+    const url = URL.createObjectURL(file);
+    const type = file.type.startsWith('video/') ? 'video' : 'image';
+    const ratio = type === 'image' ? await getImageRatio(url) : null;
+
+    stagedMedia.push({
+      id: crypto.randomUUID(),
+      file,
+      url,
+      type,
+      ratio,
+    });
+  }
+
+  renderMediaList();
+};
+
+const removeMedia = (id) => {
+  const item = stagedMedia.find((entry) => entry.id === id);
+  if (item) URL.revokeObjectURL(item.url);
+  stagedMedia = stagedMedia.filter((entry) => entry.id !== id);
+  renderMediaList();
+};
+
+const renderMediaList = () => {
+  mediaList.innerHTML = '';
+  stagedMedia.forEach(({ id, file, type }) => {
+    const li = document.createElement('li');
+    li.innerHTML = `<span>${type === 'video' ? '🎬' : '🖼️'} ${file.name} (${formatSize(file.size)})</span>`;
+    const removeButton = document.createElement('button');
+    removeButton.type = 'button';
+    removeButton.textContent = 'Remove';
+    removeButton.addEventListener('click', () => removeMedia(id));
+    li.appendChild(removeButton);
+    mediaList.appendChild(li);
+  });
+};
+
+const canUsePortraitCollage = (mediaItems) => {
+  if (mediaItems.length < 4) return false;
+  return mediaItems.every(
+    (item) => item.type === 'image' && item.ratio && item.ratio > 0.74 && item.ratio < 0.86
+  );
+};
+
+const setMediaGrid = (container, mediaItems) => {
+  const visible = mediaItems.slice(0, 4);
+  const hiddenCount = Math.max(mediaItems.length - 4, 0);
+  const portraitCollage = canUsePortraitCollage(mediaItems);
+
+  container.classList.add(`layout-${visible.length}`);
+
+  if (portraitCollage) {
+    container.classList.add('portrait-collage');
+  } else if (visible.length === 1) {
+    container.style.gridTemplateColumns = '1fr';
+  } else {
+    container.style.gridTemplateColumns = '1fr 1fr';
+  }
+
+  visible.forEach((item, index) => {
+    const wrapper = document.createElement('div');
+    wrapper.className = 'media-item';
+
+    if (!portraitCollage && visible.length === 3 && index === 0) {
+      wrapper.style.gridRow = 'span 2';
+      wrapper.style.minHeight = '360px';
+    }
+
+    const mediaEl = document.createElement(item.type === 'video' ? 'video' : 'img');
+
+    if (item.type === 'video') {
+      mediaEl.src = item.url;
+      mediaEl.controls = true;
+      mediaEl.preload = 'metadata';
+    } else {
+      mediaEl.src = item.url;
+      mediaEl.alt = 'Post media preview';
+    }
+
+    wrapper.appendChild(mediaEl);
+
+    if (index === 3 && hiddenCount > 0) {
+      const overflow = document.createElement('div');
+      overflow.className = 'overflow-indicator';
+      overflow.textContent = `+${hiddenCount}`;
+      wrapper.appendChild(overflow);
+    }
+
+    container.appendChild(wrapper);
+  });
+};
+
+const buildPost = () => {
+  const content = postText.value.trim();
+  if (!content && stagedMedia.length === 0) return;
+
+  const clone = postTemplate.content.cloneNode(true);
+  const pickedName = brandName.value.trim() || 'Brand Name';
+
+  clone.querySelector('.name').textContent = pickedName;
+  clone.querySelector('.avatar').textContent = pickedName.charAt(0).toUpperCase();
+  clone.querySelector('.copy').textContent = content || ' ';
+
+  const mediaContainer = clone.querySelector('.media');
+  if (stagedMedia.length > 0) {
+    setMediaGrid(mediaContainer, stagedMedia);
+  } else {
+    mediaContainer.remove();
+  }
+
+  feed.prepend(clone);
+  postText.value = '';
+  fileInput.value = '';
+  stagedMedia = [];
+  renderMediaList();
+};
+
+dropZone.addEventListener('click', () => fileInput.click());
+fileInput.addEventListener('change', async (event) => handleFiles(event.target.files));
+
+['dragenter', 'dragover'].forEach((eventName) => {
+  dropZone.addEventListener(eventName, (event) => {
+    event.preventDefault();
+    dropZone.classList.add('drag-over');
+  });
+});
+
+['dragleave', 'drop'].forEach((eventName) => {
+  dropZone.addEventListener(eventName, (event) => {
+    event.preventDefault();
+    dropZone.classList.remove('drag-over');
+  });
+});
+
+dropZone.addEventListener('drop', async (event) => {
+  await handleFiles(event.dataTransfer.files);
+});
+
+dropZone.addEventListener('keydown', (event) => {
+  if (event.key === 'Enter' || event.key === ' ') {
+    event.preventDefault();
+    fileInput.click();
+  }
+});
+
+submitPost.addEventListener('click', buildPost);
diff --git a/index.html b/index.html
new file mode 100644
index 0000000000000000000000000000000000000000..b2235ffd2b4416125c0ac30155cd5cc9f6e6b29e
--- /dev/null
+++ b/index.html
@@ -0,0 +1,74 @@
+<!doctype html>
+<html lang="en">
+  <head>
+    <meta charset="UTF-8" />
+    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+    <title>LinkedIn Previewer</title>
+    <link rel="stylesheet" href="styles.css" />
+  </head>
+  <body>
+    <main class="app-shell">
+      <section class="composer-panel">
+        <h1>LinkedIn Previewer</h1>
+        <p class="subheading">Create local-only post mockups for client screenshots.</p>
+
+        <label for="brandName">Brand name</label>
+        <input id="brandName" type="text" value="Brand Name" maxlength="80" />
+
+        <label for="postText">Post text</label>
+        <textarea
+          id="postText"
+          placeholder="Write your LinkedIn post here..."
+          rows="8"
+        ></textarea>
+
+        <div
+          id="dropZone"
+          class="drop-zone"
+          role="button"
+          tabindex="0"
+          aria-label="Drop images or videos here"
+        >
+          <p>Drop images/videos here or click to choose files</p>
+          <small>Supports local previews only — nothing is uploaded.</small>
+          <input id="fileInput" type="file" accept="image/*,video/*" multiple hidden />
+        </div>
+
+        <ul id="mediaList" class="media-list" aria-live="polite"></ul>
+
+        <button id="submitPost" type="button">Add to preview</button>
+      </section>
+
+      <section class="preview-panel">
+        <header class="preview-header">LinkedIn Feed Preview</header>
+        <div id="feed" class="feed"></div>
+      </section>
+    </main>
+
+    <template id="postTemplate">
+      <article class="li-post">
+        <div class="li-post-head">
+          <div class="avatar">B</div>
+          <div>
+            <div class="name">Brand Name</div>
+            <div class="meta">3mo • Edited • 🌐</div>
+          </div>
+        </div>
+        <p class="copy"></p>
+        <div class="media"></div>
+        <div class="li-stats">
+          <span>👍 ❤️ 👏 79</span>
+          <span>1 repost</span>
+        </div>
+        <div class="li-actions" aria-label="Post actions">
+          <button type="button">👍 Like</button>
+          <button type="button">💬 Comment</button>
+          <button type="button">🔁 Repost</button>
+          <button type="button">✈️ Send</button>
+        </div>
+      </article>
+    </template>
+
+    <script src="app.js"></script>
+  </body>
+</html>
diff --git a/styles.css b/styles.css
new file mode 100644
index 0000000000000000000000000000000000000000..21052d42f15ec9088d561173f0b222ba57f1f4fc
--- /dev/null
+++ b/styles.css
@@ -0,0 +1,258 @@
+:root {
+  --bg: #f4f2ee;
+  --panel: #fff;
+  --border: #d9d9d9;
+  --text: #1f2329;
+  --muted: #6f7783;
+  --primary: #0a66c2;
+}
+
+* {
+  box-sizing: border-box;
+}
+
+body {
+  margin: 0;
+  font-family: Arial, Helvetica, sans-serif;
+  background: var(--bg);
+  color: var(--text);
+}
+
+.app-shell {
+  min-height: 100vh;
+  display: grid;
+  grid-template-columns: minmax(320px, 420px) minmax(480px, 1fr);
+  gap: 16px;
+  padding: 16px;
+}
+
+.composer-panel,
+.preview-panel {
+  background: var(--panel);
+  border: 1px solid var(--border);
+  border-radius: 10px;
+  padding: 16px;
+}
+
+h1 {
+  margin: 0;
+  font-size: 1.4rem;
+}
+
+.subheading {
+  margin: 6px 0 14px;
+  color: var(--muted);
+  font-size: 0.9rem;
+}
+
+label {
+  font-weight: 700;
+  display: block;
+  margin-bottom: 8px;
+}
+
+input,
+textarea {
+  width: 100%;
+  border: 1px solid var(--border);
+  border-radius: 8px;
+  padding: 10px;
+  font: inherit;
+}
+
+#brandName {
+  margin-bottom: 14px;
+}
+
+textarea {
+  resize: vertical;
+}
+
+.drop-zone {
+  margin-top: 14px;
+  border: 2px dashed #a7c6e7;
+  border-radius: 8px;
+  background: #f4f9ff;
+  padding: 22px 10px;
+  text-align: center;
+  color: #2e5f90;
+  cursor: pointer;
+}
+
+.drop-zone.drag-over {
+  border-color: var(--primary);
+  background: #e8f2fc;
+}
+
+.media-list {
+  margin: 12px 0;
+  padding: 0;
+  list-style: none;
+  max-height: 130px;
+  overflow: auto;
+}
+
+.media-list li {
+  border: 1px solid var(--border);
+  border-radius: 6px;
+  margin-bottom: 8px;
+  padding: 8px;
+  display: flex;
+  justify-content: space-between;
+  gap: 8px;
+  font-size: 0.9rem;
+}
+
+.media-list button {
+  background: transparent;
+  border: 0;
+  color: #be2f2f;
+  cursor: pointer;
+}
+
+#submitPost {
+  width: 100%;
+  border: 0;
+  border-radius: 30px;
+  background: var(--primary);
+  color: #fff;
+  padding: 11px;
+  font-weight: 700;
+  cursor: pointer;
+}
+
+.preview-header {
+  margin-bottom: 12px;
+  font-weight: 700;
+}
+
+.feed {
+  max-width: 560px;
+  margin: 0 auto;
+  display: flex;
+  flex-direction: column;
+  gap: 14px;
+}
+
+.li-post {
+  border: 1px solid var(--border);
+  border-radius: 8px;
+  background: #fff;
+  overflow: hidden;
+}
+
+.li-post-head {
+  display: flex;
+  align-items: center;
+  gap: 10px;
+  padding: 12px;
+}
+
+.avatar {
+  width: 48px;
+  height: 48px;
+  border-radius: 8px;
+  background: #e6eef8;
+  color: #35557a;
+  font-weight: 700;
+  display: grid;
+  place-items: center;
+}
+
+.name {
+  font-weight: 700;
+}
+
+.meta {
+  color: var(--muted);
+  font-size: 0.85rem;
+}
+
+.copy {
+  margin: 0;
+  padding: 0 12px 12px;
+  white-space: pre-wrap;
+  line-height: 1.45;
+}
+
+.media {
+  display: grid;
+  gap: 2px;
+  background: #ddd;
+}
+
+.media-item {
+  position: relative;
+  overflow: hidden;
+  background: #ececec;
+  min-height: 180px;
+}
+
+.media-item img,
+.media-item video {
+  width: 100%;
+  height: 100%;
+  display: block;
+  object-fit: cover;
+}
+
+.media.layout-1 .media-item {
+  min-height: 360px;
+}
+
+.media.portrait-collage {
+  grid-template-columns: 2fr 1fr;
+  grid-auto-rows: auto;
+}
+
+.media.portrait-collage .media-item:first-child {
+  grid-row: 1 / span 3;
+  aspect-ratio: 2 / 3;
+  min-height: auto;
+}
+
+.media.portrait-collage .media-item:not(:first-child) {
+  aspect-ratio: 1 / 1;
+  min-height: auto;
+}
+
+.overflow-indicator {
+  position: absolute;
+  inset: 0;
+  display: grid;
+  place-items: center;
+  background: rgba(0, 0, 0, 0.56);
+  color: #fff;
+  font-size: 2rem;
+  font-weight: 700;
+}
+
+.li-stats {
+  font-size: 0.85rem;
+  color: var(--muted);
+  display: flex;
+  justify-content: space-between;
+  padding: 10px 12px;
+  border-top: 1px solid #eee;
+}
+
+.li-actions {
+  display: grid;
+  grid-template-columns: repeat(4, 1fr);
+  border-top: 1px solid #eee;
+}
+
+.li-actions button {
+  border: 0;
+  background: #fff;
+  padding: 11px 6px;
+  color: #555;
+  font-weight: 700;
+  cursor: default;
+}
+
+@media (max-width: 960px) {
+  .app-shell {
+    grid-template-columns: 1fr;
+  }
+}
