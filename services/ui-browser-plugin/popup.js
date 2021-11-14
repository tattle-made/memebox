document.addEventListener(
  "DOMContentLoaded",
  function () {
    var checkButton = document.getElementById("bookmarkButton");
    checkButton.addEventListener(
      "click",
      function () {
        chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabs) {
            // alert(tabs[0].url);
            // console.log(tabs[0].url);
            const req = new XMLHttpRequest();
            const baseUrl = "http://localhost:3000/memes/bookmark";

            var title = document.getElementById("title").value;
            var nonEmptyTitle = title ? title : "";

            var payload = {
              url: tabs[0].url,
              title: nonEmptyTitle,
            };

            req.open("POST", baseUrl, true);
            req.setRequestHeader("Content-type", "application/json");
            req.send(JSON.stringify(payload));
            setTimeout(function () {
              window.close();
            }, 250);
          }
        );
      },
      false
    );
  },
  false
);
