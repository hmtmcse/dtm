export const RaUrlUtil = {

    redirectTo: (url) => {
        window.location = url;
    },

    hardReload: () => {
        window.location.reload();
    },

    isMatchPathname: (url) => {
       return window.location.pathname === url;
    }


};