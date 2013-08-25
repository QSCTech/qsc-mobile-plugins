fs = require 'fs'

manifest = (dirs, filename, callback) ->
  packages = []
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
        console.log "Generating #{filename}"
        data = JSON.stringify packages, null, 2
        console.log data
        fs.writeFile filename, data, callback

build = (callback) ->

  manifest ['api', 'lib'], 'platform.json', ->
    fs.readdir 'plugins', (err, dirs) ->
      throw err if err
      dirs = dirs.map (dir) -> "plugins/#{dir}"
      manifest dirs, 'plugins.json'

task "build", "Combine all plugins' manifest & api/manifest, lib/manifest into packages.json", ->
  build()  
