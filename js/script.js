var Relay = (function() {
  var ajaxOpt = {method:"get"};
  return {
    relayOn: function(relay) {
      $.ajax("/api/relay/on/" + relay, ajaxOpt)
        .done(this.updateResponse);
    },
    relayOff: function(relay) {
      $.ajax("/api/relay/off/" + relay, ajaxOpt)
        .done(this.updateResponse);
    },
    allOff: function() {
      $.ajax("/api/relay/af", ajaxOpt)
        .done(this.updateResponse);
    },
    allOn: function() {
      $.ajax("/api/relay/ao", ajaxOpt)
        .done(this.updateResponse);
    },
    relayToggle: function(relay) {
      $.ajax("/api/relay/toggle/" + relay, ajaxOpt)
        .done(this.updateResponse);
    },
    toggleSilent: function() {
      $.ajax("/api/relay/ts", ajaxOpt)
        .done(this.updateResponse);
    },
    updateResponse: function(data, status, jqXHR) {
      $("#relayResponse").html(data);
    }
  }
})();
