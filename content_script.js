function insertSaveIcon() {
  const toolbars = document.querySelectorAll('div[role="group"][aria-label*="Reply, Retweet, Like"]');

  toolbars.forEach((toolbar) => {
    if (!toolbar.querySelector('.save-thread-btn')) {
      const button = document.createElement('button');
      button.className = 'save-thread-btn';
      button.style.backgroundImage = `url(${chrome.runtime.getURL('save-icon-16.png')})`;

      button.addEventListener('click', (e) => {
        e.stopPropagation();
        saveThreadAsMarkdown();
      });

      toolbar.insertBefore(button, toolbar.firstChild);
    }
  });
}

function saveThreadAsMarkdown() {
  // 实现保存为 Markdown 的功能
  console.log('Save thread as Markdown');
}

setInterval(insertSaveIcon, 1000);
