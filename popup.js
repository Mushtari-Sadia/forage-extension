
const ids = [
    "Test1",
    "Test2",
    "Test3"
]
ids.forEach(element => {
    document.getElementById(element).style.display = 'none';
});

  chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
    if(tab.url.includes("dl.acm.org/doi"))
    {
        ids.forEach(element => {
            document.getElementById(element).style.display = 'block';
        });
    }
    else
    {
        ids.forEach(element => {
            document.getElementById(element).style.display = 'none';
        });
    }
  });