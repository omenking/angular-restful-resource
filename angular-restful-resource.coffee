#
# @license Andrew Brown v1.0.0
# (c) 2013 http://monsterboxpro.com
# License: MIT
#

class window.Restful
  _get:(action,name,params={},opts={})=>
    msg  = "#{action}_#{@table_name}"
    req = @$http
      method : 'GET'
      url    : name
      params : params
    @_callback req, msg, opts
  _post:(action,name,params={},opts={})=>
    msg  = "#{action}_#{@table_name}"
    req  = @$http.post name, params
    @_callback req, msg, opts
  _put:(action,name,params,opts={})=>
    msg  = "#{action}_#{@table_name}"
    req  = @$http.put name, params
    @_callback req, msg, opts
  _delete:(action,name,params={},opts={})=>
    msg  = "#{action}_#{@table_name}"
    req = @$http
      method : 'DELETE'
      url    : name
      params : params
    @_callback req, msg, opts
  _callback:(req,msg, opts)=>
    req.success (data)=> @$rootScope.$broadcast msg         , data, opts
    req.error (data)=>   @$rootScope.$broadcast "#{msg}_err", data, opts
  index:(params,opts={})=>
    action = 'index'
    name = @path()
    @_get action, name, params, opts
  show:(model,params,opts={})=>
    action = 'show'
    name   = @path model.id
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
    name   = @path model.id, action
    @_get action, name, params, opts
  update:(model,params,opts={})=>
    action = 'update'
    name   = @path model.id
    @_put action, name, params, opts
  destroy:(model,params,opts={})=>
    action = 'destroy'
    name   = @path model.id
    @_delete action, name, params, opts
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
        when 'get'     then (params,opts)=> @_get    action, name, params, opts
        when 'post'    then (params,opts)=> @_post   action, name, params, opts
        when 'put'     then (params,opts)=> @_put    action, name, params, opts
        when 'destroy' then (params,opts)=> @_delete action, name, params, opts
      @[action] = fun
    _.each @member, (kind,action)=>
      fun = switch kind
        when 'get'     then (model,params,opts)=> @_get    action, @path(model.id,action), params, opts
        when 'post'    then (model,params,opts)=> @_post   action, @path(model.id,action), params, opts
        when 'put'     then (model,params,opts)=> @_put    action, @path(model.id,action), params, opts
        when 'destroy' then (model,params,opts)=> @_delete action, @path(model.id,action), params, opts
      @[action] = fun

