// 监听来自content script的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'saveMarkdown') {
      // 使用chrome.scripting API执行保存操作
      chrome.scripting.executeScript(
        {
          target: { tabId: sender.tab.id },
          func: saveMarkdown,
          args: [request.fileName, request.markdownContent]
        },
        () => {
          sendResponse({ result: 'success' });
        }
      );
    }
    return true;
  });
  
  // 保存Markdown文件到本地
  function saveMarkdown(fileName, markdownContent) {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }
  