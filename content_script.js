
function insertSaveIcon() {
  // 查找具有 "aria-label='Reply'" 属性的元素
  var replyElement = document.querySelector('div[aria-label="Reply"]');

  if (replyElement && replyElement.parentElement && replyElement.parentElement.parentElement) {
    var parentElement = replyElement.parentElement;
    var grandParentElement = replyElement.parentElement.parentElement;
    if (!grandParentElement.querySelector('div[aria-label="Save"]')) {
      var newElement = parentElement.cloneNode(true);
      var saveElement = newElement.childNodes[0];
      saveElement.setAttribute('aria-label', 'Save');
      saveElement.setAttribute('data-testid', 'save');
      saveElement.setAttribute('title', 'Save as Markdown');
      saveElement.addEventListener('click', saveThreadAsMarkdown);
      var svgElement = saveElement.querySelector('svg');
      svgElement.querySelector('path').setAttribute('d', 'M17 3H7C5.895 3 5 3.895 5 5V19C5 20.105 5.895 21 7 21H17C18.105 21 19 20.105 19 19V5C19 3.895 18.105 3 17 3M12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19M17 9H7V7H17V9Z');
      grandParentElement.append(newElement);
    }
  }


  // 保存主题为 Markdown
  // function saveThreadAsMarkdown() {
  //   // 在这里编写将主题保存为 Markdown 的代码
  //   console.log('Save thread as Markdown');
  // }

}
// 保存主题为 Markdown
function saveThreadAsMarkdown() {
  // 获取所有的推文
  var tweets = document.querySelectorAll('[data-testid="tweet"]');

  // 如果页面上没有推文，就中止函数
  if (tweets.length === 0) {
    console.log('No tweets found');
    return;
  }

  // 创建 markdown 变量并添加标题和日期
  var markdown = '# Twitter thread\n\n';
  markdown += 'Date: ' + new Date().toLocaleDateString() + '\n\n';

  // 遍历所有的推文
  for (var i = 0; i < tweets.length; i++) {
    var tweet = tweets[i];

    var markdownContent = marked(htmlContent);
    // 将用户名和文本添加到 markdown 中
    markdown += '---' + markdownContent + '\n\n';
    // markdown += text.replace(/\n+/g, '\n') + '\n\n';
  }
  var message = {
    action: 'saveMarkdown',
    fileName: 'temp.md',
    markdownContent: markdown
  };

  // 发送消息到 background.js
  chrome.runtime.sendMessage(message, function (response) {
    console.log('response from background.js:', response);
  });

}



var script = document.createElement('script');
script.src = chrome.runtime.getURL('marked.min.js');
script.onload = function () {
  // 引入 marked.js 成功
  // 在这里编写代码，例如调用 marked() 函数
  var markdown = marked('# Hello, world!');
  alert(markdown);
  setInterval(insertSaveIcon, 1000);
};
document.head.appendChild(script);

// // 调用 marked() 函数
// var markdown = marked('# Hello, world!');
// console.log(markdown);