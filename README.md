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


Material.index()              # GET    /admin/api/tasks     
Material.show(model)          # GET    /admin/api/tasks/1
Material.new()                # GET    /admin/api/tasks/new
Material.create(model,params) # POST   /admin/api/tasks
Material.edit(model)          # GET    /admin/api/tasks/1/edit
Material.update(model,params) # PUT    /admin/api/tasks/1
Material.destroy(model)       # DELETE /admin/api/tasks/1

Material.rock()  # GET     /admin/api/tasks/rock
Material.soup()  # POST    /admin/api/tasks/soup
Material.boat()  # PUT     /admin/api/tasks/boat
Material.float() # DELETE  /admin/api/tasks/float

Material.blam(model)     # GET    /admin/api/tasks/1/blam
Material.wham(model)     # POST   /admin/api/tasks/1/wham
Material.thankyou(model) # PUT    /admin/api/tasks/1/thankyou
Material.mamn(model)     # DELETE /admin/api/tasks/1/mamn
`````

### What will get broadcasted back

In the case of an error _err is appended to the event name.

`````coffeescript
Material.index()              # index_materials(_err)
Material.show(model)          # show_materials(_err)
Material.new()                # new_materials(_err)
Material.create(model,params) # create_materials(_err)
Material.edit(model)          # edit_materials(_err)
Material.update(model,params) # update_materials(_err)
Material.destroy(model)       # destroy_materials(_err)

Material.rock()  # GET     # rock_materials(_err)
Material.soup()  # POST    # soup_materials(_err)
Material.boat()  # PUT     # boat_materials(_err)
Material.float() # DELETE  # delete_materials(_err)

Material.blam(model)     # blam_materials(_err)
Material.wham(model)     # wham_materials(_err)
Material.thankyou(model) # thankout_materials(_err)
Material.mamn(model)     # mamn_materials(_err)
`````

