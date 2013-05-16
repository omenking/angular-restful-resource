(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  window.Restful = (function() {
    Restful.prototype._get = function(action, name, params, opts) {
      var req;

      if (params == null) {
        params = {};
      }
      if (opts == null) {
        opts = {};
      }
      req = this.$http({
        method: 'GET',
        url: name,
        params: params
      });
      return this._callback(req, action, opts);
    };

    Restful.prototype._post = function(action, name, params, opts) {
      var req;

      if (params == null) {
        params = {};
      }
      if (opts == null) {
        opts = {};
      }
      req = this.$http.post(name, params);
      return this._callback(req, action, opts);
    };

    Restful.prototype._put = function(action, name, params, opts) {
      var req;

      if (opts == null) {
        opts = {};
      }
      req = this.$http.put(name, params);
      return this._callback(req, action, opts);
    };

    Restful.prototype._delete = function(action, name, params, opts) {
      var req;

      if (params == null) {
        params = {};
      }
      if (opts == null) {
        opts = {};
      }
      req = this.$http({
        method: 'DELETE',
        url: name,
        params: params
      });
      return this._callback(req, action, opts);
    };

    Restful.prototype._callback = function(req, action, opts) {
      var msg,
        _this = this;

      msg = "" + this.table_name + "/" + action;
      req.success(function(data) {
        return _this.$rootScope.$broadcast(msg, data, opts);
      });
      return req.error(function(data) {
        return _this.$rootScope.$broadcast("" + msg + "#err", data, opts);
      });
    };

    Restful.prototype._extract_id = function(model) {
      if (typeof String || typeof Number) {
        return model;
      } else {
        return model.id;
      }
    };

    Restful.prototype.index = function(params, opts) {
      var action, name;

      if (opts == null) {
        opts = {};
      }
      action = 'index';
      name = this.path();
      return this._get(action, name, params, opts);
    };

    Restful.prototype.show = function(model, params, opts) {
      var action, id, name;

      if (opts == null) {
        opts = {};
      }
      action = 'show';
      id = this._extract_id(model);
      name = this.path(id);
      return this._get(action, name, params, opts);
    };

    Restful.prototype["new"] = function(params, opts) {
      var action, name;

      if (opts == null) {
        opts = {};
      }
      action = 'new';
      name = this.path(action);
      return this._get(action, name, params, opts);
    };

    Restful.prototype.create = function(params, opts) {
      var action, name;

      if (opts == null) {
        opts = {};
      }
      action = 'create';
      name = this.path();
      return this._post(action, name, params, opts);
    };

    Restful.prototype.edit = function(model, params, opts) {
      var action, id, name;

      if (opts == null) {
        opts = {};
      }
      action = 'edit';
      id = this._extract_id(model);
      name = this.path(id, action);
      return this._get(action, name, params, opts);
    };

    Restful.prototype.update = function(model, params, opts) {
      var action, id, name;

      if (opts == null) {
        opts = {};
      }
      action = 'update';
      id = this._extract_id(model);
      name = this.path(id);
      return this._put(action, name, params, opts);
    };

    Restful.prototype.destroy = function(model, params, opts) {
      var action, id, name;

      if (opts == null) {
        opts = {};
      }
      action = 'destroy';
      id = this._extract_id(model);
      name = this.path(id);
      return this._delete(action, name, params, opts);
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
      this._extract_id = __bind(this._extract_id, this);
      this._callback = __bind(this._callback, this);
      this._delete = __bind(this._delete, this);
      this._put = __bind(this._put, this);
      this._post = __bind(this._post, this);
      this._get = __bind(this._get, this);
      var action, fun, method, name, _ref, _ref1;

      _ref = this.collection;
      for (action in _ref) {
        method = _ref[action];
        name = this.path(action);
        fun = (function() {
          var _this = this;

          switch (method) {
            case 'get':
              return function(params, opts) {
                return _this._get(action, name, params, opts);
              };
            case 'post':
              return function(params, opts) {
                return _this._post(action, name, params, opts);
              };
            case 'put':
              return function(params, opts) {
                return _this._put(action, name, params, opts);
              };
            case 'destroy':
              return function(params, opts) {
                return _this._delete(action, name, params, opts);
              };
          }
        }).call(this);
        this[action] = fun;
      }
      _ref1 = this.member;
      for (action in _ref1) {
        method = _ref1[action];
        fun = (function() {
          var _this = this;

          switch (method) {
            case 'get':
              return function(model, params, opts) {
                return _this._get(action, _this.path(model.id, action), params, opts);
              };
            case 'post':
              return function(model, params, opts) {
                return _this._post(action, _this.path(model.id, action), params, opts);
              };
            case 'put':
              return function(model, params, opts) {
                return _this._put(action, _this.path(model.id, action), params, opts);
              };
            case 'destroy':
              return function(model, params, opts) {
                return _this._delete(action, _this.path(model.id, action), params, opts);
              };
          }
        }).call(this);
        this[action] = fun;
      }
    }

    return Restful;

  })();

}).call(this);
