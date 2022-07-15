var paper_doi;
var paper_name;
var abstract;
var authors = [];

curUrl = document.location.href;
console.log(curUrl);
if(curUrl.includes("dl.acm.org/doi"))
{
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
}
else if(curUrl.includes("ieeexplore.ieee.org/document/"))
{
    //append-to-href="?src=document"
    var as = document.getElementsByTagName("a");
    for (var i = 0; i < as.length; i++) {
        if (as[i].getAttribute("append-to-href") == '?src=document') {
            paper_doi = as[i].textContent;
        }
    }
    console.log("DOI "+paper_doi);

    //h1 -> class="document-title text-2xl-md-lh" ->span
    var h1s = document.getElementsByTagName("h1");
    for (var i = 0; i < h1s.length; i++) {
        if (h1s[i].className == 'document-title text-2xl-md-lh') {
            paper_name = h1s[i].childNodes[0].textContent;
        }
    }
    console.log("paper name "+paper_name);


    var authText="";
    var spans = document.querySelectorAll("xpl-author-banner");
    for (var i = 0; i < spans.length; i++) {
        authText += spans[i].textContent;
    }
    authors = authText.split("; ");
    console.log(authors);

    //fix this
    abstract = "";
    var ab = document.querySelectorAll("xpl-document-abstract");
    for (var i = 0; i < ab.length; i++) {
        abstract += ab[i].textContent;
    }
    console.log(abstract);
}




chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.get === "acm") {
          var data = {name: paper_name, authors: authors, abstract: abstract};
          console.log(data);
        sendResponse(data);
      }
      else if (request.get === "ieee") {
        var data = {doi: paper_doi, name: paper_name, authors: authors, abstract: abstract};
        console.log(data);
      sendResponse(data);
    }
    }
);
