var insertThumbnail = function () {
  var elements = document.getElementsByClassName('chatTimeLineMessageArea');

  var imageTags = [];

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    if (element.childNodes.length > 1) {
      var message = element.childNodes[1];

      for (var j = 0; j < message.childNodes.length; j++) {
        var messageChildNode = message.childNodes[j];

        if (messageChildNode.tagName == 'A') {
          var href = messageChildNode.href;
          var pattern = /^https:\/\/gyazo.com\//;
          var match = href.match(pattern);

          if (match) {
            var imgDiv = document.createElement('div');
            imgDiv.className = 'chatwork-extension--thumbnail';
            imgDiv.style.margin = '10px 0 0 0';
            var img = document.createElement('img');
            img.src = href + '.png';
            img.width = 100;
            img.style.cursor = 'zoom-in';
            imgDiv.appendChild(img);
            element.appendChild(imgDiv);

            imageTags.push(img);
          }
        }
      }
    }
  }

  if (imageTags.length > 0) {
    var viewer = new Viewer(img, {
      toolbar: false,
      movable: false,
      zoomable: false,
      transition: false
    });
  }
};
insertThumbnail();

document.addEventListener('DOMNodeInserted', function (e) {
  if (!e.target.className) {
    return;
  }
  
  // Add 'Copy Link' button to each message
  if (e.target.className.indexOf('_messageActionNav') > -1) {
    var childNodes = e.target.childNodes;

    if (childNodes.length > 0) {
      var li = childNodes[0];
      var messageId = li.attributes.getNamedItem('data-cwui-ab-id').value;
      var chatUrl = window.location.href;
      var messageUrl = chatUrl + '-' + messageId;

      var clipboard = new Clipboard('.btn');
      clipboard.on('success', function (e) {
        console.log('Copied', e.text);
      });

      var copyButton = document.createElement('button');
      copyButton.className = 'btn';
      var text = document.createTextNode('Copy Link');
      copyButton.appendChild(text);
      var attribute = document.createAttribute('data-clipboard-text');
      attribute.value = messageUrl;
      copyButton.setAttributeNode(attribute);
      
      e.target.appendChild(copyButton);
    }
  }
});
