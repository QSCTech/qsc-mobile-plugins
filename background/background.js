var plugins, head, i, plugin, script;
var fireBackground = function(plugins) {
    plugins = plugins.split(',');
    head = document.getElementsByTagName('HEAD').item(0);
    for (i = 0; i < plugins.length; i++) {
        plugin = plugins[i];
        if(plugin && plugin.length > 0) {
            console.log(plugin);
            script = document.createElement("script");
            script.type = "text/javascript";
            script.src = '../plugins/'+plugin+'/background.js';
            head.appendChild(script);
        }
    }
}