const mainLayoutJSS = theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    }
});

const viewCommon = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    mainActionArea : {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px",
    },

    againMainActionArea : {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px",
        marginBottom: "10px"
    },

    draggableExpansionPanelSpace : {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px"
    },

    marginToLeft : {
        marginLeft: theme.spacing.unit,
    },
    displayInline : {
        display: "inline",
    },

    inLineFormContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    inLineFormInput: {
        margin: theme.spacing.unit,
    },
});

export {
    mainLayoutJSS,
    viewCommon
};