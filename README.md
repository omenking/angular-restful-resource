angular-restful-resource
========================
 
Rails like routes in your angular services hooray!

1. Extend your service with Restful.
2. Fill in the table_name (resource name)
3. (Optional) Set a namespace

`````coffeescript
class Task extends Restful
  namespace:  'admin/api'
  table_name: 'tasks'
  constructor:(@$rootScope,@$http)->
    super
  collection:
    rock  : 'get' 
    soup  : 'post'
    boat  : 'put'
    float : 'destroy'
  member:
    blam     : 'get'
    wham     : 'post'
    thankyou : 'put'
    mamn     : 'destroy'
app.service 'Playlist', ['$rootScope','$http',Task]
`````

### What the requests look like:

You can pass params into all of these methods.
You can't simply pass the id you have to have
it an object like I'm doing here.

`````coffeescript
model  = { id: 1 }
params = { name: "Get'er done" }


Task.index()              # GET    /admin/api/tasks     
Task.show(model)          # GET    /admin/api/tasks/1
Task.new()                # GET    /admin/api/tasks/new
Task.create(model,params) # POST   /admin/api/tasks
Task.edit(model)          # GET    /admin/api/tasks/1/edit
Task.update(model,params) # PUT    /admin/api/tasks/1
Task.destroy(model)       # DELETE /admin/api/tasks/1

Task.rock()  # GET     /admin/api/tasks/rock
Task.soup()  # POST    /admin/api/tasks/soup
Task.boat()  # PUT     /admin/api/tasks/boat
Task.float() # DELETE  /admin/api/tasks/float

Task.blam(model)     # GET    /admin/api/tasks/1/blam
Task.wham(model)     # POST   /admin/api/tasks/1/wham
Task.thankyou(model) # PUT    /admin/api/tasks/1/thankyou
Task.mamn(model)     # DELETE /admin/api/tasks/1/mamn
`````

### What will get broadcasted back

In the case of an error _err is appended to the event name.


`````coffeescript
Task.index()              # index_tasks(_err)
Task.show(model)          # show_tasks(_err)
Task.new()                # new_tasks(_err)
Task.create(model,params) # create_tasks(_err)
Task.edit(model)          # edit_tasks(_err)
Task.update(model,params) # update_tasks(_err)
Task.destroy(model)       # destroy_tasks(_err)

Task.rock()  # rock_tasks(_err)
Task.soup()  # soup_tasks(_err)
Task.boat()  # boat_tasks(_err)
Task.float() # delete_tasks(_err)

Task.blam(model)     # blam_tasks(_err)
Task.wham(model)     # wham_tasks(_err)
Task.thankyou(model) # thankout_tasks(_err)
Task.mamn(model)     # mamn_tasks(_err)
`````

So in your controller all you have to do is listen.
eg.

`````coffeescript
class Klass
  constructor:(@$scope,@Parent)->
    @$scope.$on 'index_tasks'      , @index_success
    @$scope.$on 'show_tasks'       , @show_success
    @$scope.$on 'new_tasks'        , @new_success
    @$scope.$on 'create_tasks'     , @create_success
    @$scope.$on 'edit_tasks'       , @edit_success
    @$scope.$on 'update_tasks'     , @update_success
    @$scope.$on 'destroy_tasks'    , @destroy_success
    @$scope.$on 'destroy_tasks_err', @destroy_err
    # etc.. you get the idea
  index_success   : (e,data)=> console.log 'index_success'
  show_success    : (e,data)=> console.log 'show_success'
  new_success     : (e,data)=> console.log 'new_success'
  create_success  : (e,data)=> console.log 'create_success'
  edit_success    : (e,data)=> console.log 'edit_success'
  update_success  : (e,data)=> console.log 'update_success'
  destroy_success : (e,data)=> console.log 'destroy_success'
  destroy_err     : (e,data)=> console.log 'destroy_err'
app.controller 'index_tasks', ['$scope','Parent',Klass]
`````
