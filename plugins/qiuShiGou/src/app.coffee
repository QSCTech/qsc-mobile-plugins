data = new Data
view = new View data

$ ->
  # global bindings
  $('#about-icon').on 'click', -> view.about()
  $('body').on 'click', '.icon-circle-arrow-left', -> view.index()
  $('body').on 'click', 'table', -> $(this).toggleClass 'clicked'
  $('body').on 'click', '.prev', -> view.prevPage() unless $(this).hasClass 'disabled'
  $('body').on 'click', '.next', -> view.nextPage() unless $(this).hasClass 'disabled'


  # search
  $('.icon.search').on 'click', ->
    query = {keyword: $('#search-input').val(), page: 1}
    view.list query

  # index menu
  $('#index').on 'click', '.menu li', ->
    section = $(this).attr 'class'
    view[section]?()

  # upload bindings
  $('.select .option').click ->
    $(this).parent().find('.selected').removeClass('selected')
    $(this).addClass('selected')

  $('#upload .submit').click ->
    obj = {}
    for elem in ['name', 'detail', 'place', 'contact']
      obj[elem] = $('#upload .'+elem).val()
    for elem in ['type', 'campus']
      obj[elem] = $('#upload .'+elem).find('.selected').text()
    obj['type'] = if obj['type'] is '失物招领' then 'found' else 'lost'
    success = -> view.msg '上传成功'
    fail = -> view.msg '上传失败，请检查您的网络连接'
    data.upload obj, success, fail
  # init
  view.index()
