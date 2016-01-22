// Add 'Copy Link' button to each message
document.addEventListener('DOMNodeInserted', function (e) {
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
