GRA.localdb = (function () {
    return {
        add: function (key, value) {
            return localStorage.setItem(key, value);
        },
        addAsJSONString: function (key, value) {
            return GRA.localdb.add(key, JSON.stringify(value));
        },
        addAsBase64: function (key, value) {
            return GRA.localdb.add(key, window.btoa(value));
        },
        remove: function (key) {
            return localStorage.removeItem(key);
        },
        getByKey: function (key) {
            return localStorage.getItem(key);
        },
        getAsJSON: function (key) {
            return JSON.parse(GRA.localdb.getByKey(key));
        },
        getFromBase64: function (key) {
            return JSON.parse(window.atob(GRA.localdb.getByKey(key)));
        }
    }
}());