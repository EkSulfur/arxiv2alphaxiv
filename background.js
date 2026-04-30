// Background service worker for the extension.
// It listens for the toolbar button click and redirects the active tab
// from arxiv.org to alphaxiv.org when the current page is an arXiv abstract page.

function isArxivAbstractUrl(url) {
  return typeof url === "string" && /^https?:\/\/arxiv\.org\/(abs|pdf)\/[^/?#]+/.test(url);
}

function toAlphaXivUrl(arxivUrl) {
  return arxivUrl.replace(/^https?:\/\/arxiv\.org/, "https://alphaxiv.org");
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.id || !tab.url) {
    return;
  }

  // Only act on arXiv abstract pages.
  if (!isArxivAbstractUrl(tab.url)) {
    return;
  }

  const targetUrl = toAlphaXivUrl(tab.url);

  // Navigate the current tab normally so the previous arXiv page stays in history.
  await chrome.tabs.update(tab.id, { url: targetUrl });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Content script sends a status check so the extension can detect
  // whether the current page is a supported arXiv abstract page.
  if (message && message.type === "CHECK_ARXIV_PAGE") {
    const isMatch = isArxivAbstractUrl(message.url);
    sendResponse({ isMatch });
  }
});
