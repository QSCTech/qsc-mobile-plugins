class SDK

  construtor: ->
    window.onhashchange = (event) =>
      @onRequest event.newURL
  
sdk = new SDK
