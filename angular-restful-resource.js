/**
 * @license Andrew Brown v1.0.0
 * (c) 2013 http://monsterboxpro.com
 * License: MIT
 */
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

window.Restful = (function() {

  Restful.prototype._get = function(action, name, params) {
    var msg, req;
    if (params == null) {
      params = {};
    }
    msg = "" + action + "_" + this.table_name;
    req = this.$http({
      method: 'GET',
      url: name,
      params: params
    });
    return this._callback(req, msg);
  };

  Restful.prototype._post = function(action, name, params) {
    var msg, req;
    if (params == null) {
      params = {};
    }
    msg = "" + action + "_" + this.table_name;
    req = this.$http.post(name, params);
    return this._callback(req, msg);
  };

  Restful.prototype._put = function(action, name, params) {
    var msg, req;
    msg = "" + action + "_" + this.table_name;
    req = this.$http.put(name, params);
    return this._callback(req, msg);
  };

  Restful.prototype._delete = function(action, name, params) {
    var msg, req;
    if (params == null) {
      params = {};
    }
    msg = "" + action + "_" + this.table_name;
    req = this.$http["delete"](name, params);
    return this._callback(req, msg);
  };

  Restful.prototype._callback = function(req, msg) {
    var _this = this;
    req.success(function(data) {
      return _this.$rootScope.$broadcast(msg, data);
    });
    return req.error(function(data) {
      return _this.$rootScope.$broadcast("" + msg + "_err", data);
    });
  };

  Restful.prototype.index = function(params) {
    var action, name;
    action = 'index';
    name = this.path();
    return this._get(action, name, params);
  };

  Restful.prototype.show = function(model, params) {
    var action, name;
    action = 'show';
    name = this.path(model.id);
    return this._get(action, name, params);
  };

  Restful.prototype["new"] = function(params) {
    var action, name;
    action = 'new';
    name = this.path(action);
    return this._get(action, name, params);
  };

  Restful.prototype.create = function(model, params) {
    var action, name;
    action = 'create';
    name = this.path();
    return this._post(action, name, params);
  };

  Restful.prototype.edit = function(model, params) {
    var action, name;
    action = 'edit';
    name = this.path(model.id, action);
    return this._get(action, name, params);
  };

  Restful.prototype.update = function(model, params) {
    var action, name;
    action = 'update';
    name = this.path(model.id);
    return this._put(action, name, params);
  };

  Restful.prototype.destroy = function(model, params) {
    var action, name;
    action = 'destroy';
    name = this.path(model.id);
    return this._delete(action, name, params);
  };

  Restful.prototype.path = function() {
    var a, args, path, _i, _len;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    path = [];
    if (this.namespace) {
      path.push(this.namespace);
    }
    path.push(this.table_name);
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      a = args[_i];
      path.push(a);
    }
    path = path.join('/');
    return "/" + path;
  };

  function Restful() {
    this.path = __bind(this.path, this);

    this.destroy = __bind(this.destroy, this);

    this.update = __bind(this.update, this);

    this.edit = __bind(this.edit, this);

    this.create = __bind(this.create, this);

    this["new"] = __bind(this["new"], this);

    this.show = __bind(this.show, this);

    this.index = __bind(this.index, this);

    this._callback = __bind(this._callback, this);

    this._delete = __bind(this._delete, this);

    this._put = __bind(this._put, this);

    this._post = __bind(this._post, this);

    this._get = __bind(this._get, this);

    var _this = this;
    _.each(this.collection, function(kind, action) {
      var fun, name;
      name = _this.path(action);
      fun = (function() {
        var _this = this;
        switch (kind) {
          case 'get':
            return function(params) {
              return _this._get(action, name, params);
            };
          case 'post':
            return function(params) {
              return _this._post(action, name, params);
            };
          case 'put':
            return function(params) {
              return _this._put(action, name, params);
            };
          case 'destroy':
            return function(params) {
              return _this._delete(action, name, params);
            };
        }
      }).call(_this);
      return _this[action] = fun;
    });
    _.each(this.member, function(kind, action) {
      var fun, name;
      name = _this.path(action);
      fun = (function() {
        var _this = this;
        switch (kind) {
          case 'get':
            return function(model, params) {
              return _this._get(action, _this.path(model, action), params);
            };
          case 'post':
            return function(model, params) {
              return _this._post(action, _this.path(model, action), params);
            };
          case 'put':
            return function(model, params) {
              return _this._put(action, _this.path(model, action), params);
            };
          case 'destroy':
            return function(model, params) {
              return _this._delete(action, _this.path(model, action), params);
            };
        }
      }).call(_this);
      return _this[action] = fun;
    });
  }

  return Restful;

})();
