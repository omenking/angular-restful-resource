#
# @license Andrew Brown v1.0.0
# (c) 2013 http://monsterboxpro.com
# License: MIT
#

class window.Restful
  _get:(action,name,params={},opts={})=>
    req = @$http
      method : 'GET'
      url    : name
      params : params
    @_callback req, action, opts
  _post:(action,name,params={},opts={})=>
    req  = @$http.post name, params
    @_callback req, action, opts
  _put:(action,name,params,opts={})=>
    req  = @$http.put name, params
    @_callback req, action, opts
  _delete:(action,name,params={},opts={})=>
    req = @$http
      method : 'DELETE'
      url    : name
      params : params
    @_callback req, action, opts
  _callback:(req,action,opts)=>
    msg  = "#{@table_name}/#{action}"
    req.success (data)=> @$rootScope.$broadcast msg         , data, opts
    req.error (data)=>   @$rootScope.$broadcast "#{msg}#err", data, opts
  _extract_id:(model)=>
    if typeof model is String || typeof model is Number
      model
    else
      model.id
  index:(params,opts={})=>
    action = 'index'
    name = @path()
    @_get action, name, params, opts
  show:(model,params,opts={})=>
    action = 'show'
    id     = @_extract_id model
    name   = @path id
    @_get action, name, params, opts
  new:(params,opts={})=>
    action = 'new'
    name   = @path action
    @_get action, name, params, opts
  create:(params,opts={})=>
    action = 'create'
    name   = @path()
    @_post action, name, params, opts
  edit:(model,params,opts={})=>
    action = 'edit'
    id     = @_extract_id model
    name   = @path id, action
    @_get action, name, params, opts
  update:(model,params,opts={})=>
    action = 'update'
    id     = @_extract_id model
    name   = @path id
    @_put action, name, params, opts
  destroy:(model,params,opts={})=>
    action = 'destroy'
    id     = @_extract_id model
    name   = @path id
    @_delete action, name, params, opts
  path:(args...)=>
    path = []
    path.push @namespace if @namespace
    path.push @table_name
    path.push a for a in args
    path = path.join '/'
    "/#{path}"
  constructor:->
    for action, method of @collection
      name = @path action
      fun = switch method
        when 'get'     then (params,opts)=> @_get    action, name, params, opts
        when 'post'    then (params,opts)=> @_post   action, name, params, opts
        when 'put'     then (params,opts)=> @_put    action, name, params, opts
        when 'destroy' then (params,opts)=> @_delete action, name, params, opts
      @[action] = fun
    for action, method of @member
      fun = switch method
        when 'get'     then (model,params,opts)=> @_get    action, @path(model.id,action), params, opts
        when 'post'    then (model,params,opts)=> @_post   action, @path(model.id,action), params, opts
        when 'put'     then (model,params,opts)=> @_put    action, @path(model.id,action), params, opts
        when 'destroy' then (model,params,opts)=> @_delete action, @path(model.id,action), params, opts
      @[action] = fun

