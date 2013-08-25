fs = require 'fs'

build = (callback) ->

  dirs = ['api', 'lib']
  packages = []

  fs.readdir 'plugins', (err, plugins) ->
    throw err if err
    dirs.push "plugins/#{plugin}" for plugin in plugins
    pending = dirs.length
    dirs.forEach (dir) ->
      file = "#{dir}/manifest.json"
      fs.readFile file, {encoding: 'utf-8'}, (err, data) ->

        console.log "Parsing #{file}"
        throw err if err

        data = JSON.parse data
        data.path = dir
        packages.push data

        pending--
        if pending is 0
          data = JSON.stringify packages
          fs.writeFile 'packages.json', data, callback

task "build", "Combine all plugins' manifest & api/manifest, lib/manifest into packages.json", ->
  build()  
