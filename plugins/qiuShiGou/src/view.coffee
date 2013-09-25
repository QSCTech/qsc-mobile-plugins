class View

  test = () -> view.msg 'test'

  constructor: (@data) ->
    @query = {}
  
  ###
  返回 header 的 HTML
  ###
  headerHTML: (title) -> '<span class="title">'+title+'</span><div class="icon"><i class="icon-circle-arrow-left"></i></div>'

  list: (query) ->
    @query = query
    
    success = (items) ->
      # 过滤无效项
      items = items.filter (item) -> item?

      # 生成 html
      html = items.map (item) ->
        arr = [['物品', item.name], ['校区', item.campus], ['地点', item.place], ['具体描述', item.detail], ['联系方式', item.contact],['发布时间',(new Date(item.announcedate*1000)).toLocaleDateString()],['当前状态',''],['     ','<a onclick=test()>我已找到</a> ']]
        arr = arr.map (elem) ->
          elem = elem.map (el) -> '<td>'+el+'</td>'
          "<tr>#{elem.join('')}</tr>"
        "<table>#{arr.join('')}</table>"
      $('#items').html html.join('')
      $('.prev').toggleClass('disabled', query.page is 1)
      $('.next').toggleClass('disabled', items.length isnt 10)

    error = => @msg '获取数据失败，请检查网络连接'
      
    @data.get query, success, error

  nextPage: ->
    $('html, body').scrollTop(0)
    @query.page++
    @list @query

  prevPage: ->
    $('html, body').scrollTop(0)
    @query.page--
    @list @query

  section: (section) ->
    $('.section').hide()
    $('#'+section).show()

  about: -> @section 'about'

  lost: ->
    $('#list .header .title').html '寻物启事'
    @list {type: 'lost', page: 1}
    $('#search').hide()
    @section 'list'
    
  found: ->
    $('#list .header .title').html '失物招领'
    @list {type: 'found', page: 1}
    $('#search').hide()
    @section 'list'

  upload: -> @section 'upload'

  starred: ->
    M = new QSCMobile('qiuShiGou')
    Stuid = 0
    success = (stuid) ->
      Stuid = stuid
    error = (e) ->
      console.log(e)
    M.user.stuid(success, error)
    $('#list .header .title').html '我发布的'
    @list {stuid: Stuid, page: 1}
    $('#search').hide()
    @section 'list'

  index: -> @section 'index'

  search: ->
    $('#list .header .title').html '物品搜索'
    $('#search').show()
    @list {keyword: '', page: 1}
    @section 'list'
    
  msg: (msg) -> alert msg
