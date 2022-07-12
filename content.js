var paper_name;
var abstract;
var authors = [];

var h1s = document.getElementsByTagName("h1");
for (var i = 0; i < h1s.length; i++) {
    if (h1s[i].className == 'citation__title') {
        paper_name = h1s[i].textContent;
    }
}


var divs = document.getElementsByTagName("div");
for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == 'abstractSection abstractInFull') {
        console.log(divs[i]);
        console.log(divs[i].childNodes);
        abstract_p = divs[i].childNodes[1];
        console.log(abstract_p);
        abstract = abstract_p.textContent;
        console.log(abstract);
    }
}

parent_div = document.getElementById("sb-1");
authors_parent_ul = parent_div.childNodes[1];
// console.log(authors_parent_ul);
authors_li = authors_parent_ul.childNodes;
// console.log(authors_li);

for (var i = 3; i < authors_li.length; i=i+2) {
    var auths = authors_li[i].childNodes[0];
    authors.push(auths.getAttribute("title"));
    
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.get === "info") {
          var data = {name: paper_name, authors: authors, abstract: abstract};
          console.log(data);
        sendResponse(data);
      }
    }
);
