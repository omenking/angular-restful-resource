#
# @license Andrew Brown v1.0.0
# (c) 2013 http://monsterboxpro.com
# License: MIT
#

class window.Restful
  _get:(action,name,params={})=>
    msg  = "#{action}_#{@table_name}"
    req = @$http
      method : 'GET'
      url    : name
      params : params
    @_callback req, msg
  _post:(action,name,params={})=>
    msg  = "#{action}_#{@table_name}"
    req  = @$http.post name, params
    @_callback req, msg
  _put:(action,name,params)=>
    msg  = "#{action}_#{@table_name}"
    req  = @$http.put name, params
    @_callback req, msg
  _delete:(action,name,params={})=>
    msg  = "#{action}_#{@table_name}"
    req  = @$http.delete name, params
    @_callback req, msg
  _callback:(req,msg)=>
    req.success (data)=> @$rootScope.$broadcast msg         , data
    req.error (data)=>   @$rootScope.$broadcast "#{msg}_err", data
  index:(params)=>
    action = 'index'
    name = @path()
    @_get action, name, params
  show:(model,params)=>
    action = 'show'
    name   = @path model.id
    @_get action, name, params
  new:(params)=>
    action = 'new'
    name   = @path action
    @_get action, name, params
  create:(model,params)=>
    action = 'create'
    name   = @path()
    @_post action, name, params
  edit:(model,params)=>
    action = 'edit'
    name   = @path model.id, action
    @_get action, name, params
  update:(model,params)=>
    action = 'update'
    name   = @path model.id
    @_put action, name, params
  destroy:(model,params)=>
    action = 'destroy'
    name   = @path model.id
    @_delete action, name, params
  path:(args...)=>
    path = []
    path.push @namespace if @namespace
    path.push @table_name
    path.push a for a in args
    path = path.join '/'
    "/#{path}"
  constructor:->
    _.each @collection, (kind,action)=>
      name = @path action
      fun = switch kind
        when 'get'     then (params)=> @_get    action, name, params
        when 'post'    then (params)=> @_post   action, name, params
        when 'put'     then (params)=> @_put    action, name, params
        when 'destroy' then (params)=> @_delete action, name, params
      @[action] = fun
    _.each @member, (kind,action)=>
      name = @path action
      fun = switch kind
        when 'get'     then (model,params)=> @_get    action, @path(model,action), params
        when 'post'    then (model,params)=> @_post   action, @path(model,action), params
        when 'put'     then (model,params)=> @_put    action, @path(model,action), params
        when 'destroy' then (model,params)=> @_delete action, @path(model,action), params
      @[action] = fun
